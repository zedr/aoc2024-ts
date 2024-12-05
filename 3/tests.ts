import {expect} from "jsr:@std/expect";
import {parseCommands, Command, CommandType} from "./3.ts";

Deno.test("can parse one or more expressions as tuples", () => {
    const s1 = "mul(6,7)";
    const result = parseCommands(s1).next();
    expect(result.value.operands).toEqual([6, 7]);

    const s2 = "mul(6,7)mul(88,0)";
    const results = parseCommands(s2);
    expect(results.next().value.operands).toEqual([6, 7]);
    expect(results.next().value.operands).toEqual([88, 0]);
});

Deno.test("all three commands can be parse from text", () => {
    const cmd = new Command("mul(4,2)", ["4", "2"]);
    expect(cmd.type).toBe(CommandType.Multiply);
    expect(cmd.operands).toEqual([4, 2]);

    const cmd2 = new Command("do()", ["4", "2"]);
    expect(cmd2.type).toBe(CommandType.Do);

    const cmd3 = new Command("don't()", ["4", "2"]);
    expect(cmd3.type).toBe(CommandType.Dont);
});
