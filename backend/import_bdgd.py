"""Importa somente camadas públicas de ativos no entorno do campus da UFRB."""
import os
import re
import subprocess
import sys
from psycopg import connect
from psycopg.conninfo import make_conninfo

GDB_PATH = os.getenv("BDGD_GDB", "/data/BDGD.gdb")
DATABASE_URL = os.getenv("DATABASE_URL")

# Retângulo de interesse: campus da UFRB e rede imediatamente próxima, Cruz das Almas/BA.
BBOX = ("-39.13", "-12.70", "-39.06", "-12.63")
LAYERS = {"SSDMT": "bdgd_ssdmt", "SSDBT": "bdgd_ssdbt", "UNTRD": "bdgd_untrd", "SUB": "bdgd_sub"}


def main():
    if not DATABASE_URL:
        sys.exit("DATABASE_URL não foi configurada para o importador")
    if not os.path.exists(GDB_PATH):
        sys.exit(f"Geodatabase não encontrada: {GDB_PATH} (defina BDGD_GDB)")
    connection_options = "-c search_path=bdgd,public,extensions"
    pg_dsn = "PG:" + make_conninfo(DATABASE_URL, options=connection_options)
    with connect(DATABASE_URL, options=connection_options) as connection:
        connection.execute("CREATE SCHEMA IF NOT EXISTS bdgd")
        for table in LAYERS.values():
            connection.execute(f"ALTER TABLE IF EXISTS public.{table} SET SCHEMA bdgd")

    output = subprocess.check_output(["ogrinfo", "-ro", "-so", GDB_PATH], text=True, stderr=subprocess.STDOUT)
    # GDAL versions format this listing either as "1: SSDMT (...)" or
    # "Layer: SSDMT (...)". Accept both forms.
    available = set(re.findall(r"^\s*(?:\d+:\s+|Layer:\s*)([^\s(]+)", output, flags=re.MULTILINE))
    for layer, table in LAYERS.items():
        source_layer = layer
        if layer == "UNTRD" and source_layer not in available:
            # Some BDGD editions split the distribution transformer layer by
            # voltage and use UNTRMT for the medium-voltage transformer set.
            source_layer = "UNTRMT"
        if source_layer not in available:
            print(f"Camada {layer} (origem: {source_layer}) ausente na origem; pulando.")
            continue
        command = [
            "ogr2ogr", "-f", "PostgreSQL", pg_dsn, GDB_PATH, source_layer,
            "-nln", f"bdgd.{table}", "-lco", "GEOMETRY_NAME=geom", "-lco", "SPATIAL_INDEX=GIST", "-t_srs", "EPSG:4326",
            "-spat", *BBOX, "-spat_srs", "EPSG:4326", "-nlt", "PROMOTE_TO_MULTI",
            "-overwrite", "-progress",
        ]
        print(f"Importando {source_layer} para {table} no recorte de Cruz das Almas…", flush=True)
        subprocess.run(command, check=True)


if __name__ == "__main__":
    main()
