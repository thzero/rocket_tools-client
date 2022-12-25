<template>
	<v-dialog
		v-model="dialogSignal"
		persistent
		max-width="500px"
		@keydown.esc="dialogCancel()"
	>
		<v-card>
			<v-card-title class="headline">
				{{ $attrs.label }}
			</v-card-title>
			<v-card-text>
				<div v-if="messageRaw" v-html="internalMessage"></div>
				<div v v-if="!messageRaw">{{ internalMessage }}</div>
				<div
					v-for="(item, index) in serverErrors"
					:key="index"
					class="red--text text--lighten-1 v-messages"
				>
					{{ item }}
				</div>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="primary"
					text
					@click.stop="dialogCancel()"
				>
					{{ $t('buttons.cancel') }}
				</v-btn>
				<v-btn
					color="primary"
					text
					:disabled="invalid"
					@click.stop="dialogOk()"
				>
					{{ $t('buttons.ok') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';

import VueUtility from '@thzero/library_client_vue3/utility/index';

import baseConfirmationDialog from '@/library_vue/components/baseConfirmationDialog';

export default {
	name: 'VtConfirmationDialog',
	extends: baseConfirmationDialog,
	setup(props) {
		const instance = getCurrentInstance();

		const handleError = (response, correlationId) => {
			VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
		}

		const internalMessage = computed(() => {
			return props.message ? props.message : props.nonRecoverable ? instance.ctx.$t('questions.areYouSureNonRecoverable') : instance.ctx.$t('questions.areYouSure')
		});

		return Object.assign(baseConfirmationDialog.setup(props), {
			handleError,
			internalMessage
		});
	},
	// methods: {
	// 	handleError(response, correlationId) {
	// 		VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
	// 	}
	// }
};
</script>
