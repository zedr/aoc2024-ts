// Define an asynchronous function that returns a generator of strings
async function* readFileLinesAsync(file: Deno.FsFile): AsyncGenerator<string> {

    // Create a stream of trimmed lines read from the file
    const lines: ReadableStream<string> = file.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream(
            {
                transform(chunk, queue) {
                    chunk
                        .split("\n")
                        .forEach((line: string) => queue.enqueue(line.trim()))
                }
            }
        ));

    // Yield from generator of lines
    yield* lines;
}

async function main(): Promise<void> {
    const seq1: Array<number> = [],
        seq2: Array<number> = [];
    const rxp = /^(\d+)\s+(\d+)$/;
    const filePath = "./input.txt";
    let acc = 0;
    let file: Deno.FsFile;

    // Open the file read-only
    try {
        file = await Deno.open(filePath, {read: true});
    } catch (error) {
        console.error(`Error reading file: ${filePath}: ${error}`);
        throw (error);
    }

    for await(const line of await readFileLinesAsync(file)) {
        const match = line.match(rxp);
        if (match !== null) {
            seq1.push(parseInt(match[1]));
            seq2.push(parseInt(match[2]));
        }
    }

    seq1.sort();
    seq2.sort();

    // Check that we don't have arrays of different length
    if (seq1.length !== seq2.length) {
        throw ("Arrays are of different length!");
    }

    // Calculate the difference from the two numbers and accumulate it
    const len = seq1.length;
    for (let i = 0; i < len; i++) {
        acc += Math.abs(seq1[i] - seq2[i]);
    }

    console.log(acc);
}

if (import.meta.main) main();

export {readFileLinesAsync};
