<template>
	<v-checkbox
		v-model="innerValue"
		:hide-details="hideDetails"
		:success="valid"
		v-bind="$attrs"
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
	</v-checkbox>
</template>

<script>
import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtCheckboxWithValidation',
	extends: baseControlEdit,
	props: {
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
	// 	// Handles internal model changes.
	// 	// innerValue(newVal) {
	// 	//	 this.$emit('input', newVal)
	// 	// },
	// 	// Handles external model changes.
	// 	value(newVal) {
	// 		this.initValue(newVal);
	// 	}
	// },
	// mounted() {
	// 	this.initValue(this.value);
	// },
	// methods: {
	// 	validation() {
	// 		return this.$refs.prv;
	// 	}
	// }
};
</script>

<style scoped>
</style>
