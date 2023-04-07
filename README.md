# ComfyBox

An alternative UI to the backend server of the Stable Diffusion webapp [ComfyUI](https://github.com/comfyanonymous/ComfyUI). Build your workflow in a graph structure and have a custom Stable Diffusion interface created for you automatically.

This project is *still under construction* and many features are missing, be aware of the tradeoffs if you're interested in using it.

![Screenshot](./static/screenshot.png)

## NOTE

This frontend isn't compatible with regular ComfyUI's workflow format since extra metadata is saved like panel layout, so you'll have to spend a bit of time recreating them. This project also isn't compatible with regular ComfyUI's frontend extension format, but useful extensions can be integrated into this repo with some effort.

## Proposed Features
- All the power of ComfyUI with more convenience on top
- Autocreation of UI widgets from your workflow, quickly creating a personalized dashboard
- Custom widget and node types
- Look up queued and finished generations and their configs in realtime
- Development with TypeScript

## Requirements

- `pnpm`
- [Turborepo](https://turbo.build/repo/docs/installing)
- An installation of vanilla [ComfyUI](https://github.com/comfyanonymous/ComfyUI) for the backend

## Installation

1. Clone the repo with submodules:

```
git clone https://github.com/space-nuko/ComfyBox --recursive
```

2. `pnpm install`
3. `pnpm dev`
4. Start ComfyUI as usual with `python main.py --enable-cors-header`
5. Visit `http://localhost:3000` in your browser
