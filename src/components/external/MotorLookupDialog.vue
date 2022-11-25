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
									{{ $t('motorSearch.guidance') }} <a target="_blank" :href="$t(searchUrl)">{{ $t(searchLocaleName) }}</a>{{ $t('motorSearch.guidance3') }}
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
							<div class="row q-mt-sm">
								<div class="col-sm-12">
									<QSelectWithValidation
										class="q-mr-sm"
										ref="manufacturer"
										v-model="manufacturer"
										vid="manufacturer"
										multiple
										max-values="2"
										:items="manufacturers"
										:validation="validation"
										:dense="true"
										:label="$t('forms.external.motorSearch.manufacturer')"
										:hint="$t('forms.external.motorSearch.manufacturer_hint')"
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
									:label="$t('buttons.reset')"
									@click="clickMotorSearchReset"
								/>
								<q-btn
									class="q-pa-sm q-mr-sm"
									color="primary"
									:label="$t('buttons.clear')"
									@click="clickMotorSearchClear"
								/>
								<q-btn
									class="q-pa-sm q-mr-sm"
									color="primary"
									:label="$t('buttons.search')"
									@click="clickMotorSearch"
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
	<QConfirmationDialog
		ref="dlgConfirm"
		:message="dlgConfirmMessage"
		messageRaw="true"
		:non-recoverable="false"
		:signal="dialogReset.signal"
		@cancel="dialogReset.cancel()"
		@ok="dialogResetOk"
	/>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

import QConfirmationDialog from '@/library_vue_quasar/components/QConfirmationDialog';
import QFormListingDialog from '@/library_vue_quasar/components/form/QFormListingDialog';
import QSelectWithValidation from '@/library_vue_quasar/components/form/QSelectWithValidation';
// import QTextFieldWithValidation from '@/library_vue_quasar/components/form/QTextFieldWithValidation';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'MotorLookupDialog',
	components: {
		QConfirmationDialog,
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
		dlgConfirmMessage: null,
		dialogReset: new DialogSupport(),
		diameter: null,
		impulseClass: null,
		manufacturer: null,
		manufacturersCache: null,
		results: [],
		sparky: false,
		serviceExternalMotorSearch: null,
		serviceStore: null,
		singleUse: false
	}),
	computed: {
		diameters() {
			return ['', '13', '18', '24', '29', '38', '75', '98'].map((item) => { return { id: item, name: (item ? item + GlobalUtility.$trans.t('motorSearch.motor_diameter_measurement') : '') }; });
		},
		impulseClasses() {
			return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].map((item) => { return { id: item, name: item }; });
		},
		manufacturers() {
			return this.manufacturersCache.map((item) => { return { id: item.abbrev, name: item.name }; });
		},
		searchLocaleName() {
			return this.serviceExternalMotorSearch.nameLocale();
		},
		searchUrl() {
			return this.serviceExternalMotorSearch.urlHuman();
		}
	},
	async created() {
		this.serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		this.serviceExternalMotorSearch = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);

		this.manufacturersCache = await this.serviceStore.dispatcher.getMotorManufacturers(this.correlationId());
	},
	methods: {
		async dialogResetOk() {
			this.dialogReset.ok();
			this.serviceStore.dispatcher.getMotorSearchReset(this.correlationId());
		},
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
		async clickMotorSearch() {
			const correlationId = this.correlationId();

			const result = await this.validation.$validate();
			this.logger.debug('FormDialog', 'submit', 'result', result, correlationId);
			if (!result)
				return;

			this.results = null;

			const request = {
				diameter: this.diameter,
				impulseClass: this.impulseClass,
				manufacturer: this.manufacturer,
				singleUse: this.singleUse,
				sparky: this.sparky
			};

			this.serviceStore.dispatcher.setMotorSearchCriteria(this.correlationId(), request);

			// const response = await this.serviceExternalMotorSearch.search(correlationId, request);
			const response = await this.serviceStore.dispatcher.getMotorSearchResults(correlationId, request);
			console.log(response);
			this.results = response || [];
		},
		async clickMotorSearchClear() {
			this.reset();
		},
		async clickMotorSearchReset() {
			const last = this.serviceStore.state.motorSearchResults !== null ? this.serviceStore.state.motorSearchResults.last : 0;
			const ttl = this.serviceStore.state.motorSearchResults !== null ? this.serviceStore.state.motorSearchResults.ttl : 0;

			const now = CommonUtility.getTimestamp();
			if (ttl < now) {
				return;
			}

			const duration = now - last;

			const spanInHours = 60 * 60 * 1000;
			const spanInDays = 24 * 60 * 60 * 1000;
			const spanInWeeks = 7 * 24 * 60 * 60 * 1000;

			const durationInWeeks = duration / spanInWeeks;
			const durationInDays = duration / spanInDays;
			const durationInHours = duration / spanInHours;

			let message = GlobalUtility.$trans.t('motorSearch.motor_reset_message') + '<br>';
			if (durationInWeeks <= 1) {
				let timespan = '';
				if (durationInDays <= 1) {
					if (durationInHours < 1)
						timespan = GlobalUtility.$trans.t('motorSearch.motor_reset_message_time_hour_less');
					else
						timespan = GlobalUtility.$trans.t('motorSearch.motor_reset_message_time_duration', { duration: durationInHours, type: GlobalUtility.$trans.t('motorSearch.motor_reset_hours') });
				}
				else
					timespan = GlobalUtility.$trans.t('motorSearch.motor_reset_message_time_duration', { duration: durationInDays, type: GlobalUtility.$trans.t('motorSearch.motor_reset_days') });
				message += GlobalUtility.$trans.t('motorSearch.motor_reset_message_warning', { timespan: timespan }) + '<br>' + GlobalUtility.$trans.t('motorSearch.motor_reset_message_warning2') + '<br>';
			}
			message = message + GlobalUtility.$trans.t('motorSearch.motor_reset_message_confirm');

			this.dlgConfirmMessage = message;
			this.dialogReset.open();
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
			this.manufacturer = null;
			this.results = null;

			const data = this.serviceStore.getters.getMotorSearchCriteria();
			if (!data)
				return;

			this.diameter = data.diameter;
			this.impulseClass = data.impulseClass;
			this.manufacturer = data.manufacturer;
			this.sparky = !CommonUtility.isNull(data.sparky) ? data.sparky : false;
			this.singleUse = !CommonUtility.isNull(data.singleUse) ? data.singleUse : false;

			(async (self) => {
				self.clickMotorSearch();
			})(this);
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
