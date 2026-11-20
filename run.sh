#!/usr/bin/env bash

sudo docker compose up -d --build db api
sudo docker compose --profile import build importer
sudo docker compose --profile import run --rm importer
python3 -m http.server 8001


