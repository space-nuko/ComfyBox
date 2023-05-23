<script lang="ts">
 /*
  * Portions of this code were adapted from multidiffusion-upscaler-for-automatic1111 ver. 2023.3.28
  * which was licensed under GPL-3. Subsequent versions were relicensed as CC BY-NC-SA 4.0
  * https://github.com/pkuliyi2015/multidiffusion-upscaler-for-automatic1111/commit/e116fe946fe44c52d5500ace9ce65d4d685cff46
  */
 import { onMount } from "svelte";
 import type { ComfyMultiRegionNode } from "$lib/nodes/widgets";
 import type { BoundingBox } from "$lib/nodes/widgets/ComfyMultiRegionNode";
 import type { WidgetLayout } from "$lib/stores/layoutStates";
 import { Block, BlockLabel } from "@gradio/atoms";
 import { Chart as SquareIcon } from "@gradio/icons";
 import { writable, type Writable } from "svelte/store";
 import { generateBlankCanvas, loadImage } from "./utils";
 import { clamp } from "$lib/utils";

// ref: https://html-color.codes/
const COLOR_MAP: [string, string][] = [
    ['#ff0000', 'rgba(255, 0, 0, 0.3)'],          // red
    ['#ff9900', 'rgba(255, 153, 0, 0.3)'],        // orange
    ['#ffff00', 'rgba(255, 255, 0, 0.3)'],        // yellow
    ['#33cc33', 'rgba(51, 204, 51, 0.3)'],        // green
    ['#33cccc', 'rgba(51, 204, 204, 0.3)'],       // indigo
    ['#0066ff', 'rgba(0, 102, 255, 0.3)'],        // blue
    ['#6600ff', 'rgba(102, 0, 255, 0.3)'],        // purple
    ['#cc00cc', 'rgba(204, 0, 204, 0.3)'],        // dark pink
    ['#ff6666', 'rgba(255, 102, 102, 0.3)'],      // light red
    ['#ffcc66', 'rgba(255, 204, 102, 0.3)'],      // light orange
    ['#99cc00', 'rgba(153, 204, 0, 0.3)'],        // lime green
    ['#00cc99', 'rgba(0, 204, 153, 0.3)'],        // teal
    ['#0099cc', 'rgba(0, 153, 204, 0.3)'],        // steel blue
    ['#9933cc', 'rgba(153, 51, 204, 0.3)'],       // lavender
    ['#ff3399', 'rgba(255, 51, 153, 0.3)'],       // hot pink
    ['#996633', 'rgba(153, 102, 51, 0.3)'],       // brown
];

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;

 let imageContainer: HTMLDivElement | null;
 let imageElem: HTMLImageElement | null;

 let node: ComfyMultiRegionNode | null = null;
 let nodeValue: Writable<BoundingBox[]> = writable([]);
 let sizeChanged: Writable<boolean> = writable(false);
 let regionsChanged: Writable<boolean> = writable(false);
 let propsChanged: Writable<number> = writable(0);
 let selectedIndex: number = 0;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     console.error("SETNODEVALUE")
     if (widget) {
         node = widget.node as ComfyMultiRegionNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
         sizeChanged = node.sizeChanged;
         regionsChanged = node.regionsChanged;
     }
 };

 let showWidget: boolean = false;

 if (sizeChanged && $sizeChanged) {
     console.error("Z@");
 }

 type DisplayBoundingBox = {
     xPx: number,
     yPx: number,
     widthPx: number,
     heightPx: number,
     warnLargeSize: boolean,
     bgColor: string,
     borderColor: string
 }

 let displayBoxes = [];

 async function recreateDisplayBoxes(_node?: ComfyMultiRegionNode, bboxes?: BoundingBox[]): Promise<DisplayBoundingBox[]> {
     _node ||= node;
     bboxes ||= $nodeValue

     console.debug("[MultiRegionWidget] Recreate!", bboxes, imageElem, _node)

     if (_node != null && imageElem != null && imageContainer != null) {
         selectedIndex = clamp(selectedIndex, 0, bboxes.length - 1);
         await updateImage(_node.properties.canvasWidth, _node.properties.canvasHeight);
         return bboxes.map((b, i) => displayBoundingBox(b, i, imageElem))
     }
     else {
         return []
     }
 }

 $: if (node != null && $sizeChanged) {
     console.warn("SIZCHANGEd")
     updateImage(node.properties.canvasWidth, node.properties.canvasHeight)
         .then(() => {
             return recreateDisplayBoxes()
         })
         .then(dbs => {
             displayBoxes = dbs;
         })
 }

 onMount(async () => {
     displayBoxes = await recreateDisplayBoxes(node, $nodeValue);
 })

 $: if ($regionsChanged) {
     $regionsChanged = false;
     recreateDisplayBoxes(node, $nodeValue).then(dbs => displayBoxes = dbs);
 }

 async function updateImage(width: number, height: number) {
     showWidget = width > 0 && height > 0;
     console.error("SHOW", showWidget, width, height)
     const blank = generateBlankCanvas(width, height, "transparent");
     const url = blank.toDataURL();
     const newImg = await loadImage(url);
     newImg.classList.add("regions-image");
     if (imageContainer != null) {
         imageContainer.replaceChildren(newImg)
     }
     imageElem = newImg;
     imageElem.style.border = `${BORDER_SIZE_PX}px solid var(--border-color-primary)`;
     $sizeChanged = false;
 }

 const BBOX_WARNING_SIZE = 1280;

 function onBBoxMoved(index: number, newBBox: BoundingBox) {
     $nodeValue[index] = newBBox;
     displayBoxes[index] = displayBoundingBox(newBBox, index, imageElem, displayBoxes[index]);
 }

 function displayBoundingBox(bbox: BoundingBox, index: number, imageElem: HTMLImageElement, out?: DisplayBoundingBox): DisplayBoundingBox {
     const [x, y, w, h] = bbox;

     // client: image widget display size
     // natural: content image real size
     const vpScale = Math.min(imageElem.clientWidth / imageElem.naturalWidth, imageElem.clientHeight / imageElem.naturalHeight);
     const imageElemCenterX = (imageElem.clientWidth)  / 2;
     const imageElemCenterY = (imageElem.clientHeight) / 2;
     const scaledX = imageElem.naturalWidth  * vpScale;
     const scaledY = imageElem.naturalHeight * vpScale;
     const viewRectLeft  = imageElemCenterX - scaledX / 2 + BORDER_SIZE_PX;
     const viewRectRight = imageElemCenterX + scaledX / 2 + BORDER_SIZE_PX;
     const viewRectTop   = imageElemCenterY - scaledY / 2 + BORDER_SIZE_PX;
     const viewRectDown  = imageElemCenterY + scaledY / 2 + BORDER_SIZE_PX;

     const xDiv = viewRectLeft + scaledX * x;
     const yDiv = viewRectTop  + scaledY * y;
     const wDiv = Math.min(scaledX * w, viewRectRight - xDiv);
     const hDiv = Math.min(scaledY * h, viewRectDown - yDiv);

     // Calculate warning bbox size
     const upscalerFactor = 1.0;
     // if (!is_t2i) {
     //     upscalerFactor = getUpscalerFactor();
     // }
     const maxSize = BBOX_WARNING_SIZE / upscalerFactor * vpScale;
     const maxW = maxSize / scaledX;
     const maxH = maxSize / scaledY;
     const warnLargeSize = w > maxW || h > maxH

     const [borderColor, bgColor] = COLOR_MAP[index % COLOR_MAP.length]

     out ||= {} as DisplayBoundingBox
     out.xPx= xDiv;
     out.yPx= yDiv;
     out.widthPx= wDiv;
     out.heightPx= hDiv;
     out.warnLargeSize = warnLargeSize;
     out.bgColor = bgColor
     out.borderColor = borderColor

     return out;
 }

 const RESIZE_BORDER = 5;
 const MOVE_BORDER = 5;
 const BORDER_SIZE_PX = 3;

 function updateCursorStyle(e: MouseEvent) {
     // This function changes the cursor style when hovering over the bounding box
     const div = e.target as HTMLDivElement;
     const boxRect = div.getBoundingClientRect();
     const mouseX = e.clientX;
     const mouseY = e.clientY;

     const resizeLeft   = mouseX >= boxRect.left && mouseX <= boxRect.left + RESIZE_BORDER;
     const resizeRight  = mouseX >= boxRect.right - RESIZE_BORDER && mouseX <= boxRect.right;
     const resizeTop    = mouseY >= boxRect.top && mouseY <= boxRect.top + RESIZE_BORDER;
     const resizeBottom = mouseY >= boxRect.bottom - RESIZE_BORDER && mouseY <= boxRect.bottom;

     if ((resizeLeft && resizeTop) || (resizeRight && resizeBottom)) {
         div.style.cursor = 'nwse-resize';
     } else if ((resizeLeft && resizeBottom) || (resizeRight && resizeTop)) {
         div.style.cursor = 'nesw-resize';
     } else if (resizeLeft || resizeRight) {
         div.style.cursor = 'ew-resize';
     } else if (resizeTop || resizeBottom) {
         div.style.cursor = 'ns-resize';
     } else {
         div.style.cursor = 'move';
     }
 }

 function onBoxMouseDown(e: MouseEvent, index: number) {
     if (e.button !== 0)
         return;

     // Get the bounding box
     let bbox = $nodeValue[index];
     if (!imageElem || !bbox)
         return;

     selectedIndex = index;

     // Check if the click is inside the bounding box
     const div = e.target as HTMLDivElement;
     const boxRect = div.getBoundingClientRect();
     let mouseX = e.clientX;
     let mouseY = e.clientY;

     const resizeLeft   = mouseX >= boxRect.left && mouseX <= boxRect.left + RESIZE_BORDER;
     const resizeRight  = mouseX >= boxRect.right - RESIZE_BORDER && mouseX <= boxRect.right;
     const resizeTop    = mouseY >= boxRect.top && mouseY <= boxRect.top + RESIZE_BORDER;
     const resizeBottom = mouseY >= boxRect.bottom - RESIZE_BORDER && mouseY <= boxRect.bottom;

     const moveHorizontal = mouseX >= boxRect.left + MOVE_BORDER && mouseX <= boxRect.right  - MOVE_BORDER;
     const moveVertical   = mouseY >= boxRect.top  + MOVE_BORDER && mouseY <= boxRect.bottom - MOVE_BORDER;

     if (!resizeLeft && !resizeRight && !resizeTop && !resizeBottom && !moveHorizontal && !moveVertical)
         return;

     const horizontalPivot = resizeLeft ? bbox[0] + bbox[2] : bbox[0];
     const verticalPivot   = resizeTop  ? bbox[1] + bbox[3] : bbox[1];

     // Canvas can be regarded as invariant during the drag operation
     // Calculate in advance to reduce overhead

     // Calculate viewport scale based on the current canvas size and the natural image size
     let vpScale = Math.min(imageElem.clientWidth / imageElem.naturalWidth, imageElem.clientHeight / imageElem.naturalHeight);
     let vpOffset = imageElem.getBoundingClientRect();
     console.warn(vpScale, vpOffset)

     // Calculate scaled dimensions of the canvas
     let scaledX = imageElem.naturalWidth * vpScale;
     let scaledY = imageElem.naturalHeight * vpScale;

     // Calculate the canvas center and view rectangle coordinates
     let canvasCenterX = (vpOffset.left + window.scrollX) + imageElem.clientWidth  / 2;
     let canvasCenterY = (vpOffset.top  + window.scrollY) + imageElem.clientHeight / 2;
     let viewRectLeft  = canvasCenterX - scaledX / 2 - window.scrollX;
     let viewRectRight = canvasCenterX + scaledX / 2 - window.scrollX;
     let viewRectTop   = canvasCenterY - scaledY / 2 - window.scrollY;
     let viewRectDown  = canvasCenterY + scaledY / 2 - window.scrollY;

     mouseX = Math.min(Math.max(mouseX, viewRectLeft), viewRectRight);
     mouseY = Math.min(Math.max(mouseY, viewRectTop),  viewRectDown);

     // Move or resize the bounding box on mousemove
     function onMouseMove(e) {
         // Prevent selecting anything irrelevant
         e.preventDefault();

         // Get the new mouse position
         let newMouseX = e.clientX;
         let newMouseY = e.clientY;

         // clamp the mouse position to the view rectangle
         newMouseX = Math.min(Math.max(newMouseX, viewRectLeft), viewRectRight);
         newMouseY = Math.min(Math.max(newMouseY, viewRectTop),  viewRectDown);

         // Calculate the mouse movement delta
         const dx = (newMouseX - mouseX) / scaledX;
         const dy = (newMouseY - mouseY) / scaledY;

         // Update the mouse position
         mouseX = newMouseX;
         mouseY = newMouseY;

         // if no move just return
         if (dx === 0 && dy === 0) { return; }

         // Update the mouse position
         let [x, y, w, h] = bbox;

         if (moveHorizontal && moveVertical) {
             // If moving the bounding box
             x = Math.min(Math.max(x + dx, 0), 1 - w);
             y = Math.min(Math.max(y + dy, 0), 1 - h);
         } else {
             // If resizing the bounding box
             if (resizeLeft || resizeRight) {
                 if (x < horizontalPivot) {
                     if (dx <= w) {
                         // If still within the left side of the pivot
                         x = x + dx;
                         w = w - dx;
                     } else {
                         // If crossing the pivot
                         w = dx - w;
                         x = horizontalPivot;
                     }
                 } else {
                     if (w + dx < 0) {
                         // If still within the right side of the pivot
                         x = horizontalPivot + w + dx;
                         w = - dx - w;
                     } else {
                         // If crossing the pivot
                         x = horizontalPivot;
                         w = w + dx;
                     }
                 }

                 // Clamp the bounding box to the image
                 if (x < 0) {
                     w = w + x;
                     x = 0;
                 } else if (x + w > 1) {
                     w = 1 - x;
                 }
             }
             // Same as above, but for the vertical axis
             if (resizeTop || resizeBottom) {
                 if (y < verticalPivot) {
                     if (dy <= h) {
                         y = y + dy;
                         h = h - dy;
                     } else {
                         h = dy - h;
                         y = verticalPivot;
                     }
                 } else {
                     if (h + dy < 0) {
                         y = verticalPivot + h + dy;
                         h = - dy - h;
                     } else {
                         y = verticalPivot;
                         h = h + dy;
                     }
                 }
                 if (y < 0) {
                     h = h + y;
                     y = 0;
                 } else if (y + h > 1) {
                     h = 1 - y;
                 }
             }
         }
         const [div, old_bbox, _] = $nodeValue[index];

         // If all the values are the same, just return
         if (old_bbox[0] === x && old_bbox[1] === y && old_bbox[2] === w && old_bbox[3] === h) { return; }

         // else update the bbox
         bbox[0] = x;
         bbox[1] = y;
         bbox[2] = w;
         bbox[3] = h;
         onBBoxMoved(index, bbox);
     }

     const onMouseUp = () => {
         document.removeEventListener('mousemove', onMouseMove);
         document.removeEventListener('mouseup', onMouseUp);
         $regionsChanged = true;
         $nodeValue = $nodeValue;
     }

     // Add the event listeners
     document.addEventListener('mousemove', onMouseMove);
     document.addEventListener('mouseup', onMouseUp);
 }

 async function onResize() {
     displayBoxes = await recreateDisplayBoxes();
 }
