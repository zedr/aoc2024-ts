import {expect} from "jsr:@std/expect";
import {
    numberStringToArray,
    checkStatus,
    isSafe,
    Status,
    LINE_MATCHER_RXP
} from "./2.ts";

Deno.test("the regular expression parses each line correctly", () => {
    const arr1 = "1 2 3 42 5";
    const matched = arr1.match(LINE_MATCHER_RXP);
    console.log(matched);
    expect(matched).toEqual(["1", "2", "3", "42", "5"]);
})

Deno.test("string of numbers convert to arrays of integers", () => {
    expect(numberStringToArray(["1", "2", "42"])).toEqual([1, 2, 42]);
})

Deno.test("the status of two numbers can be checked", () => {
    expect(checkStatus(1, 2)).toBe(Status.Ascending);
    expect(checkStatus(2, 1)).toBe(Status.Descending);
    expect(checkStatus(2, 2)).toBe(Status.Stable);
});

Deno.test("a single array can be checked for safety", () => {
    expect(isSafe([7, 6, 4, 2, 1])).toBe(true);
    expect(isSafe([1, 2, 7, 8, 9])).toBe(false);
    expect(isSafe([9, 7, 6, 2, 1])).toBe(false);
    expect(isSafe([1, 3, 2, 4, 5])).toBe(false);
    expect(isSafe([8, 6, 4, 4, 1])).toBe(false);
    expect(isSafe([1, 3, 6, 7, 9])).toBe(true);
});
