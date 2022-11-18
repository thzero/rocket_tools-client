<template>
	<QFormDialog
		ref="dlg"
		:label="$t('titles.external.motorSearch')"
		:signal="signal"
		:button-clear="false"
		:button-ok="false"
		:resetDialog="resetDialog"
		:validation="validation"
		max-width="700px"
		@close="close"
		@cancel="cancel"
	>
		<div class="row">
			<div class="col-12">
				<q-card
					flat
					bordered
					dense
				>
					<q-card-section>
						<div class="row">
							<div class="col-12 text-center text-h7 q-pb-sm">
								{{ $t('motorSearch.guidance') }} <a target="_blank" :href="$t(motorSearchUrl)">{{ $t(motorSearchLocaleName) }}</a>{{ $t('motorSearch.guidance3') }}
							</div>
						</div>
						<QSelectWithValidation
							ref="impulseClass"
							v-model="impulseClass"
							vid="impulseClass"
							:items="impulseClasses"
							:validation="validation"
							:label="$t('forms.external.motorSearch.impulseClass')"
						/>
					</q-card-section>
					<q-card-actions>
						<q-space></q-space>
						<div class="float-right q-mb-sm">
							<q-btn
								class="q-pa-sm q-mr-sm"
								dense
								color="primary"
								:label="$t('buttons.search')"
								@click="clickMotorSearch"
							/>
							<q-btn
								class="q-pa-sm"
								dense
								color="primary"
								:label="$t('buttons.reset')"
								@click="clickMotorSearchReset"
							/>
						</div>
					</q-card-actions>
				</q-card>
				<q-card
					flat
					bordered
					dense
					class="q-mt-sm"
					v-if="results"
				>
					<q-card-section>
						<div class="row">
							<div class="col-3 text-center text-h7">
								{{ resultsMax }}
							</div>
						</div>
						<div class="row">
							<div
								class="col-9 text-left text-h7"
								v-for="item in results" :key="item.motorId"
							>
								<div>
									{{ item.manufacturer }} {{ item.commonName }}
								</div>
								<div>
									{{ item.manufacturer }} {{ item.commonName }}
								</div>
							</div>
							<div class="col-3 text-right">
								button
							</div>
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</QFormDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import GlobalUtility from '@thzero/library_client/utility/global';

import Constants from '@/constants';

import base from '@/library_vue/components/base';

import QFormDialog from '@/library_vue_quasar/components/form/QFormDialog';
import QSelectWithValidation from '@/library_vue_quasar/components/form/QSelectWithValidation';
// import QTextFieldWithValidation from '@/library_vue_quasar/components/form/QTextFieldWithValidation';

export default {
	name: 'MotorLookupDialog',
	components: {
		QFormDialog,
		QSelectWithValidation //,
		// QTextFieldWithValidation
	},
	extends: base,
	props: {
		signal: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		return Object.assign(base.setup(props), {
			validation: useVuelidate()
		});
	},
	data: () => ({
		impulseClass: null,
		serviceExternalMotorSearch: null,
		results: [],
		resultsMax: null
	}),
	computed: {
		impulseClasses() {
			return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].map((item) => { return { id: item, name: item }; });
		},
		motorSearchLocaleName() {
			return this.serviceExternalMotorSearch.nameLocale();
		},
		motorSearchUrl() {
			return this.serviceExternalMotorSearch.url();
		}
	},
	created() {
		this.initializeServices();
	},
	methods: {
		initializeServices() {
			this.serviceExternalMotorSearch = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
		},
		async clickMotorSearchReset() {
			this.reset();
		},
		async clickMotorSearch() {
			this.results = null;
			this.resultsMax = null;
			this.resultsTotal = null;

			const request = {
				impulseClass: this.impulseClass
			};
			const response = await this.serviceExternalMotorSearch.search(this.correlationId(), request);
			console.log(response);
			if (response) {
				this.results = response.results;
				this.resultsMax = response.matches;
			}
		},
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async open() {
			this.fieldType = null;
			this.name = '';
		},
		async reset() {
			await this.$refs.dlg.reset();
		},
		// eslint-disable-next-line
		async resetDialog(correlationId) {
			this.impulseClass = null;
			this.results = null;
			this.resultsMax = null;
			this.resultsTotal = null;
		}
    },
	validations () {
		return {
			impulseClass: { required, $autoDirty: true }
		};
	}
};
</script>

<style scoped>
</style>
