import {readFileLinesAsync} from "../1/1.ts";
import {isSafe, LINE_MATCHER_RXP, numberStringToArray} from "../2/2.ts";

type Pair = [number, number];

const rxp = /mul\((\d+),(\d+)\)/g

function* parseMultipliers(s: string): Generator<Pair> {
    for (const pair of s.matchAll(rxp)) {
        yield [parseInt(pair[1]), parseInt(pair[2])];
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
    for await(const line of await readFileLinesAsync(file)) {
        for (const pair of parseMultipliers(line)) {
            sumOfResults += pair[0] * pair[1];
        }
    }
    console.log(sumOfResults);
}

main();

export {parseMultipliers};
export type {Pair};
