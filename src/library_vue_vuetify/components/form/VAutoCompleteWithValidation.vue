<template>
	<ValidationProvider
		:vid="vid"
		:name="$attrs.label"
		:rules="rules"
		:bail="rulesBail"
		:immediate="true"
	>
		<v-autocomplete
			v-model="innerValue"
			slot-scope="{ errors, valid }"
			:error-messages="errors"
			:success="valid"
			:loading="loading"
			:items="innerItems"
			:search-input.sync="search"
			cache-items
			item-text="name"
			item-value="id"
		/>
	</ValidationProvider>
</template>

<script>
import LibraryUtility from '@thzero/library_common/utility';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtAutoCompleteWithValidation',
	extends: baseControlEdit,
	props: {
		rules: {
			type: [Object, String],
			default: ''
		},
		rulesBail: {
			type: Boolean,
			default: true
		},
		rulesImmediate: {
			type: Boolean,
			default: false
		},
		items: {
			type: [Object, Array],
			default: null
		},
		label: {
			type: [Object, String],
			default: ''
		},
		querySelection: {
			type: Function,
			default: null
		},
		// must be included in props
		value: {
			type: null,
			default: null
		}
	},
	setup (props) {
		return Object.assign(baseControlEdit.setup(props), {
		});
	},
	data: () => ({
		innerItems: [],
		loading: false,
		search: null
	}),
	watch: {
		async search(newVal) {
			newVal && (newVal !== this.innerValue) && await this.executeQuery(newVal);
		},
		// Handles external model changes.
		value(newVal) {
			this.initValue(newVal);
		}
	},
	mounted() {
		this.initValue(this.value);
	},
	methods: {
		async executeQuery(newVal) {
			// this.loading = true
			// if (this.querySelection)
			//	 this.innerItems = await this.querySelection(newVal)
			// else
			//	 this.innerItems = []
			// this.loading = false
			this.update(this, newVal);
		},
		validation() {
			return this.$refs.prv;
		},
		update: LibraryUtility.debounce(async function(self, newVal) {
			self.loading = true;
			if (self.querySelection)
				self.innerItems = await this.querySelection(newVal);
			else
				self.innerItems = [];
			self.loading = false;
		}, 50)
	}
};
</script>

<style scoped>
</style>
