#!/usr/bin/env bash

deno test --allow-read tests.ts
deno run --check --allow-read 3.ts
