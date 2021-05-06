<template>
	<div
		class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani"
	>
		<CountdownDigit :digits="minutes" />
		<span class="bg-background px-2">:</span>
		<CountdownDigit :digits="seconds" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import { Mutations } from "~/store/Countdown/types";

import CountdownDigit from "~/components/atoms/CountdownDigit.vue";

let timeout: ReturnType<typeof setTimeout>;

export default Vue.extend({
	name: "Countdown",

	components: { CountdownDigit },

	computed: {
		...mapState("Countdown", ["time", "isActive"]),
		...mapGetters("Countdown", ["minutes", "seconds"])
	},

	methods: {
		...mapMutations("Countdown", {
			setTime: Mutations.SET_TIME,
			resetTime: Mutations.RESET_TIME
		}),
		runCountdown(flag: boolean) {
			if (this.isActive && flag) {
				timeout = setTimeout(() => {
					this.setTime(this.time - 1);
				}, 1000);
			} else {
				clearTimeout(timeout);
			}
		}
	},

	watch: {
		isActive(newValue: boolean) {
			this.runCountdown(newValue);

			if (!newValue) this.resetTime();
		},

		time(newValue: number) {
			if (newValue > 0) {
				this.runCountdown(true);
			} else {
				this.$emit("completed");
			}
		}
	}
});
</script>
