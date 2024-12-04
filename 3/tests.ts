import {expect} from "jsr:@std/expect";
import {parseMultipliers} from "./3.ts";
import type {Pair} from "./3.ts";

Deno.test("can parse one or more expressions as tuples", () => {
    const s = "mul(6,7)";
    const result = parseMultipliers(s).next();
    expect(result.value).toEqual([6, 7]);
});
