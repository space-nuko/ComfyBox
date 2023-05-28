<script context="module" lang="ts">
 export type MaskCanvasData = {
     hasMask: boolean,
     maskCanvas: HTMLCanvasElement | null,
 }
</script>

<script lang="ts">
 import { loadImage } from "$lib/widgets/utils"
 import { tick, createEventDispatcher } from "svelte";
 import { ArrowClockwise, ArrowCounterclockwise, XSquare, Exclude, Circle, Grid3x3Gap, ArrowsFullscreen, FullscreenExit } from "svelte-bootstrap-icons";

 export let fileURL: string | null = null;
 export let fullscreen: boolean = false;

 const dispatch = createEventDispatcher<{
     change: MaskCanvasData;
     release: MaskCanvasData;
 }>();

 let canvasCursor: string | undefined = undefined;

 let container: HTMLDivElement | null;
 let canvas: HTMLCanvasElement | null;
 let maskCanvas: HTMLCanvasElement | null;
 let renders: HTMLImageElement[] = [];
 let context: CanvasRenderingContext2D | null;
 let maskContext: CanvasRenderingContext2D | null;
 let curLineGroup: LineGroup = [];
 let redoCurLines: LineGroup = []

 let original: HTMLImageElement | null;
 let isImageLoaded: boolean = false;
 let imageWidth: number = 512;
 let imageHeight: number = 512;
 let scale: number = 1.0;
 let minScale: number = 1.0;
 let brushSize: number = 100;
 let maskBlur: number = 0;
 let clipMask: boolean = false;
 let hasMask: boolean = false;

 let isDrawing: boolean = false;
 let isPanning: boolean = false;
 let isBrushShowing: boolean = false;

 let transform = ""
 $: transform = `translate(${imx}px, ${imy}px) scale(${scale})`

 let imx: number = 0;
 let imy: number = 0;

 let x: number = 0;
 let y: number = 0;

 let panX: number = 0;
 let panY: number = 0;

 const BRUSH_COLOR = "#000"

 enum MouseButton {
     Left = 0,
     Middle = 1,
     Right = 2,
     Back = 3,
     Forward = 4
 }

 $: if (isPanning) {
     canvasCursor = "grab";
 }
 else if (isImageLoaded && isBrushShowing) {
     canvasCursor = "none";
 }
 else {
     canvasCursor = undefined;
 }

 $: {
     context = canvas ? canvas.getContext("2d") : null
 }

 function clearState() {
     hasMask = false;
     maskCanvas = null;
     maskContext = null;
     isImageLoaded = false;
     original = null;
     renders = []
     curLineGroup = [];
     redoCurLines = []
     imageWidth = 512;
     imageHeight = 512;
     scale = 1.0;
     minScale = 0.5;
 }

 let loadedFileURL: string | null = null
 $: if (fileURL !== loadedFileURL) {
     clearState();
     if (fileURL) {
         loadImage(fileURL).then(i => {
             original = i;
             isImageLoaded = true;
         })
                           .catch(i => {
                               isImageLoaded = false;
                           })
     }
     else {
         isImageLoaded = false;
         original = null;
     }
     loadedFileURL = fileURL
 }

 $: {
     // initSizeAndScale(isImageLoaded, original);
     [imageWidth, imageHeight] = getCurrentWidthAndHeight(isImageLoaded, original)
     scale = initScale(imageWidth, imageHeight)
     initImagePos()
 }

 $: hasMask = curLineGroup.length > 0;

 function initImagePos() {
     if (!container)
         return
     const rect = container.getBoundingClientRect();
     imx = rect.width / 2 - (imageWidth / 2) * scale
     imy = rect.height / 2 - (imageHeight / 2) * scale
 }

 function initScale(width: number, height: number): number {
     const s = getScale(width, height);
     minScale = s / 2;
     return s;
 }

 function initSizeAndScale(isImageLoaded: boolean, original: HTMLImageElement | null) {
     [imageWidth, imageHeight] = getCurrentWidthAndHeight(isImageLoaded, original)
     scale = getScale(imageWidth, imageHeight)
     minScale = scale;
 }

 type LinePoint = {
     x: number,
     y: number
 }
 interface Line {
     size?: number,
     points: LinePoint[]
 }
 type LineGroup = Line[];

 function drawOnCurrentRender(lineGroup: LineGroup) {
     draw(lineGroup)
     dispatch("change", {
         hasMask,
         maskCanvas
     })
 }

 function draw(lineGroup: LineGroup) {
     if (!context || !maskContext)
         return

     context.clearRect(0, 0, context.canvas.width, context.canvas.height)
     maskContext.clearRect(0, 0, maskContext.canvas.width, maskContext.canvas.height)

     const color = BRUSH_COLOR

     const drawMask = (ctx: CanvasRenderingContext2D) => {
         ctx.save();
         ctx.filter = `blur(${maskBlur}px)`
         drawLines(ctx, lineGroup, color)
         ctx.restore();
     }

     drawMask(maskContext);

     if (clipMask) {
         context.save();
         context.filter = `blur(${maskBlur}px)`
         drawLines(context, lineGroup, color)
         context.restore();
         context.globalCompositeOperation = "source-in"
         context.drawImage(original!!, 0, 0, imageWidth, imageHeight)
         context.globalCompositeOperation = "source-over";
     }
     else {
         drawMask(context);
     }
 }

 function updateMaskImage() {
     drawOnCurrentRender(curLineGroup);
 }

 function drawLines(ctx: CanvasRenderingContext2D, lines: LineGroup, color: string) {
     ctx.strokeStyle = color
     ctx.lineCap = 'round'
     ctx.lineJoin = 'round'

     lines.forEach(line => {
         if (!line?.points.length || !line.size) {
             return
         }
         ctx.lineWidth = line.size
         ctx.beginPath()
         ctx.moveTo(line.points[0].x, line.points[0].y)
         line.points.forEach(point => ctx.lineTo(point.x, point.y))
         ctx.stroke()
     })
 }

 $: if (canvas && original) {
     console.warn("INITCANVAS", imageWidth, imageHeight, original.src)
     maskCanvas = document.createElement("canvas");
     maskContext = maskCanvas.getContext("2d")!;
     maskCanvas.width = imageWidth;
     maskCanvas.height = imageHeight;
     canvas.width = imageWidth;
     canvas.height = imageHeight;
     drawOnCurrentRender([])
 }

 function getCurrentWidthAndHeight(isImageLoaded: boolean, original: HTMLImageElement | null) {
     if (isImageLoaded && original){
         return [original.naturalWidth, original.naturalHeight]
     }
     return [512, 512]
 }

 function getScale(width: number, height: number): number {
     const size = container?.getBoundingClientRect();
     if (!size) {
         return 1.0
     }

     const ratioWidth = size.width / width
     const ratioHeight = (size.height) / height

     let scale: number = 1.0
     if (ratioWidth < 1 || ratioHeight < 1) {
         scale = Math.min(ratioWidth, ratioHeight)
     }

     return scale
 }

 function undoStroke() {
     if (curLineGroup.length === 0) {
         return
     }

     const lastLine = curLineGroup.pop()!
     const newRedoCurLines = [...redoCurLines, lastLine]
     redoCurLines = newRedoCurLines

     const newLineGroup = [...curLineGroup]
     curLineGroup = newLineGroup
     drawOnCurrentRender(newLineGroup)
 }

 function redoStroke() {
     if (redoCurLines.length === 0) {
         return
     }

     const line = redoCurLines.pop()!
     redoCurLines = [...redoCurLines]

     const newLineGroup = [...curLineGroup, line]
     curLineGroup = newLineGroup
     drawOnCurrentRender(newLineGroup)
 }

 export function clearStrokes() {
     redoCurLines = []
     const newLineGroup: LineGroup = []
     curLineGroup = newLineGroup
     drawOnCurrentRender(newLineGroup)
 }

 export function recenterImage() {
     scale = initScale(imageWidth, imageHeight)
     initImagePos();
 }

 async function toggleFullscreen() {
     fullscreen = !fullscreen;
     updateMaskImage();
     await tick();
     recenterImage();
 }

 function onCanvasMouseOver() {
     isBrushShowing = true;
 }

 function onCanvasFocus() {
     isBrushShowing = true;
 }

 function onCanvasMouseLeave() {
     isBrushShowing = false;
 }

 function mouseXY(e: MouseEvent): LinePoint {
     return { x: e.offsetX, y: e.offsetY }
 }

 function onCanvasMouseDown(e: MouseEvent) {
     if (!original?.src)
         return;

     if (isPanning)
         return;

     if (canvas == null)
         return;

     switch (e.button) {
         case MouseButton.Right:
             return;
         case MouseButton.Middle:
             isPanning = true;
             panX = e.offsetX * scale;
             panY = e.offsetY * scale;
             return;
     }

     isDrawing = true;

     redoCurLines = []

     let lineGroup: LineGroup = [...curLineGroup]
     lineGroup.push({size: brushSize, points: [mouseXY(e)] })
     curLineGroup = lineGroup
     drawOnCurrentRender(curLineGroup);
 }

 function onCanvasMouseUp() {

 }

 function onCanvasMouseMove(e: MouseEvent) {
     if (isPanning)
         return;

     if (!isDrawing)
         return;

     if (curLineGroup.length === 0)
         return

     curLineGroup[curLineGroup.length-1].points.push(mouseXY(e))
     curLineGroup = curLineGroup; // react
     drawOnCurrentRender(curLineGroup)
 }

 function onCanvasMouseWheel(e: WheelEvent) {
     e.preventDefault();
     if (!container || e.target != canvas)
         return;

     const bound = container.getBoundingClientRect()

     // coodinates on the image that were zoomed
     const x_ = e.clientX - bound.x
     const y_ = e.clientY - bound.y

     e.preventDefault();
     var delta = e.deltaY * -0.001
     delta = Math.max(-1,Math.min(1,delta)) // cap the delta to [-1,1] for cross browser consistency

     const zx = (x_ - imx)/scale
     const zy = (y_ - imy)/scale

     scale += delta * scale
     scale = Math.max(minScale,scale)

     imx = -zx * scale + x_
     imy = -zy * scale + y_

     x = e.offsetX * scale;
     y = e.offsetY * scale;
 }

 function onMouseMove(e: MouseEvent) {
     if (e.target != canvas)
         return;

     x = e.offsetX * scale;
     y = e.offsetY * scale;

     if (isPanning) {
         imx += x - panX;
         imy += y - panY;
     }
 }

 function onMouseUp(e: MouseEvent) {
     if (e.button === MouseButton.Middle) {
         isPanning = false
         panX = 0
         panY = 0
     }

     if (isPanning)
         return;

     if (!original?.src)
         return;

     if (!canvas)
         return;

     if (!isDrawing)
         return;

     isDrawing = false;
     dispatch("release", { hasMask, maskCanvas })
 }

 function dispatchRelease() {
     dispatch("release", { hasMask, maskCanvas })
 }
