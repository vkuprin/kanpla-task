#!/usr/bin/env sh

set -o errexit
API_URL="https://kanpla-code-challenge.up.railway.app/docs/json"
curl -o './schema.json' "${API_URL}"
