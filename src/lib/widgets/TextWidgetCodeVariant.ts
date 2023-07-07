import type { Extension } from "@codemirror/state";
import {
    lineNumbers,
    highlightSpecialChars,
    drawSelection,
    rectangularSelection,
    crosshairCursor,
    keymap
} from "@codemirror/view";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import {
    foldGutter,
    indentOnInput,
    syntaxHighlighting,
    defaultHighlightStyle,
    foldKeymap,
    LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent
} from "@codemirror/language";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import {
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import {
    type CompletionSource, autocompletion, CompletionContext, startCompletion,
    currentCompletions, completionStatus, completeFromList, acceptCompletion
} from "@codemirror/autocomplete"
import { styleTags, tags as t } from "@lezer/highlight"
import DanbooruTags from "$lib/DanbooruTags";

import { parser } from "./ComfyUI.grammar"

export const comfyUILanguage = LRLanguage.define({
    name: "ComfyUI",
    parser: parser.configure({
        props: [
            styleTags({
                LineComment: t.lineComment,
                BlockComment: t.blockComment,
            })
        ]
    }),
    languageData: {
        commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    }
})

export const basicSetup: Extension = /*@__PURE__*/ (() => [
    lineNumbers(),
    highlightSpecialChars(),
    history(),
    foldGutter(),
    drawSelection(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    closeBrackets(),
    rectangularSelection(),
    crosshairCursor(),
    EditorView.lineWrapping,
    DanbooruTags.getCompletionExt(),
    new LanguageSupport(comfyUILanguage),

    keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap
    ])
])();
