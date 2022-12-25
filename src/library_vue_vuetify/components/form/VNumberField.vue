<template>
	<v-text-field
		v-model="innerValue"
		type="number"
		:class="displayClass"
		:readonly="readonly"
		:hint="$attrs.hint"
		:label="$attrs.label"
		v-bind="$attrs"
		@blur="blur"
		@update:modelValue="change"
	/>
</template>

<script>
import { computed } from 'vue';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtNumberField',
	extends: baseControlEdit,
	props: {
		blur: {
			type: Function,
			default: () => {}
		},
		change: {
			type: Function,
			default: () => {}
		},
		negativeColor: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		const displayClass = computed(() => {
			return props.negativeColor ? (innerValue.value < 0 ? 'text-negative' : null) : null;
		});
		
		return Object.assign(baseControlEdit.setup(props), {
			displayClass
		});
	},
	// computed: {
	// 	displayClass() {
	// 		return this.negativeColor ? (this.value < 0 ? 'text-negative' : null) : null;
	// 	}
	// },
	// watch: {
	// 	// Handles external model changes.
	// 	value(newVal) {
	// 		this.initValue(newVal);
	// 	}
	// },
	// mounted() {
	// 	this.initValue(this.value);
	// }
};
</script>

<style>
	.text-negative input{
		color: red !important;
	}
</style>
