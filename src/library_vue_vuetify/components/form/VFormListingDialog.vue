<template>
	<div>
		<v-dialog
			v-model="dialogSignal"
			persistent
			:fullscreen="fullscreenInternal"
			@keydown.esc="handleClose"
		>
			<v-card
				:style="!fullscreenInternal ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {}"
			>
		<!-- <div class="text-center">
			 dirty: {{ dirty }} invalid: {{ invalid }} disabled: {{ disabled }} buttonOkDisabled: {{ buttonOkDisabled }}
		</div> -->
				<v-card-item>
					<div class="text-center text-h5">{{ label }}</div>
					<v-form>
						<slot :buttonOkDisabled="buttonOkDisabled" :loading="loading" />
						<div
							v-for="(item, index) in serverErrors"
							:key="index"
							class="red--text text--lighten-1 v-messages"
						>
							{{ item }}
						</div>
					</v-form>
				</v-card-item>

				<v-card-text style="overflow-y: auto;" class="scroll">
					<slot name="listing"/>
				</v-card-text>

				<v-card-actions align="right">
					<v-spacer />
					<v-btn
						variant="flat"
						color="primary"
						@click="handleClose"
					>
						{{ $t('buttons.close') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<VConfirmationDialog
			v-if="buttonDelete"
			:non-recoverable="nonRecoverable"
			:signal="dialogDeleteConfirmSignal.signal"
			@cancel="dialogDeleteConfirmSignal.cancelI()"
			@ok="handleDeleteConfirmOk"
		/>
	</div>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from 'vue';

import VuetifyUtility from '../../utility/index';

import baseFormDialogControl from '@/library_vue/components/form/baseFormDialogControl';
import VConfirmationDialog from '../VConfirmationDialog';

export default {
	name: 'VtFormListingDialog',
	components: {
		VConfirmationDialog
	},
	extends: baseFormDialogControl,
	setup (props) {
		const instance = getCurrentInstance();

		const internalItem = ref(null);

		const fullscreenInternal = computed(() => {
			return VuetifyUtility.fullscreen(instance.ctx.$vuetify);
		});

		return Object.assign(baseFormDialogControl.setup(props), {
			fullscreenInternal,
			internalItem
		});
	},
	// data: () => ({
	// 	internalItem: null,
	// 	invalid: true
	// ),
	// computed: {
	// 	fullscreenInternal() {
	// 		return VuetifyUtility.fullscreen(this.$vuetify);
	// 	}
	// },
	// watch: {
	// 	// Handles external model changes.
	// validation(value) {
	// 		console.log('v.invalid: ' + value.$invalid);
	// 		console.log('v.error: ' + value.$error);
	// 		console.log('v.errors: ' + JSON.stringify(value));
	// 		this.invalid = value.$invalid;
	// 		console.log('v.invalid: ' + this.invalid);
	// 	}
	// }
};
</script>

<style scoped>
</style>
