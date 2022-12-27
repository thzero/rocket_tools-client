<template>
	<v-switch
		v-model="innerValue"
		:hide-details="hideDetails"
		:label="$attrs.label"
		:disabled="disabled"
		density="compact"
		@update:modelValue="change"
	>
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
	</v-switch>
</template>

<script>
import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtSwitchWithValidation',
	extends: baseControlEdit,
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		change: {
			type: Function,
			default: () => {}
		}
	},
	setup (props) {
		return Object.assign(baseControlEdit.setup(props), {
		});
	},
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

<style scoped>
</style>
