<template>
	<div>
		<div class="headline text-center text-h6">
			{{ label }}
		</div>
		<!-- <div class="text-center">
			 dirty: {{ dirty }} invalid: {{ invalid }} disabled: {{ disabled }} buttonOkDisabled: {{ buttonOkDisabled }}
		</div> -->
		<div>
			<v-form>
				<slot />
				<div
					v-for="(item, index) in serverErrors"
					:key="index"
					class="red--text text--lighten-1 v-messages"
				>
					{{ item }}
				</div>
			</v-form>
		</div>
		<div
			v-if="!autoSave"
			class="text-right"
		>
			<v-spacer />
			<slot name="buttons_pre"/>
			<v-btn
				v-if="buttonDelete"
				color="primary lighten-1"
				text
				@click="handleDelete"
				class="mr-2"
				:loading="isLoading"
			>
				{{ $t(buttonDeleteName) }}
			</v-btn>
			<v-btn
				v-if="buttonClear"
				color="primary lighten-1"
				text
				@click="handleClear"
				class="mr-2"
				:loading="isLoading"
			>
				{{ $t(buttonClearName) }}
			</v-btn>
			<v-btn
				v-if="buttonOk"
				:disabled="buttonOkDisabled"
				color="green darken-1"
				text
				@click="submit"
				:loading="isLoading"
			>
				{{ $t(buttonOkName) }}
			</v-btn>
		</div>
		<v-overlay
			absolute
			:value="overlayLoading"
		>
			<v-card
				color="primary"
				dark
			>
				<v-card-text>
					Saving...
					<v-progress-linear
						indeterminate
						color="white"
						class="mb-0"
					></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-overlay>
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
// import { computed, getCurrentInstance, ref, watch } from 'vue';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
// import baseEdit from '@/library_vue/components/baseEdit';
import baseFormControl from '@/library_vue/components/form/baseFormControl';

// import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'VtFormControl',
	components: {
		VConfirmationDialog
	},
	extends: baseFormControl,
	setup(props) {
		return Object.assign(baseFormControl.setup(props), {
		});
	},
}
// export default {
// 	name: 'VtFormControl',
// 	components: {
// 		VConfirmationDialog
// 	},
// 	extends: baseEdit,
// 	props: {
// 		autoSave: {
// 			type: Boolean,
// 			default: false
// 		},
// 		buttonClear: {
// 			type: Boolean,
// 			default: true
// 		},
// 		buttonClearName: {
// 			type: String,
// 			default: 'buttons.clear'
// 		},
// 		buttonDelete: {
// 			type: Boolean,
// 			default: false
// 		},
// 		buttonOk: {
// 			type: Boolean,
// 			default: true
// 		},
// 		buttonOkName: {
// 			type: String,
// 			default: 'buttons.ok'
// 		},
// 		disabled: {
// 			type: Boolean,
// 			default: false
// 		},
// 		label: {
// 			type: String,
// 			default: ''
// 		},
// 		preCompleteDelete: {
// 			type: Function,
// 			default: null
// 		},
// 		preCompleteOk: {
// 			type: Function,
// 			default: null
// 		},
// 		resetForm: {
// 			type: Function,
// 			default: null
// 		},
// 		validation: {
// 			type: Object,
// 			default: null
// 		}
// 	},
// 	setup(props) {
// 		const instance = getCurrentInstance();

// 		const dialogDeleteConfirmSignal = ref(new DialogSupport());
// 		const dirty = ref(false);
// 		const invalid = ref(true);
// 		const isSaving = ref(false);
// 		const serverErrors = ref([]);

// 		const buttonOkDisabled = computed(() => {
// 			if (dirty.value === false)
// 				return true;
// 			return (invalid.value || props.disabled);
// 		});
// 		const overlayLoading = computed(() => {
// 			return isSaving.value && props.autoSave;
// 		});
		
// 		const handleClear = async (correlationId) => {
// 			instance.ctx.logger.debug('VFormControl', 'clear', 'clear', null, correlationId);
// 			// instance.ctx.$nextTick(() => {
// 			// 	// instance.ctx.$refs.obs.reset(correlationId);
// 			// });
// 			await instance.ctx.reset(instance.ctx.correlationId(), false);
// 		};
// 		const handleDelete = async () => {
// 			serverErrors.value = [];
// 			dialogDeleteConfirmSignal.value.open(instance.ctx.correlationId());
// 		};
// 		const handleDeleteConfirmOk = async () => {
// 			serverErrors.value = [];

