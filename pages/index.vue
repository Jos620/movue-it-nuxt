<template>
	<section
		class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20"
	>
		<div class="flex flex-col w-full lg:w-1/2">
			<Profile />
			<CompletedChallenges />
			<Countdown @completed="getNewChallenge" />
			<button
				v-if="hasCountdownCompleted"
				class="button completed"
				disabled
			>
				Cycle completed
			</button>
			<button
				v-else-if="isCountdownActive"
				class="button abandon"
				@click="setCountdownState(false)"
			>
				Abandon cycle
			</button>
			<button
				v-else
				class="button start"
				@click="setCountdownState(true)"
			>
				Start a cycle
			</button>
		</div>
		<Card id="challenge" class="w-full lg:w-1/2" />
	</section>
</template>

<script lang="ts">
import Vue from "vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import { Mutations as ChallengesMT } from "~/store/Challenges/types";
import { Mutations as CountdownMT } from "~/store/Countdown/types";

import Profile from "~/components/molecules/Profile.vue";
import CompletedChallenges from "~/components/atoms/CompletedChallenges.vue";
import Countdown from "~/components/molecules/Countdown.vue";
import Card from "~/components/organisms/Card.vue";

import {
	playAudio,
	getRandomNumber,
	scrollToElement,
	sendNotification
} from "~/utils";

interface Head {
	title: string;
}

export default Vue.extend({
	head: (): Head => ({
		title: "Início | Movue It Nuxt"
	}),

	components: {
		Profile,
		CompletedChallenges,
		Countdown,
		Card
	},

	mounted() {
		if (!("Notification" in window)) return;
		Notification.requestPermission();
	},

	computed: {
		...mapState("Countdown", {
			hasCountdownCompleted: "hasCompleted",
			isCountdownActive: "isActive"
		}),
		...mapGetters("Challenges", ["challengesLenght"])
	},

	methods: {
		...mapMutations({
			setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
			setCountdownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
			setCurrentChallengeIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`
		}),
		setCountdownState(flag: boolean) {
			this.setCountdownHasCompleted(false);
			this.setCountdownIsActive(flag);
		},
		getNewChallenge() {
			const index = getRandomNumber(0, this.challengesLenght);

			this.setCountdownHasCompleted(true);
			this.setCurrentChallengeIndex(index);

			if (Notification?.permission === "granted") {
				playAudio("/notification.mp3");
				sendNotification("Novo Desafio", {
					body: "Um novo desafio começou! Vá completá-lo!",
					icon: "/favicon.png"
				});
			}

			this.$nextTick(() => {
				scrollToElement("#challenges");
			});
		}
	}
});
</script>