</script>

<svelte:window on:mouseup={onMouseUp} />

<div class="me-container" class:fullscreen bind:this={container} on:mousemove={onMouseMove}>
    {#if !isImageLoaded}
        <div>
            (empty)
        </div>
    {:else}
        <div class="me-transform" style:transform={transform} style:--scale={scale}>
            <div class="me-canvas-container">
                <div class="me-original-image-container"
                     style:width="{imageWidth}px"
                     style:height="{imageHeight}px">
                    {#if original}
                        {@const showOriginal = !clipMask}
                        <img class="me-original-image"
                             src={original.src}
                             style:width={imageWidth}
                             style:height={imageHeight}
                             style:display={showOriginal ? "block" : "none"}
                        />
                    {/if}
                </div>
                <canvas class="me-canvas"
                        bind:this={canvas}
                        style:cursor={canvasCursor}
                        on:mouseover={onCanvasMouseOver}
                        on:focus={onCanvasFocus}
                        on:wheel={onCanvasMouseWheel}
                        on:mouseleave={onCanvasMouseLeave}
                        on:mousedown|preventDefault={onCanvasMouseDown}
                        on:mouseup|preventDefault={onCanvasMouseUp}
                        on:mousemove={onCanvasMouseMove}
                />
            </div>
        </div>
    {/if}
    {#if isImageLoaded && isBrushShowing && !isPanning}
        <div class="me-brush-cursor"
             style:width="{brushSize * scale}px"
             style:height="{brushSize * scale}px"
             style:left="{x + imx}px"
             style:top="{y + imy}px"
             style:transform="translate(-50%, -50%)"
        />
    {/if}
    <div class="me-toolkit-bar">
        <button disabled={curLineGroup.length === 0} on:click={undoStroke}>
            <ArrowCounterclockwise />
        </button>
        <button disabled={redoCurLines.length === 0} on:click={redoStroke}>
            <ArrowClockwise />
        </button>
        <button on:click={clearStrokes} disabled={curLineGroup.length === 0 && redoCurLines.length === 0}>
            <XSquare/>
        </button>
        <label>
            <Circle />
            <input type="range" min="1" max="200" bind:value={brushSize} step="0.1"
                   on:change={updateMaskImage}
                   on:pointerup={dispatchRelease}/>
        </label>
        <label>
            <Grid3x3Gap/>
            <input type="range" min="1" max="100" bind:value={maskBlur} step="0.1"
                   on:change={updateMaskImage}
                   on:pointerup={dispatchRelease}/>
        </label>
        <div class="toggle-button" class:toggled={clipMask} on:click={() => {clipMask = !clipMask; updateMaskImage()}}>
            <Exclude />
        </div>
        <div class="toggle-button" class:toggled={fullscreen} on:click={() => {toggleFullscreen()}}>
            {#if fullscreen}
                <FullscreenExit />
            {:else}
                <ArrowsFullscreen />
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
 $bg-color: #a0a0a0;
 .me-container {
     width: 100%;
     height: 100%;
     position: relative;
     overflow: hidden;
     background-color: white;
     background-image:
         linear-gradient(45deg, #ccc 25%, transparent 25%),
         linear-gradient(135deg, #ccc 25%, transparent 25%),
         linear-gradient(45deg, transparent 75%, #ccc 75%),
         linear-gradient(135deg, transparent 75%, #ccc 75%);
     background-size:25px 25px; /* Must be a square */
     background-position:0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px; /* Must be half of one side of the square */

     &.fullscreen {
         position: fixed;
         top: 0;
         left: 0;
         width: 100vw;
         height: 100vh;
         margin: auto;
         z-index: var(--layer-top);
     }
 }

 .me-transform {
     --scale: 1;
     display: flex;
     flex-wrap: wrap;
     width: -moz-fit-content;
     width: fit-content;
     height: -moz-fit-content;
     height: fit-content;
     margin: 0;
     padding: 0;
     transform-origin: 0% 0%;
 }

 .me-original-image-container {
     position: absolute;
     top: 0;
     left: 0;
     grid-area: editor-content;
     pointer-events: none;
     user-select: none;
     display: grid;
     grid-template-areas: 'original-image-content';
     border: calc((1 / var(--scale)) * 5px) dashed grey;

     img.me-original-image {
         grid-area: original-image-content;
     }
 }

 .me-canvas {
     position: absolute;
     z-index: 1;
 }

 .me-brush-cursor {
     position: absolute;
     border-radius: 50%;
     background-color: #000;
     border: 1px solid var(--yellow-accent);
     pointer-events: none;
 }

 .me-toolkit-bar {
     position: absolute;
     bottom: 0.5rem;
     border-radius: 3rem;
     padding: 0.4rem 24px;
     display: flex;
     margin: 0.5rem auto;
     gap: 16px;
     left: 0;
     right: 0;
     width: 80%;
     height: 3rem;
     align-items: center;
     justify-content: space-evenly;
     backdrop-filter: blur(12px);
     background-color: white;
     animation: slideUp 0.2s ease-out;
     border: var(--editor-toolkit-panel-border);
     box-shadow: 0 0 0 4px #0000001a, 0 3px 16px #00000014, 0 2px 6px 1px #00000017;

     label {
         display: flex;
         flex-direction: row;
         gap: 4px;
         input {
             width: 5rem;
         }
     }

     button {
         &:not(:disabled) {
             cursor: pointer;
         }
         &:hover:not(:disabled) {
             color: var(--secondary-600);
         }
         &:disabled {
             opacity: 40%;
         }
     }

     .toggle-button {
         &:hover:not(:disabled) {
             color: var(--secondary-600);
         }
         &:not(:disabled) {
             cursor: pointer;
         }
         &.toggled {
             color: var(--secondary-400);
         }
     }
 }
</style>
