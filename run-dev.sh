#!/bin/bash
echo "🚀 Levantando entorno de desarrollo..."
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up

