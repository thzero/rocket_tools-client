<template>
	<v-btn
		ref="btnOpen"
		:color="innerValue"
		@click="open"
		style="width:100%;"
	>
		<div class="text-subtitle-1" style="width:100%;">{{ label }}</div>
		<v-overlay
			v-model="dialogSignal"
			@keydown.esc="close"
        	scroll-strategy="reposition"
		>
			<v-card>
				<v-card-title class="headline">
					{{ label }}
				</v-card-title>
				<v-card-text>
					<v-color-picker
						v-model="innerValue"
						:disabled="disabled"
						show-swatches
						swatches-max-height="20vh"
					/>
					<div
						class="text-right mt-2"
						style="margin-left: auto; margin-right: 0px;"
					>
						<v-btn
							@click="close"
						>
							Select
						</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-overlay>
	</v-btn>
</template>

<script>
import { computed, ref } from 'vue';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtColorWithValidation',
	extends: baseControlEdit,
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: String,
			default: '300px'
		}
	},
	setup (props) {
		const dialogSignal = ref(false);

		const buttonColor = computed(() => {
			return innerValue.value;
		});

		const open = () => {
			dialogSignal.value = true;
		}
		const close = (value) => {
			dialogSignal.value = false;
		};

		return Object.assign(baseControlEdit.setup(props), {
			buttonColor,
			close,
			dialogSignal,
			open
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
