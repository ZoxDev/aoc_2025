import { regex } from "arkregex";
import { Effect, pipe } from "effect";
import { day_2_input } from "./inputs.js";

// https://adventofcode.com/2025/day/2

const getIdRanges = (input: string) => {
	const rangeRegex = regex("(?<from>\\d+)-(?<to>\\d+)");

	const idRanges = input
		.split(",")
		.map((range) => {
			const result = rangeRegex.exec(range)?.groups;

			return {
				from: Number(result?.from),
				to: Number(result?.to),
			};
		})
		.filter((range) => range !== undefined);

	return Effect.succeed(idRanges);
};

const findInvalidIds = (ranges: { from: number; to: number }[]) => {
	const invalidIds = ranges.flatMap((range) => {
		const ids: number[] = [];

		for (let currentId = range.from; currentId < range.to; currentId++) {
			const currentIdAsString = currentId.toString();
			const currentIdLenght = currentIdAsString.length;

			const firstHalf = currentIdAsString.slice(0, currentIdLenght / 2);
			const secondHalf = currentIdAsString.slice(
				currentIdLenght / 2,
				currentIdLenght,
			);

			if (firstHalf === secondHalf) ids.push(currentId);
		}

		return ids;
	});

	return Effect.succeed(invalidIds);
};

pipe(
	Effect.succeed(day_2_input),
	Effect.flatMap(getIdRanges),
	Effect.flatMap(findInvalidIds),
	Effect.tap((invalidIds) => {
		console.log(invalidIds);

		console.log(invalidIds.reduce((acc, curr) => acc + curr, 0));
	}),
	Effect.runSync,
);
