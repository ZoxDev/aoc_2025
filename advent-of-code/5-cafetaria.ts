/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { regex } from "arkregex";
import { Effect } from "effect";
import { day_5_ranges } from "./inputs.js";

// const extractProductIdInput = (input: string) => {
// 	return Effect.succeed(
// 		input
// 			.trim()
// 			.split("\n")
// 			.map((x) => Number(x)),
// 	);
// };

const extractRangesFromInput = (input: string) => {
	const rangeRegex = regex("(?<from>\\d+)-(?<to>\\d+)");

	const ranges = input
		.trim()
		.split("\n")
		.map((range) => {
			const { from, to } = rangeRegex.exec(range)?.groups ?? { from: 0, to: 0 };

			return {
				from: Number(from),
				to: Number(to),
			};
		});

	return Effect.succeed(ranges);
};

// const isProductFresh = (
// 	ranges: { from: number; to: number }[],
// 	productIds: number[],
// ) => {
// 	let availableProductAmount = 0;
// 	for (const productId of productIds) {
// 		const isFresh = ranges.some((range) => {
// 			if (range.from <= productId && range.to >= productId) return true;

// 			return false;
// 		});

// 		if (isFresh) availableProductAmount++;
// 	}

// 	return Effect.succeed(availableProductAmount);
// };

const getFreshProducts = (ranges: { from: number; to: number }[]) => {
	if (ranges.length === 0) {
		return Effect.succeed(0);
	}

	const sorted = ranges.sort((a, b) => a.from - b.from);

	const merged: { from: number; to: number }[] = [];
	let current = sorted[0]!;

	for (let i = 1; i < sorted.length; i++) {
		const next = sorted[i];
		if (next === undefined) break;

		if (next.from <= current.to + 1) {
			current.to = Math.max(current.to, next.to);
		} else {
			merged.push(current);
			current = next;
		}
	}
	merged.push(current);

	let freshes = 0;
	for (const range of merged) {
		freshes += range.to - range.from + 1;
	}

	return Effect.succeed(freshes);
};

Effect.gen(function* () {
	// const productIds = yield* extractProductIdInput(day_5_input);
	const ranges = yield* extractRangesFromInput(day_5_ranges);

	// const freshes = yield* isProductFresh(ranges, productIds);
	const freshes = yield* getFreshProducts(ranges);

	console.log(freshes);
}).pipe(Effect.runSync);
