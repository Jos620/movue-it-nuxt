import { Getters } from "./types";

export default {
	challengesLenght: state => state.allChallenges.length,
	currentXpPercentage: state => {
		const percentage = (state.xp.current / state.xp.end) * 100;
		return Number(percentage.toFixed(2));
	},
	currentChallenge: state =>
		typeof state.currentChallangeIndex === "number"
			? state.allChallenges[state.currentChallangeIndex]
			: null
} as Getters;
