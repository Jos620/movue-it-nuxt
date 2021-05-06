<template>
	<p class="w-1/2 flex gap-x-1">
		<span
			v-for="(digit, i) in splittedDigits"
			:key="i"
			class="w-1/2 bg-white rounded-md flex justify-center items-center py-3"
		>
			{{ digit }}
		</span>
	</p>
</template>

<script lang="ts">
import Vue from "vue";

import { splitValue } from "~/utils";

export default Vue.extend({
	name: "CountdownDigit",

	props: {
		digits: { type: Number, required: true }
	},

	computed: {
		splittedDigits(): string[] {
			return splitValue(this.digits);
		}
	}
});
</script>
