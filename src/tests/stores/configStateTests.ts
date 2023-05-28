import { get } from "svelte/store";
import configState, { Config2 } from "$lib/stores/configState"
import { expect } from 'vitest';
import UnitTest from "../UnitTest";
import { Watch } from "@litegraph-ts/nodes-basic";

export default class configStateTests extends UnitTest {
    test__parse__parsesBasic() {
        const testConf = {
            backend: {
                comfyUIHostname: 'test',
                comfyUIPort: 8187,
            },
            behavior: {
                alwaysStripUserState: false,
            },
        };

        expect(Config2.safeParse(testConf).success).toEqual(true);
    }

    test__parse__parsesFallbacks() {
        const testConf = {
            backend: {},
            behavior: {}
        };

        const result = Config2.safeParse(testConf)

        console.warn(result)
        expect(result.success).toEqual(true);
        expect(result.data).toEqual({
            backend: {
                comfyUIHostname: "localhost",
                comfyUIPort: 8188
            },
            behavior: {
                alwaysStripUserState: false
            }
        });
    }

    test__parse__parsesFallbacks2() {
        const testConf = "foo";

        const result = Config2.safeParse(testConf)

        console.warn(result)
        expect(result.success).toEqual(true);
        expect(result.data).toEqual({
            backend: {
                comfyUIHostname: "localhost",
                comfyUIPort: 8188
            },
            behavior: {
                alwaysStripUserState: false
            }
        });
    }
}
