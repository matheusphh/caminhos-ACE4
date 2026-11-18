"""Importa somente camadas públicas de ativos no entorno do campus da UFRB."""
import os
import re
import subprocess
import sys

GDB_PATH = os.getenv("BDGD_GDB", "/data/BDGD.gdb")
DB_NAME = os.getenv("POSTGRES_DB", "bdgd")
DB_USER = os.getenv("POSTGRES_USER", "bdgd")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "bdgd")
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")
PG_DSN = f"PG:host={DB_HOST} port={DB_PORT} dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD}"

# Retângulo de interesse: campus da UFRB e rede imediatamente próxima, Cruz das Almas/BA.
BBOX = ("-39.13", "-12.70", "-39.06", "-12.63")
LAYERS = {"SSDMT": "bdgd_ssdmt", "UNTRD": "bdgd_untrd", "SUB": "bdgd_sub"}


def main():
    if not os.path.exists(GDB_PATH):
        sys.exit(f"Geodatabase não encontrada: {GDB_PATH} (defina BDGD_GDB)")
    output = subprocess.check_output(["ogrinfo", "-ro", "-so", GDB_PATH], text=True, stderr=subprocess.STDOUT)
    available = set(re.findall(r"^\s*\d+:\s+([^\s(]+)", output, flags=re.MULTILINE))
    for layer, table in LAYERS.items():
        if layer not in available:
            print(f"Camada {layer} ausente na origem; pulando.")
            continue
        command = [
            "ogr2ogr", "-f", "PostgreSQL", PG_DSN, GDB_PATH, layer,
            "-nln", table, "-lco", "GEOMETRY_NAME=geom", "-lco", "SPATIAL_INDEX=GIST", "-t_srs", "EPSG:4326",
            "-spat", *BBOX, "-spat_srs", "EPSG:4326", "-nlt", "PROMOTE_TO_MULTI",
            "-overwrite", "-progress",
        ]
        print(f"Importando {layer} para {table} no recorte de Cruz das Almas…", flush=True)
        subprocess.run(command, check=True)


if __name__ == "__main__":
    main()