// 			const correlationId = instance.ctx.correlationId();

// 			dialogDeleteConfirmSignal.value.ok();

// 			if (instance.ctx.preCompleteDelete) {
// 				const response = await instance.ctx.preCompleteDelete(correlationId);
// 				instance.ctx.logger.debug('VFormControl', 'handleDeleteConfirmOk', 'response', response, correlationId);
// 				if (instance.ctx.hasFailed(response)) {
// 					// VueUtility.handleError(this.$refs.obs, this.serverErrors.value, response, correlationId);
// 					return;
// 				}
// 			}

// 			instance.ctx.logger.debug('VFormControl', 'handleDeleteConfirmOk', 'delete', null, correlationId);
// 			await instance.ctx.handleClear(correlationId);
// 		};
// 		const reset = async (correlationId, value) => {
// 			await instance.ctx.resetFormI(correlationId, value);
// 			instance.ctx.logger.debug('VFormControl', 'clear', null, null, correlationId);
// 			serverErrors.value = [];
// 			await props.validation.$validate();
// 			await props.validation.$reset();
// 			isSaving.value = false;
// 			// const timer = setInterval(async () => {
// 			// 	clearInterval(timer);
// 			// 	const el = document.getElementsByClassName('v-card__text');
// 			// 	if (el && el.length > 0)
// 			// 		el[0].scrollTop = 0;
// 			// }, 25);
// 		};
// 		const resetControl = (correlationId, value) => {
// 		};
// 		const resetFormI = async (correlationId, value) => {
// 			if (instance.ctx.resetForm)
// 				instance.ctx.resetForm(correlationId, value);
// 		};
// 		const setErrors = (errors) => {
// 			serverErrors.value = errors !== null ? errors : [];
// 			isSaving.value = false;
// 		};
// 		const submit = async () => {
// 			const correlationId = instance.ctx.correlationId();
// 			try {
// 				isSaving.value = true;
// 				serverErrors.value = [];
// 				const correlationId = instance.ctx.correlationId();

// 				const result = await props.validation.$validate();
// 				instance.ctx.logger.debug('VFormControl', 'submit', 'result', result, correlationId);
// 				if (!result)
// 					return;

// 				if (instance.ctx.preCompleteOk) {
// 					const response = await instance.ctx.preCompleteOk(correlationId);
// 					instance.ctx.logger.debug('VFormControl', 'submit', 'response', response, correlationId);
// 					if (instance.ctx.hasFailed(response)) {
// 						// TODO
// 						// VueUtility.handleError(instance.ctx.$refs.obs, instance.ctx.serverErrors, response, correlationId);
// 						isSaving.value = false;
// 						return;
// 					}
// 				}

// 				instance.ctx.logger.debug('VFormControl', 'submit', 'ok', null, correlationId);
// 				instance.ctx.$emit('ok');
// 			}
// 			catch (err) {
// 				instance.ctx.logger.exception('VFormControl', 'submit', err, correlationId);
// 			}
// 			finally {
// 				isSaving.value = false;
// 			}
// 		};

// 		watch(() => props.validation,
// 			(value) => {
// 				// console.log('v.invalid: ' + value.$invalid);
// 				// console.log('v.error: ' + value.$error);
// 				// console.log('v.errors: ' + JSON.stringify(value));
// 				invalid.value = value.$invalid;
// 				dirty.value = value.$anyDirty;
// 				// console.log('v.invalid: ' + invalid.value);
// 			}
// 		);

