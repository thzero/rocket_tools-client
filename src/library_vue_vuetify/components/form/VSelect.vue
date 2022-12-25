<template>
	<v-select
		v-model="innerValue"
		:items="innerItems"
		:item-text="text"
		item-value="id"
		:hide-details="hideDetails"
		:label="$attrs.label"
		:flat="flat"
		:solo-inverted="soloInverted"
		@change="change"
	/>
</template>

<script>
import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtSelect',
	extends: baseControlEdit,
	props: {
		change: {
			type: Function,
			default: () => {}
		},
		flat: {
			type: Boolean,
			default: false
		},
		items: {
			type: [Object, Array],
			default: null
		},
		soloInverted: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		return Object.assign(baseControlEdit.setup(props), {
		});
	},
	data: () => ({
		innerItems: []
	}),
	watch: {
		// Handles external model changes.
		items(newVal) {
			this.innerItems = newVal;
		},
		// Handles external model changes.
		value(newVal) {
			this.initValue(newVal);
		}
	},
	mounted() {
		if (this.items)
			this.innerItems = this.items;
		this.initValue(this.value);
	},
	methods: {
		text: (item) => item.displayName ? item.displayName : item.name
	}
};
</script>

<style scoped>
</style>
