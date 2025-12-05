import { regex } from "arkregex";
import { Effect } from "effect";
import { day_5_input, day_5_ranges } from "./inputs.js";

const extractProductIdInput = (input: string) => {
	return Effect.succeed(
		input
			.trim()
			.split("\n")
			.map((x) => Number(x)),
	);
};

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

const isProductFresh = (
	ranges: { from: number; to: number }[],
	productIds: number[],
) => {
	let availableProductAmount = 0;
	for (const productId of productIds) {
		const isFresh = ranges.some((range) => {
			if (range.from <= productId && range.to >= productId) return true;

			return false;
		});

		if (isFresh) availableProductAmount++;
	}

	return Effect.succeed(availableProductAmount);
};

Effect.gen(function* () {
	const productIds = yield* extractProductIdInput(day_5_input);
	const ranges = yield* extractRangesFromInput(day_5_ranges);

	const freshes = yield* isProductFresh(ranges, productIds);

	console.log(freshes);
}).pipe(Effect.runSync);
