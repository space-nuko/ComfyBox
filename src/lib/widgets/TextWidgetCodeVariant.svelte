<script lang="ts">
 import type { ComfyTextNode } from "$lib/nodes/widgets";
 import { type WidgetLayout } from "$lib/stores/layoutStates";
 import { writable, type Writable } from "svelte/store";

 import type { ViewUpdate } from "@codemirror/view";
 import { EditorView, keymap, placeholder as placeholderExt } from "@codemirror/view";
 import { StateEffect, EditorState, type Extension } from "@codemirror/state";
 import { basicDark } from "cm6-theme-basic-dark";
 import { basicLight } from "cm6-theme-basic-light";

 import { basicSetup } from "./TextWidgetCodeVariant";
	import { createEventDispatcher, onMount } from "svelte";
	import { TAG_CATEGORY_COLORS } from "$lib/DanbooruTags";

 export let widget: WidgetLayout;
 export let node: ComfyTextNode;
 export let nodeValue: Writable<string> = writable("");
 export let extraExtensions: Extension[] = [];
 let lines = 5;
 let classNames = ""

 let element: HTMLDivElement;
 let view: EditorView;

 const dispatch = createEventDispatcher<{ change: string }>();

 $: lines = node?.properties?.lines || 5;

 let BaseTheme: Extension = EditorView.theme({
     "&": {
         width: "100%",
         maxWidth: "100%",
         height: "12rem",
         fontSize: "var(--text-sm)",
         backgroundColor: "var(--input-background-fill)"
     },
     ".cm-content": {
         paddingTop: "5px",
         paddingBottom: "5px",
         color: "var(--body-text-color)",
         fontFamily: "var(--font-mono)",
         minHeight: "100%"
     },
     ".cm-gutters": {
         marginRight: "1px",
         borderRight: "1px solid var(--border-color-primary)",
         backgroundColor: "transparent",
         color: "var(--body-text-color-subdued)"
     },
     ".cm-focused": {
         outline: "none"
     },
     ".cm-scroller": {
         height: "auto"
     },
     ".cm-cursor": {
         borderLeftColor: "var(--body-text-color)"
     },
     ".cm-selectionBackground": {
         backgroundColor: "var(--secondary-600) !important",
     },
     ".cm-tooltip": {
         backgroundColor: "var(--panel-background-fill) !important",
         border: "1px solid var(--panel-border-color) !important",
     },
     ".cm-tooltip-autocomplete": {
         color: "var(--body-text-color) !important",
     },
     ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
         color: "unset"
     },
     ...TAG_CATEGORY_COLORS
 })

 onMount(() => {
     view = createEditorView();
     return () => view?.destroy();
 });

 $: reconfigure()
 $: setDoc($nodeValue);
 $: updateLines(lines);

 function reconfigure(): void {
     view?.dispatch({
         effects: StateEffect.reconfigure.of(getExtensions())
     });
 }

 function setDoc(newDoc: string) {
     if (view && newDoc !== view.state.doc.toString()) {
         view.dispatch({
             changes: {
                 from: 0,
                 to: view.state.doc.length,
                 insert: newDoc
             }
         });
     }
 }

 function updateLines(newLines: number) {
     if (view) {
         view.requestMeasure({ read: updateGutters });
     }
 }

 function getGutterLineHeight(view: EditorView): string | null {
     let elements = view.dom.querySelectorAll<HTMLElement>(".cm-gutterElement");
     if (elements.length === 0) {
         return null;
     }
     for (var i = 0; i < elements.length; i++) {
         let node = elements[i];
         let height = getComputedStyle(node)?.height ?? "0px";
         if (height != "0px") {
             return height;
         }
     }
     return null;
 }

 function updateGutters(view: EditorView): any {
     let gutters = view.dom.querySelectorAll<HTMLElement>(".cm-gutter");
     let _lines = lines + 1;
     let lineHeight = getGutterLineHeight(view);
     if (!lineHeight) {
         return null;
     }
     // for (var i = 0; i < gutters.length; i++) {
     //     let node = gutters[i];
     //     node.style.minHeight = `calc(${lineHeight} * ${_lines})`;
     // }
     return null;
 }

 function handleChange(vu: ViewUpdate): void {
     if (vu.docChanged) {
         const doc = vu.state.doc;
         const text = doc.toString();
         $nodeValue = text;
         dispatch("change", text);
     }
     view.requestMeasure({ read: updateGutters });
 }

 function getBaseExtensions(readonly: boolean, placeholder: string | null): Extension[] {
     const extensions: Extension[] = [
         EditorView.editable.of(!readonly),
         EditorState.readOnly.of(readonly)
     ];

     extensions.push(basicSetup);

     if (placeholder) {
         extensions.push(placeholderExt(placeholder));
     }

     extensions.push(EditorView.updateListener.of(handleChange));

     return extensions
 }

 function getTheme(dark_mode: boolean): Extension[] {
     const extensions: Extension[] = [];

     if (dark_mode) {
         extensions.push(basicDark);
     } else {
         extensions.push(basicLight);
     }
     return extensions;
 }

 function getExtensions(): Extension[] {
     // TODO
     const readonly = false;
     const placeholder = "Placeholder..."
     const dark_mode = true;

     const stateExtensions: Extension[] = [
         ...getBaseExtensions(
             readonly,
             placeholder,
         ),
         BaseTheme,
         ...getTheme(dark_mode),
         ...extraExtensions
     ];
     return stateExtensions;
 }

 function createEditorState(value: string | null | undefined): EditorState {
     return EditorState.create({
         doc: value ?? undefined,
         extensions: getExtensions()
     });
 }

 function createEditorView(): EditorView {
     return new EditorView({
         parent: element,
         state: createEditorState($nodeValue)
     });
 }
</script>

<div class="wrap">
    <div class="codemirror-wrapper {classNames}" bind:this={element} />
</div>
<!-- <CodeMirror bind:value={$nodeValue} {styles} /> -->

<style lang="scss">
 .wrap {
     display: flex;
     flex-direction: column;
     flex-flow: column;
     margin: 0;
     padding: 0;
     height: 100%;
     border: 1px solid var(--input-border-color);

     .codemirror-wrapper {
         height: 100%;
         overflow: auto;
     }
 }

 :global(.cm-scroller) {
     height: 100% !important;
 }
</style>
