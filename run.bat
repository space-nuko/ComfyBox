@echo off

pushd dist
python -m http.server 8000
