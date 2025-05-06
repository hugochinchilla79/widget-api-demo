#!/bin/bash
echo "🧪 Levantando entorno de demo (producción)..."
docker-compose -f docker-compose.prod.yml up --build
