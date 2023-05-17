console.debug = (...msg) => {
}

import { vi, describe, it } from "vitest"
import UnitTest from "./UnitTest"
import * as testSuite from "./testSuite"

import { LiteGraph } from "@litegraph-ts/core"
import "@litegraph-ts/core"
import "@litegraph-ts/nodes-basic"

LiteGraph.use_uuids = true;

// I don't like BDD syntax...
// Emulate minitest instead...
function runTests<T extends UnitTest>(ctor: new () => T) {
    const instance = new ctor()
    const ctorName = instance.constructor.name
    const idx = ctorName.indexOf("Tests")
    if (idx === -1) {
        throw `Invalid test name ${ctorName}, must end with "Tests"`
    }
    const classCategory = ctorName.substring(0, idx)
    describe(classCategory, () => {
        const allTopLevelTests: [string, Function][] = []
        const allTests: Record<string, [string, Function][]> = {}
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
            if (key.startsWith("test")) {
                const keys = key.split("__")
                let _ = null;
                let category = null;
                let testName = null;
                if (keys.length == 2) {
                    [_, testName] = keys
                }
                else {
                    [_, category, testName] = keys
                }

                const value = instance[key]
                if (typeof value === "function") {
                    const testFn = () => {
                        instance.setUp()
                        value.apply(instance)
                        instance.tearDown()
                    }

                    if (category != null) {
                        allTests[category] ||= []
                        allTests[category].push([testName, testFn])
                    }
                    else {
                        allTopLevelTests.push([testName, testFn])
                    }
                }
            }
        }

        for (const [name, testFn] of allTopLevelTests) {
            const should = name.split(/\.?(?=[A-Z])/).join(' ').toLowerCase();
            it(should, testFn.bind(instance))
        }

        for (const [category, tests] of Object.entries(allTests)) {
            describe(category, () => {
                for (const [name, testFn] of tests) {
                    const should = name.split(/\.?(?=[A-Z])/).join(' ').toLowerCase();
                    it(should, testFn.bind(instance))
                }
            })
        }
    })
}

function runTestSuite() {
    for (const ctor of Object.values(testSuite)) {
        runTests(ctor as any)
    }
}

runTestSuite();
