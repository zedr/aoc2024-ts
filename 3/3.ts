import {readFileLinesAsync} from "../1/1.ts";

enum CommandType {Multiply, Do, Dont}

type Pair = [number, number];

const rxp = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g

class Command {
    type: CommandType;
    operands: Pair | null;

    constructor(text: string, operands: string[]) {
        if (text === "do()") {
            this.type = CommandType.Do;
            this.operands = null;
        } else if (text === "don't()") {
            this.type = CommandType.Dont;
            this.operands = null;
        } else if (text.slice(0, 4) === "mul(") {
            this.type = CommandType.Multiply;
            this.operands = [parseInt(operands[0]), parseInt(operands[1])];
        } else {
            throw ("Unsupported command text");
        }
    }

    execute(): number {
        if ((this.type === CommandType.Multiply) && this.operands !== null) {
            return this.operands[0] * this.operands[1];
        } else {
            throw (`Cannot execute command: ${this.type.toString()}`)
        }
    }
}

function* parseCommands(s: string): Generator<Command> {
    for (const matched of s.matchAll(rxp)) {
        yield new Command(matched[0], matched.slice(1));
    }
}

async function main(): Promise<void> {
    const filePath = "./input.txt";
    let file: Deno.FsFile;
    let sumOfResults = 0;

    // Open the file read-only
    try {
        file = await Deno.open(filePath, {read: true});
    } catch (error) {
        console.error(`Error reading file: ${filePath}: ${error}`);
        throw (error);
    }

    // iterate through the lines and count the safe ones
    let isEnabled = true;
    for await(const line of await readFileLinesAsync(file)) {
        for (const command of parseCommands(line)) {
            if (command.type === CommandType.Multiply) {
                if (isEnabled) {
                    sumOfResults += command.execute();
                }
            } else if (command.type === CommandType.Do) {
                isEnabled = true;
            } else if (command.type === CommandType.Dont) {
                isEnabled = false;
            } else {
                throw ("Unsupported command");
            }
        }
    }
    console.log(sumOfResults);
}

if (import.meta.main) main();

export {parseCommands, Command, CommandType};
export type {Pair};
