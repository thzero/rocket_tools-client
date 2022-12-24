<template>
	<v-text-field
		v-model="innerValue"
		:error="errorI"
		:hide-details="hideDetails"
		:readonly="readonly"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		:counter="maxcount"
		@blur="blur"
		@update:modelValue="change"
	>
		<template v-slot:append>
			<span :class="countClass">{{ count }}</span>
		</template>
		<template v-slot:details>
			<div
				v-if="errorsI && errorsI.length > 0"
			>
			<div
				v-for="error of errorsI"
				:key="error.$uid"
			>
				<strong>{{ error.$message }}</strong>
				<small> on </small>
				<strong>{{ error.$property }}</strong>
			</div>
			</div>
		</template>
	</v-text-field>
</template>

<script>
import { computed } from 'vue';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtTextFieldWithValidation',
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
		disabled: {
			type: Boolean,
			default: false
		},
		maxcount: {
			type: Number,
			default: null
		},
		mincount: {
			type: Number,
			default: null
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		const count = computed(() => {
			return props.maxcount ? '(' + (innerValue .value? innerValue.value.length : 0) + ')' : '';
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
