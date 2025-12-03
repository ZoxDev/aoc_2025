/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { Effect } from "effect";
import { day_3_input } from "./inputs.js";

const parseInput = (input: string) => {
	return input.trim().split("\n");
};

const getJoltage = (input: string, digitsAmount: number) => {
	const numbers = input.split("").map((string) => Number(string));
	const result: number[] = [];

	let start = 0; // Current position in the array
	let remaining = digitsAmount; // How many more digits we need to select

	while (remaining > 0) {
		// How many digits can we skip?
		// We can skip at most: (total remaining - digits we still need to pick)
		const canSkip = numbers.length - start - remaining;

		// Find the max digit within the range we can search
		let maxDigit = numbers[start] ?? -1;
		let maxIndex = start;

		for (let i = start; i <= start + canSkip; i++) {
			const digit = numbers[i] ?? -1;
			if (digit > maxDigit) {
				maxDigit = digit;
				maxIndex = i;
			}
		}

		result.push(maxDigit);
		start = maxIndex + 1; // Start searching from next position
		remaining--;
	}

	const resultString = result.join("");
	return Effect.succeed(Number(resultString));
};

const program = Effect.gen(function* () {
	const banks = parseInput(day_3_input);

	let sum: number = 0;
	for (const bank of banks) {
		const joltage = yield* getJoltage(bank, 12);
		sum = sum + joltage;
	}

	console.log(sum);
});

Effect.runSync(program);
