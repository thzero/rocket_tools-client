<template>
	<v-textarea
		v-model="innerValue"
		:error="errorI"
		:hide-details="hideDetails"
		v-bind="$attrs"
		auto-grow
		clearable
		@blur="blur"
		@update:modelValue="change"
	>
		<template v-slot:append>
			<span :class="countClass">{{ count }}</span>
		</template>
		<template v-slot:details>
			<div
				v-for="error of errorsI"
				:key="error.$uid"
			>
				<strong>{{ error.$message }}</strong>
				<small> on </small>
				<strong>{{ error.$property }}</strong>
			</div>
		</template>
	</v-textarea>
</template>

<script>
import { computed } from 'vue';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtTextAreaWithValidation',
	extends: baseControlEdit,
	props: {
		blur: {
			type: Function,
			default: () => {}
		},
		change: {
			type: Function,
			default: () => {}
		}
	},
	setup (props) {
		const count = computed(() => {
			return props.maxcount ? '(' + (innerValue.value ? innerValue.value.length : 0) + ')' : '';
		});
		const countClass = computed(() => {
			return (props.maxcount && !String.isNullOrEmpty(innerValu.value) ? innerValue.value.length > props.maxcount ? 'negative ' : '' : '') + 'title-body2';
		});
		
		return Object.assign(baseControlEdit.setup(props), {
			count,
			countClass
		});
	},
	// computed: {
	// 	count() {
	// 		return this.maxcount ? '(' + (this.innerValue ? this.innerValue.length : 0) + ')' : '';
	// 	},
	// 	countClass() {
	// 		return (this.maxcount && !String.isNullOrEmpty(this.innerValue) ? this.innerValue.length > this.maxcount ? 'negative ' : '' : '') + 'title-body2';
	// 	},
	// 	errorI() {
	// 		return this.validation ? this.validation[this.vid] ? this.validation[this.vid].$silentErrors.length > 0 : false : true;
	// 	},
	// 	errorsI() {
	// 		return this.validation ? this.validation[this.vid] ? this.validation[this.vid].$silentErrors : [] : [];
	// 	}
	// }
};
</script>

<style scoped>
</style>
