<template>
	<QFormListingDialog
		ref="dlg"
		:label="$t('titles.external.motorSearch')"
		:signal="signal"
		:button-clear="false"
		:button-ok="false"
		:resetDialog="resetDialog"
		:validation="validation"
		max-width="70vh"
		@close="close"
		@cancel="cancel"
	>
		<template v-slot:default>
			<div class="row">
				<div class="col-12">
					<q-card
						flat
						bordered
						dense
					>
						<q-card-section class="q-section-with-actions">
							<div class="row">
								<div class="col-12 text-center text-h7 q-pb-sm">
									{{ $t('motorSearch.guidance') }} <a target="_blank" :href="$t(motorSearchUrl)">{{ $t(motorSearchLocaleName) }}</a>{{ $t('motorSearch.guidance3') }}
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<QSelectWithValidation
										class="q-mr-sm"
										ref="impulseClass"
										v-model="impulseClass"
										vid="impulseClass"
										:items="impulseClasses"
										:validation="validation"
										:dense="true"
										:label="$t('forms.external.motorSearch.impulseClass')"
									/>
								</div>
								<div class="col-sm-6">
									<QSelectWithValidation
										class="q-mr-sm"
										ref="diameter"
										v-model="diameter"
										vid="diameter"
										:items="diameters"
										:validation="validation"
										:dense="true"
										:label="$t('forms.external.motorSearch.diameter')"
									/>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<q-checkbox
										class="q-mr-sm"
										v-model="singleUse"
										dense
										:label="$t('forms.external.motorSearch.singleUse')"
									/>
								</div>
								<div class="col-sm-6">
									<q-checkbox
										class="q-mr-sm"
										v-model="sparky"
										dense
										:label="$t('forms.external.motorSearch.sparky')"
									/>
								</div>
							</div>
						</q-card-section>
						<q-card-actions>
							<q-space></q-space>
							<div class="float-right">
								<q-btn
									class="q-pa-sm q-mr-sm"
									color="primary"
									:label="$t('buttons.search')"
									@click="clickMotorSearch"
								/>
								<q-btn
									class="q-pa-sm"
									color="primary"
									:label="$t('buttons.reset')"
									@click="clickMotorSearchReset"
								/>
							</div>
						</q-card-actions>
					</q-card>
				</div>
			</div>
		</template>
		<template v-slot:listing>
			<div
				v-if="!results"
				style="height: 50vh"
			>
				&nbsp;
			</div>
			<div
				v-if="results"
				class="row"
				style="height: 50vh"
			>
				<div
					class="col-12 q-mb-sm"
					v-for="item in results" :key="item.motorId"
				>
					<table style="width: 100%;">
						<tr>
							<td colspan="2" class="text-left text-h6 text-bold">{{ item.manufacturer }} {{ item.commonName }} {{ item.sparky ? '(' + $t('motorSearch.sparky') +  ')' : '' }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold" style="width: 30%">{{ $t('motorSearch.motor_designation') }}</td><td>{{ item.designation }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_diameter') }}</td><td>{{ item.diameter }}{{ $t('motorSearch.motor_diameter_measurement') }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_caseInfo') }}</td><td>{{ motorCaseInfo(item) }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_thrust_average') }}</td><td>{{ item.avgThrustN }} {{ item.motor_thrust_newtons_abbr }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_thrust_max') }}</td><td>{{ item.maxThrustN }} {{ item.motor_thrust_newtons_abbr }}</td>
						</tr>
						<tr>
							<td colspan="2" class="text-right"><a :href="motorUrl(item)" target="_blank">{{ motorUrl(item) }}</a></td>
						</tr>
						<tr
							v-if="selectable"
						>
							<td colspan="2" class="text-right">
								<q-btn
									class=""
									dense
									color="primary"
									:label="$t('buttons.select')"
									@click="clickMotorSelect(item)"
								/>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</template>
	</QFormListingDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';

import Constants from '@/constants';

import base from '@/library_vue/components/base';

import QFormListingDialog from '@/library_vue_quasar/components/form/QFormListingDialog';
import QSelectWithValidation from '@/library_vue_quasar/components/form/QSelectWithValidation';
// import QTextFieldWithValidation from '@/library_vue_quasar/components/form/QTextFieldWithValidation';

export default {
	name: 'MotorLookupDialog',
	components: {
		QFormListingDialog,
		QSelectWithValidation //,
		// QTextFieldWithValidation
	},
	extends: base,
	props: {
		selectable: {
			type: Boolean,
			default: true
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		return Object.assign(base.setup(props), {
			scope: 'MotorLookupDialog',
			validation: useVuelidate({ $scope: 'MotorLookupDialog' })
		});
	},
	data: () => ({
		diameter: null,
		impulseClass: null,
		serviceExternalMotorSearch: null,
		results: [],
		resultsMax: null,
		sparky: false,
		singleUse: false
	}),
	computed: {
		diameters() {
			return ['', '13', '18', '24', '29', '38', '75', '98'].map((item) => { return { id: item, name: (item ? item + GlobalUtility.$trans.t('motorSearch.motor_diameter_measurement') : '') }; });
		},
		impulseClasses() {
			return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].map((item) => { return { id: item, name: item }; });
		},
		motorSearchLocaleName() {
			return this.serviceExternalMotorSearch.nameLocale();
		},
		motorSearchUrl() {
			return this.serviceExternalMotorSearch.urlHuman();
		}
	},
	created() {
		this.initializeServices();
	},
	methods: {
		motorCaseInfo(motor) {
			if (motor.type === 'SU') {
				return this.$t('motorSearch.motor_type_singleuse');
			}

			if (motor.type === 'hybrid' || motor.type === 'reload') {
				if (motor.caseInfo != null) {
					const type = this.$t('motorSearch.motor_type_' + motor.type.toLowerCase());
					return '(' + motor.caseInfo + '; ' + type + ')';
				}
			}

			return '';
		},
		motorUrl(motor) {
			return this.serviceExternalMotorSearch.urlMotor(motor);
		},
		initializeServices() {
			this.serviceExternalMotorSearch = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
		},
		async clickMotorSearchReset() {
			this.reset();
		},
		async clickMotorSearch() {
			const correlationId = this.correlationId();

			const result = await this.validation.$validate();
			this.logger.debug('FormDialog', 'submit', 'result', result, correlationId);
			if (!result)
				return;

			this.results = null;
			this.resultsMax = null;
			this.resultsTotal = null;

			const request = {
				diameter: this.diameter,
				impulseClass: this.impulseClass,
				singleUse: this.singleUse,
				sparky: this.sparky
			};

			GlobalUtility.$store.dispatch('setMotorSearch', request);

			const response = await this.serviceExternalMotorSearch.search(correlationId, request);
			console.log(response);
			if (response) {
				this.results = response.results;
				this.resultsMax = response.matches;
			}
		},
		async clickMotorSelect(item) {
			this.$emit('ok', item);
			return true;
		},
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
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

			const data = GlobalUtility.$store.getters.getMotorSearch();
			if (!data)
				return;

			this.diameter = data.diameter;
			this.impulseClass = data.impulseClass;
			this.sparky = !CommonUtility.isNull(data.sparky) ? data.sparky : false;
			this.singleUse = !CommonUtility.isNull(data.singleUse) ? data.singleUse : false;

			this.clickMotorSearch();
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
