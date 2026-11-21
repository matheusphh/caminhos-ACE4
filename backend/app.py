import os
from typing import Annotated

import psycopg
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://bdgd:bdgd@localhost:5432/bdgd")
REFERENCE_DATE = os.getenv("BDGD_REFERENCE_DATE", "não informada").strip()
if REFERENCE_DATE.lower().startswith(("postgres://", "postgresql://")):
    REFERENCE_DATE = "não informada"
ALLOWED_LAYERS = {
    "SSDMT": "bdgd.bdgd_ssdmt",
    "SSDBT": "bdgd.bdgd_ssdbt",
    "UNTRD": "bdgd.bdgd_untrd",
    "SUB": "bdgd.bdgd_sub",
}


def connect_database():
    return psycopg.connect(
        DATABASE_URL,
        options="-c search_path=bdgd,public,extensions",
    )

app = FastAPI(title="API BDGD — UFRB", version="1.0.0")
SITE_ORIGIN = "https://matheusphh.github.io"
configured_origins = os.getenv("CORS_ORIGINS", SITE_ORIGIN).strip()
origins = [origin.strip() for origin in configured_origins.split(",") if origin.strip()]
if not origins:
    origins = [SITE_ORIGIN]
elif SITE_ORIGIN not in origins and "*" not in origins:
    origins.append(SITE_ORIGIN)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    try:
        with connect_database() as connection:
            connection.execute("SELECT 1")
    except psycopg.Error as error:
        raise HTTPException(status_code=503, detail="Banco BDGD indisponível") from error
    return {"status": "ok", "reference_date": REFERENCE_DATE}


@app.get("/api/features")
def features(
    bbox: Annotated[str, Query(description="Oeste,Sul,Leste,Norte em EPSG:4326")],
    layers: str = "SSDMT,SSDBT,UNTRD,SUB",
):
    try:
        west, south, east, north = (float(value) for value in bbox.split(","))
    except (ValueError, TypeError) as error:
        raise HTTPException(status_code=400, detail="bbox deve conter quatro coordenadas numéricas") from error
    if not (-180 <= west < east <= 180 and -90 <= south < north <= 90):
        raise HTTPException(status_code=400, detail="bbox fora dos limites válidos")
    if east - west > 1 or north - south > 1:
        raise HTTPException(status_code=400, detail="Consulte uma área de até um grau por vez")

    requested = [name.strip().upper() for name in layers.split(",") if name.strip()]
    unknown = set(requested) - ALLOWED_LAYERS.keys()
    if unknown:
        raise HTTPException(status_code=400, detail="Camada não disponível")

    result = {name: {"type": "FeatureCollection", "features": []} for name in ALLOWED_LAYERS}
    total = 0
    try:
        with connect_database() as connection:
            for name in requested:
                table = ALLOWED_LAYERS[name]
                rows = connection.execute(
                    f"""SELECT jsonb_build_object(
                           'type', 'Feature',
                           'geometry', ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb,
                           'properties', jsonb_strip_nulls(jsonb_build_object(
                             'codigo', to_jsonb(t)->>'COD_ID',
                             'nome', COALESCE(to_jsonb(t)->>'NOM', to_jsonb(t)->>'DESCR'),
                             'tensao_kv', to_jsonb(t)->>'TEN_NOM'
                           ))
                         ) AS feature
                         FROM {table} AS t
                         WHERE geom && ST_MakeEnvelope(%s, %s, %s, %s, 4326)
                           AND ST_Intersects(geom, ST_MakeEnvelope(%s, %s, %s, %s, 4326))
                         LIMIT 5000""",
                    (west, south, east, north, west, south, east, north),
                ).fetchall()
                result[name]["features"] = [row[0] for row in rows]
                total += len(rows)
    except psycopg.Error as error:
        raise HTTPException(status_code=503, detail="Camadas BDGD ainda não foram importadas") from error

    return {"layers": result, "count": total, "reference_date": REFERENCE_DATE}
