import { Effect } from "effect";
import { day_4_input } from "./inputs.js";

type RollsMapType = Map<string, boolean>;

const getRollsGrid = (input: string) => {
	const rollsArray = input.trim().split("\n");

	const rollsGrid = new Map<string, boolean>();

	rollsArray.forEach((columns, row) => {
		const items = columns.split("");
		items.forEach((item, column) => {
			const isRoll = item === "@";
			rollsGrid.set(`${column},${row}`, isRoll);
		});
	});

	return Effect.succeed(rollsGrid);
};

const computeReachableRolls = (rollsGrid: RollsMapType) => {
	let reachableAmount = 0;
	rollsGrid.forEach((isRoll, key) => {
		if (!isRoll) return;

		let adjacentRolls = 0;
		const [rollColStr, rollRowStr] = key.split(",");
		const rollCol = Number(rollColStr);
		const rollRow = Number(rollRowStr);
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (dx === 0 && dy === 0) continue;

				const adjacentIsRoll = rollsGrid.get(`${rollCol + dx},${rollRow + dy}`);

				if (adjacentIsRoll) adjacentRolls++;
			}
		}

		if (adjacentRolls < 4) reachableAmount++;
	});

	return Effect.succeed(reachableAmount);
};

const program = Effect.gen(function* () {
	const rollsGrid = yield* getRollsGrid(day_4_input);
	const reachableRolls = yield* computeReachableRolls(rollsGrid);

	console.log(reachableRolls);
});

Effect.runSync(program);
