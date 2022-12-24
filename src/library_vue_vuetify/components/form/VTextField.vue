<template>
	<v-text-field
		v-model="innerValue"
		:readonly="readonly"
		v-bind="$attrs"
		@blur="blur"
		@update:modelValue="change"
	/>
</template>

<script>
import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtTextField',
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
		readonly: {
			type: Boolean,
			default: false
		},
		// must be included in props
		modelValue: {
			type: null,
			default: null
		}
	},
	setup (props) {
		return Object.assign(baseControlEdit.setup(props), {
		});
	},
	// watch: {
	// 	// Handles external model changes.
	// 	modelValue(newVal) {
	// 		this.initValue(newVal);
	// 	}
	// },
	// mounted() {
	// 	this.initValue(this.value);
	// }
};
</script>

<style scoped>
</style>
