import { regex } from "arkregex";
import { Effect, pipe } from "effect";
import { day_1_input } from "./inputs.js";

// https://adventofcode.com/2025/day/1

interface ResultInstruction {
	direction: "L" | "R";
	amount: number;
}

const computeInstructions = (
	input: string,
): Effect.Effect<ResultInstruction[], string> => {
	const inputAsArray = input.trim().split("\n");
	const inputRegex = regex("(?<direction>[L-R])(?<amount>\\d+)");
	const results: ResultInstruction[] = [];

	for (const el of inputAsArray) {
		const regexResult = inputRegex.exec(el);
		if (!regexResult) return Effect.fail("cannot match regex");

		const { amount, direction } = regexResult.groups;

		results.push({
			amount: Number(amount),
			direction: direction as ResultInstruction["direction"],
		});
	}

	return Effect.succeed(results);
};

const getPassword = (
	instructions: ResultInstruction[],
	initialDialPosition: number,
) => {
	let dialPosition = initialDialPosition;
	let finalPass = 0;

	for (const instruction of instructions) {
		const { direction, amount } = instruction;

		dialPosition =
			direction === "L" ? dialPosition - amount : dialPosition + amount;

		dialPosition = (dialPosition + 100) % 100;

		if (dialPosition === 0) {
			finalPass++;
		}
	}

	return Effect.succeed(finalPass);
};

pipe(
	Effect.succeed(day_1_input),
	Effect.flatMap(computeInstructions),
	Effect.flatMap((instructions) => getPassword(instructions, 50)),
	Effect.tap((result) => {
		console.log("Final password position:", result);
		return Effect.void;
	}),
	Effect.runSync,
);
