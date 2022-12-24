<template>
	<v-select
		v-model="innerValue"
		:item-title="itemTitle"
		:item-value="itemValue"
		:items="innerItems"
		:hide-details="hideDetails"
		:label="$attrs.label"
		:multiple="multiple"
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
	name: 'VtSelectWithValidation',
	extends: baseControlEdit,
	props: {
		change: {
			type: Function,
			default: () => {}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		items: {
			type: [Object, Array],
			default: null
		},
		itemTitle: {
			type: String,
			default: 'name'
		},
		itemValue: {
			type: String,
			default: 'id'
		},
		multiple: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
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
	// },
	// mounted() {
	// 	if (this.items)
	// 		this.innerItems = this.items;
	// 	this.initValue(this.value);
	// },
	// methods: {
	// 	text: (item) => item.displayName ? item.displayName : item.name,
	// }
};
</script>

<style scoped>
</style>
