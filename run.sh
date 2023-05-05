#!/usr/bin/env sh

pushd dist/
python -m http.server 8000
