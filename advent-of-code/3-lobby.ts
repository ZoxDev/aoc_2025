import { Effect } from "effect";
import { day_3_input } from "./inputs.js";

const parseInput = (input: string) => {
	return input.trim().split("\n");
};

const getJoltage = (input: string) => {
	const numbers = input.split("").map((string) => Number(string));

	let firstJoltageNumber = Math.max(...numbers);
	const firstJoltageNumberIndex = numbers.indexOf(firstJoltageNumber);

	let secondJoltageNumber = Math.max(
		...numbers.slice(firstJoltageNumberIndex + 1, numbers.length),
	);

	if (firstJoltageNumberIndex === numbers.length - 1) {
		secondJoltageNumber = firstJoltageNumber;
		firstJoltageNumber = Math.max(...numbers.slice(0, firstJoltageNumberIndex));
	}

	const result = Number(`${firstJoltageNumber}${secondJoltageNumber}`);

	return Effect.succeed(result);
};

const program = Effect.gen(function* () {
	const banks = parseInput(day_3_input);

	let sum: number = 0;
	for (const bank of banks) {
		const joltage = yield* getJoltage(bank);
		sum = sum + joltage;
	}

	console.log(sum);
});

Effect.runSync(program);
