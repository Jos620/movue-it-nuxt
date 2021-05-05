import { Mutations, MutationsInterface } from "./types";

export default {
	[Mutations.SET_CURRENT_CHALLENGE_INDEX](state, index) {
		state.currentChallangeIndex = index;
	},
	[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN](state, flag) {
		state.isLevelUpModalOpen = flag;
	},
	[Mutations.COMPLETE_CHALLENGE](state, xpAmount) {
		const { current, end } = state.xp;
		const totalCurrentXp = xpAmount + current;
		// Verifica se a experiência do usuário é maior ou igual a necessária
		const shouldLevelUp = totalCurrentXp >= end;

		// Sobe o número de desafios concluídos
		state.completedChallenges += 1;

		if (shouldLevelUp) {
			const remainigXp = totalCurrentXp - end;
			// Calcula a quantidade de experiência necessária pro próximo nível
			const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);

			// Sobe o nível
			state.level += 1;

			// Altera a tabela de experiência
			state.xp = {
				current: remainigXp,
				start: 0,
				end: experienceToNextLevel
			};

			state.isLevelUpModalOpen = true;
			return;
		}

		// Caso o usuário não tenha subido de nível
		state.xp = {
			...state.xp,
			current: totalCurrentXp
		};
	},
	[Mutations.SAVE_COOKIE_DATA](state, cookie) {
		state.level = cookie.level;
		state.xp = cookie.xp;
		state.completedChallenges = cookie.completedChallenges;
	}
} as MutationsInterface;
