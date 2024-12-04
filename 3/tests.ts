import {expect} from "jsr:@std/expect";
import {parseMultipliers} from "./3.ts";
import type {Pair} from "./3.ts";

Deno.test("can parse one or more expressions as tuples", () => {
    const s1 = "mul(6,7)";
    const result = parseMultipliers(s1).next();
    expect(result.value).toEqual([6, 7]);

    const s2 = "mul(6,7)mul(88,0)";
    const results = parseMultipliers(s2);
    expect(results.next().value).toEqual([6, 7]);
    expect(results.next().value).toEqual([88, 0]);
});
