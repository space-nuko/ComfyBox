#!/usr/bin/env sh

echo "Starting ComfyBox."
echo "Be sure you've started ComfyUI already using this command:"
echo ""
echo "    python main.py --enable-cors-header"
echo ""
echo "Serving at http://localhost:8000"
echo ""

python -m http.server 8000
