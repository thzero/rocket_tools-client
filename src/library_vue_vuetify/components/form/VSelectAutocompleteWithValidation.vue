<template>
	<v-select
		v-model="innerValue"
		:error="errorI"
		:items="innerItems"
		:success="valid"
		item-text="name"
		item-value="id"
		:label="label"
		density="compact"
		@update:modelValue="change"
	>
		<template v-slot:details>
			{{ errorsI.length }}
			<div
				v-for="error of errorsI"
				:key="error.$uid"
			>
				<strong>{{ error.$message }}</strong>
				<small> on </small>
				<strong>{{ error.$property }}</strong>
			</div>
		</template>
	</v-select>
</template>

<script>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtSelectAutoCompleteWithValidation',
	extends: baseControlEdit,
	props: {
		change: {
			type: Function,
			default: () => {}
		},
		items: {
			type: [Object, Array],
			default: null
		},
		label: {
			type: [Object, String],
			default: ''
		}
	},
	setup (props) {
		const instance = getCurrentInstance();

		const innerItems = ref([]);
		
		const text = (item) => { 
			return item.displayName ? item.displayName : item.name;
		}
		
		onMounted(async () => {
			if (props.items)
				innerItems.value = props.items;
			instance.ctx.initValue(props.modelValue);
		});

		watch(() => props.items,
			(value) => {
				innerItems.value = value;
			}
		);

		return Object.assign(baseControlEdit.setup(props), {
			innerItems,
			text
		});
	},
	// data: () => ({
	// 	innerItems: []
	// }),
	// watch: {
	// 	// Handles external model changes.
	// 	items(newVal) {
	// 		this.innerItems = newVal;
	// 	},
	// 	// Handles external model changes.
	// 	value(newVal) {
	// 		this.initValue(newVal);
	// 	}
	// },
	// mounted() {
	// 	if (this.items)
	// 		this.innerItems = this.items;
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
