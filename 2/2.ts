import {readFileLinesAsync} from "../1/1.ts";

const MAX_DIFF = 3;
const LINE_MATCHER_RXP = /\d+/g;

enum Status { Ascending, Descending, Stable}

// convert an array of string representations of numbers to numbers
function numberStringToArray(nums: string[]): number[] {
    const numberArr: number[] = [];
    for (const num of nums) {
        numberArr.push(parseInt(num));
    }
    return numberArr;
}

// check the status of two numbers
function checkStatus(a: number, b: number): Status {
    if (a > b) {
        return Status.Descending;
    } else if (a < b) {
        return Status.Ascending;
    } else {
        return Status.Stable;
    }
}

// is the given sequence safe?
function isSafe(sequence: number[]): boolean {
    const sequenceLength: number = sequence.length;

    // arrays with a single member are automatically safe
    if (sequenceLength < 2) {
        return true;
    }

    // when we iterate we stop one member before the end,
    // in order to always compare two members
    const stopIdx = sequence.length - 1;
    let status: Status | null = null;
    for (let i = 0; i < stopIdx; i++) {
        const a: number = sequence[i];
        const b: number = sequence[i + 1];

        // is the sequence ascending or descending
        if (status === null) {
            // this is the first pair that will define the status for the array
            status = checkStatus(a, b);
        } else {
            // if the status changed, the sequence is unsafe
            if (status !== checkStatus(a, b)) {
                return false;
            }
        }

        // check that the distance between the two numbers
        // is not beyond the threshold
        const diff = Math.abs(a - b);
        if (diff > MAX_DIFF) {
            return false;
        }
    }
    return true;
}

async function main(): Promise<void> {
    const filePath = "./input.txt";
    let file: Deno.FsFile;
    let safeReportCount = 0;

    // Open the file read-only
    try {
        file = await Deno.open(filePath, {read: true});
    } catch (error) {
        console.error(`Error reading file: ${filePath}: ${error}`);
        throw (error);
    }

    // iterate through the lines and count the safe ones
    for await(const line of await readFileLinesAsync(file)) {
        const match = line.match(LINE_MATCHER_RXP);
        if (match !== null) {
            if (isSafe(numberStringToArray(match))) {
                safeReportCount++;
            }
        }
    }
    console.log(safeReportCount);
}

if (import.meta.main) main();

export {numberStringToArray, isSafe, checkStatus, Status, LINE_MATCHER_RXP};
