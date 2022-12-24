<template>
	<v-text-field
		v-model="innerValue"
		type="number"
		:error="errorI"
		:hide-details="hideDetails"
		:readonly="readonly"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		:class="displayClass"
		v-bind="$attrs"
		@blur="blur"
		@update:modelValue="change"
	>
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
	name: 'VtNumberFieldWithValidation',
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
		negativeColor: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
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
	// 	},
	// },
};
</script>

<style scoped>
</style>