</script>

<svelte:window on:resize={onResize}/>

{#key $propsChanged}
    <Block>
        {#if widget?.attrs.title}
            {@const label = widget.attrs.title}
            <BlockLabel
                label={label}
                show_label={label != ""}
                Icon={SquareIcon}
                float={label != ""}
            />
        {/if}
        {#if showWidget}
            <div class="regions-container">
                <div bind:this={imageContainer} class="regions-image-container">
                    <img bind:this={imageElem} class="regions-image"/>
                </div>
                <div class="regions">
                    {#each displayBoxes as dBox, i}
                        {@const selected = selectedIndex === i}
                        <div class="region"
                             style:left="{dBox.xPx}px"
                             style:top="{dBox.yPx}px"
                             style:width="{dBox.widthPx}px"
                             style:height="{dBox.heightPx}px"
                             style:background={dBox.bgColor}
                             style:border-style={selected ? "solid" : "dotted"}
                             style:border-color={dBox.borderColor}
                             style:display="block"
                             style:opacity={selected ? "100%" : "40%"}
                             style:z-index={selected ? "var(--layer-3)" : "var(--layer-2)"}
                             on:mousemove={updateCursorStyle}
                             on:mousedown={(e) => onBoxMouseDown(e, i)}
                            >
                            <span class="tip"
                                  style:display={dBox.warnLargeSize ? "block" : "none"}>
                                Warning: Region very large!
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
    {:else}
            <div class="regions-empty">
                <span>(Empty canvas)</span>
            </div>
        {/if}
    </Block>
{/key}

<style lang="scss">
 .regions-container {
     position: relative;
     padding: 0;

     .regions-image-container {
         img {
             border: 3px solid var(--input-border-color);
         }
     }
 }

 .regions {
     position: absolute;
     left: 0px;
     top: 0px;
     width: 100%;
     height: 100%;

     .region {
         position: absolute;
         z-index: var(--layer-3);
         cursor: move;
         border-style: dotted;
         border-width: 2px;

         .tip {
             position: absolute;
             left: 50%;
             top: 50%;
             transform: translate(-50%, -50%);
             font-size: 12px;
             font-weight: bold;
             text-align: center;
             color: red;
             z-index: var(--layer-2);
         }
     }
 }

 .regions-empty {
     display: flex;
     position: relative;
     height: 10rem;
     justify-content: center;
     text-align: center;
     font-size: 32px;
     font-weight: bolder;
     color: var(--comfy-accent-soft);

     span {
         margin: auto;
     }
 }
</style>
