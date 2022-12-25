<template>
	<v-combobox
		v-model="select"
		:hide-details="hide-details"
		:readonly="readonly"
		:disabled="disabled"
		:error="errorI"
		:label="$attrs.label"
		:hint="hint"
		class="tag-input"
		multiple
		chips
		deletable-chips
	/>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';

import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

export default {
	name: 'VtTagsWithValidation',
	extends: base,
	props: {
		change: {
			type: Function,
			default: () => {}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		hideDetails: {
			type: Boolean,
			default: false
		},
		max: {
			type: [Number],
			default: 5
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		const instance = getCurrentInstance();

		const items = ref([]);
		const select = ref(props.modelValue ? props.modelValue : []);
		const search = ref('');
		
		const hint = computed((item) => { 
			return GlobalUtility.$trans.t('errors.tagLine.max', { max: props.max });
		});

		const paste = () => {
			this.$nextTick(() => {
				if (String.isNullOrEmpty(search.value))
					return;
				select.value.push(...search.value.split(','));
				instance.ctx.$nextTick(() => {
					// this.$emit('input', this.search)
					search.value = '';
				});
			});
		};
		const updateTags = () => {
			instance.ctx.$nextTick(() => {
				instance.ctx.$emit('input', select.value);
			});
		};
		
		onMounted(async () => {
			if (props.items)
				innerItems.value = props.items;
			instance.ctx.initValue(props.modelValue);
		});

		watch(() => select,
			(value) => {
				if (value.length <= props.max)
					return;
				// TODO: Check last entry to see if fits the rules...
				instance.ctx.$nextTick(() => instance.ctx.select.pop());
			}
		);

		return Object.assign(baseControlEdit.setup(props), {
			hint,
			items,
			paste,
			search,
			select,
			text,
			updateTags
		});
	},
	// data: () => ({
	// 		select: [],
	// 		items: [],
	// 		search: '' //sync search
	// }),
	// computed: {
	// 	hint() {
	// 		return GlobalUtility.$trans.t('errors.tagLine.max', { max: this.max });
	// 	}
	// },
	// watch: {
	// 	select(val) {
	// 		if (val.length <= this.max)
	// 			return;
	// 		// TODO: Check last entry to see if fits the rules...
	// 		this.$nextTick(() => this.select.pop());
	// 	}
	// },
	// created() {
	// 	this.select = this.value ? this.value : [];
	// },
	// methods: {
	// 	paste() {
	// 		this.$nextTick(() => {
	// 			if (String.isNullOrEmpty(this.search))
	// 				return;
	// 			this.select.push(...this.search.split(','));
	// 			this.$nextTick(() => {
	// 				// this.$emit('input', this.search)
	// 				this.search = '';
	// 			});
	// 		});
	// 	},
	// 	updateTags() {
	// 		this.$nextTick(() => {
	// 			this.$emit('input', this.select);
	// 		});
	// 	}
	// }
};
</script>

<style scoped>
.tag-input span.chip {
	background-color: #1976d2;
	color: #fff;
	font-size: 1em;
}

.tag-input span.v-chip {
	background-color: #1976d2;
	color: #fff;
	font-size:1em;
	padding-left:7px;
}

.tag-input span.v-chip::before {
		content: "label";
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 20px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
}
</style>