// 		return Object.assign(baseEdit.setup(props), {
// 			buttonOkDisabled,
// 			dialogDeleteConfirmSignal,
// 			dirty,
// 			invalid,
// 			isSaving,
// 			overlayLoading,
// 			handleClear,
// 			handleDelete,
// 			handleDeleteConfirmOk,
// 			reset,
// 			resetControl,
// 			resetFormI,
// 			serverErrors,
// 			setErrors,
// 			submit,
// 		});
// 	},
// 	// data: () => ({
// 	// 	dialogDeleteConfirmSignal: new DialogSupport(),
// 	// 	disabled: false,
// 	// 	internalItem: null,
// 	// 	invalid: true,
//     //     isSaving: false,
// 	// }),
// 	// watch: {
// 	// 	// Handles external model changes.
// 	// 	validation(value) {
// 	// 		// console.log('v.invalid: ' + value.$invalid);
// 	// 		// console.log('v.error: ' + value.$error);
// 	// 		// console.log('v.errors: ' + JSON.stringify(value));
// 	// 		this.invalid = value.$invalid;
// 	// 		// console.log('v.invalid: ' + this.invalid);
// 	// 	}
// 	// },
// 	// computed: {
// 	// 	overlaySave() {
// 	// 		return this.isSaving && this.autoSave;
// 	// 	}
// 	// },
// 	// methods: {
// 	// 	handleClear(correlationId) {
// 	// 		this.logger.debug('VFormControl', 'clear', 'clear', null, correlationId);
// 	// 		// this.$nextTick(() => {
// 	// 		// 	// this.$refs.obs.reset(correlationId);
// 	// 		// });
// 	// 		this.reset(this.correlationId(), false);
// 	// 	},
// 	// 	async handleDelete() {
// 	// 		this.serverErrors = [];
// 	// 		this.dialogDeleteConfirmSignal.open(this.correlationId());
// 	// 	},
// 	// 	async handleDeleteConfirmOk() {
// 	// 		this.serverErrors = [];

// 	// 		const correlationId = this.correlationId();

// 	// 		this.dialogDeleteConfirmSignal.ok();

// 	// 		if (this.preCompleteDelete) {
// 	// 			const response = await this.preCompleteDelete(correlationId);
// 	// 			this.logger.debug('VFormControl', 'handleDeleteConfirmOk', 'response', response, correlationId);
// 	// 			if (this.hasFailed(response)) {
// 	// 				// VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
// 	// 				return;
// 	// 			}
// 	// 		}

// 	// 		this.logger.debug('VFormControl', 'handleDeleteConfirmOk', 'delete', null, correlationId);
// 	// 		this.handleClear(correlationId);
// 	// 	},
// 	// 	async reset(correlationId, value) {
// 	// 		await this.resetFormI(correlationId, value);
// 	// 		this.logger.debug('VFormControl', 'clear', null, null, correlationId);
// 	// 		this.serverErrors = [];
// 	// 		await this.validation.$validate();
// 	// 		this.isSaving = false;
// 	// 		// const timer = setInterval(async () => {
// 	// 		// 	clearInterval(timer);
// 	// 		// 	const el = document.getElementsByClassName('v-card__text');
// 	// 		// 	if (el && el.length > 0)
// 	// 		// 		el[0].scrollTop = 0;
// 	// 		// }, 25);
// 	// 	},
// 	// 	// eslint-disable-next-line
// 	// 	resetControl(correlationId, value) {
// 	// 	},
// 	// 	async resetFormI(correlationId, value) {
// 	// 		if (this.resetForm)
// 	// 			this.resetForm(correlationId, value);
// 	// 	},
// 	// 	setErrors(errors) {
// 	// 		this.isSaving = false;
// 	// 	},
// 	// 	async submit() {
// 	// 		try {
// 	// 			this.isSaving = true;
// 	// 			this.serverErrors = [];
// 	// 			const correlationId = this.correlationId();

// 	// 			const result = await this.validation.$validate();
// 	// 			this.logger.debug('VFormControl', 'submit', 'result', result, correlationId);
// 	// 			if (!result)
// 	// 				return;

// 	// 			let response = { success: true, route: null };
// 	// 			if (this.preCompleteOk) {
// 	// 				response = await this.preCompleteOk(correlationId);
// 	// 				this.logger.debug('VFormControl', 'submit', 'response', response, correlationId);
// 	// 				if (this.hasFailed(response)) {
// 	// 					VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
// 	// 					this.isSaving = false;
// 	// 					return;
// 	// 				}
// 	// 			}

// 	// 			this.logger.debug('VFormControl', 'submit', 'ok', null, correlationId);
// 	// 			this.$emit('ok');
// 	// 		}
// 	// 		catch (err) {
// 	// 			this._logger.exception('VFormControl', 'submit', err, correlationId);
// 	// 		}
// 	// 		finally {
// 	// 			this.isSaving = false;
// 	// 		}
// 	// 	}
// 	// }
// };
</script>

<style scoped>
</style>
