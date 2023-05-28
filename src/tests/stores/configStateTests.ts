import { get } from "svelte/store";
import configState, { type ConfigState } from "$lib/stores/configState"
import { expect } from 'vitest';
import UnitTest from "../UnitTest";
import { Watch } from "@litegraph-ts/nodes-basic";

export default class configStateTests extends UnitTest {
    test__loadsDefaultsFromInvalid() {
        const saved = "foo"

        const config = configState.load(saved)
        expect(config).toBeInstanceOf(Object)
        expect(config.comfyUIHostname).toEqual("localhost")
    }

    test__loadsDefaultsFromBlank() {
        const saved = {}

        const config = configState.load(saved)
        expect(config).toBeInstanceOf(Object)
        expect(config.comfyUIHostname).toEqual("localhost")
    }

    test__loadsDefaultsFromInvalidValues() {
        const saved = {
            comfyUIHostname: 1234 as any
        }

        const config = configState.load(saved)
        expect(config).toBeInstanceOf(Object)
        expect(config.comfyUIHostname).toEqual("localhost")
    }
}
