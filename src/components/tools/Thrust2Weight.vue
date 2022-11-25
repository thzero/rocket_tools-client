<template>
	<div>
		<div>
			<div class="row">
				<div class="col-12 text-center text-h5 q-pb-sm">
					{{ $t('titles.tools.thrust2Weight') }}
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3"/>
				<div class="col-lg-6 col-xs-12">
					<QFormWrapper
						ref="frm"
						:validation="validation"
						:resetForm="resetForm"
						buttonOkName="buttons.calculate"
						@ok="calculationOk"
					>
						<template v-slot:default>
							<div class="row">
								<div class="col-xs-12 col-sm-6">
									<QTextFieldWithValidation
										class="q-mr-sm"
										ref="mass"
										v-model="mass"
										vid="mass"
										:dense="true"
										:validation="validation"
										:label="$t('forms.thrust2Weight.mass')"
									/>
								</div>
								<div class="col-xs-12 col-sm-6">
									<QTextFieldWithValidation
										class="q-mr-sm"
										ref="thrustInitial"
										v-model="thrustInitial"
										:dense="true"
										vid="thrustInitial"
										:validation="validation"
										:label="$t('forms.thrust2Weight.thrust_initial') + ' ' + $t('forms.thrust2Weight.thrust')"
										:placeholder="$t('forms.thrust2Weight.thrust_initial_hint')"
									/>
								</div>
								<div class="col-xs-12 col-sm-6">
									<QTextFieldWithValidation
										class="q-mr-sm"
										ref="thrustPeak"
										v-model="thrustPeak"
										vid="thrustPeak"
										:dense="true"
										:validation="validation"
										:label="$t('forms.thrust2Weight.thrust_peak') + ' ' + $t('forms.thrust2Weight.thrust')"
										:placeholder="$t('forms.thrust2Weight.thrust_peak_hint')"
									/>
								</div>
								<div class="col-xs-12 col-sm-6">
									<QTextFieldWithValidation
										class="q-mr-sm"
										ref="thrustAverage"
										v-model="thrustAverage"
										vid="thrustAverage"
										:dense="true"
										:validation="validation"
										:label="$t('forms.thrust2Weight.thrust_average') + ' ' + $t('forms.thrust2Weight.thrust')"
										:placeholder="$t('forms.thrust2Weight.thrust_average_hint')"
									/>
								</div>
								<div class="col-xs-12 col-sm-6">
									<QTextField
										class="q-mr-sm"
										ref="motor"
										v-model="motor"
										vid="motor"
										:dense="true"
										:readonly="true"
										:label="$t('forms.thrust2Weight.motor')"
										:placeholder="$t('forms.thrust2Weight.motor_hint')"
									/>
								</div>
								<div class="col-xs-12 col-sm-6">
									<QTextFieldWithValidation
										class="q-mr-sm"
										ref="maxLaunchRodTime"
										v-model="maxLaunchRodTime"
										vid="maxLaunchRodTime"
										:validation="validation"
										:dense="true"
										:label="$t('forms.thrust2Weight.max_launch_rod_timespan')"
										:placeholder="$t('forms.thrust2Weight.max_launch_rod_timespan_hint')"
									/>
								</div>
							</div>
						</template>
						<template v-slot:buttons_pre>
							<q-btn
								color="primary"
								:label="$t('buttons.search')"
								@click="clickMotorSearch"
							/>
						</template>
					</QFormWrapper>
				</div>
			</div>
			<div class="row q-pt-md">
				<div class="col-lg-3"/>
				<div class="col-lg-6 col-xs-12">
					<q-card
						flat
						bordered
						dense
					>
						<q-card-section>
							<div class="text-center text-h5 q-pb-sm">
								{{ $t('thrust2Weight.calculated') }}
							</div>
							<div v-if="calculationResults.calculated">
								<div class="row q-pb-sm">
									<div class="col-4">
										<span class="text-bold">{{ $t('forms.thrust2Weight.thrust_initial') }}</span>
									</div>
									<div class="col-4">
										<span class="text-bold" v-if="calculationResults.peak">{{ $t('forms.thrust2Weight.thrust_peak') }}</span>
									</div>
									<div class="col-4">
										<span class="text-bold" v-if="calculationResults.average">{{ $t('forms.thrust2Weight.thrust_average') }}</span>
									</div>
									<div class="col-4">
										<span>{{ calculationResults.initial.toFixed(2) + ' '  + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</span>
									</div>
									<div class="col-4">
										<span v-if="calculationResults.peak">{{ calculationResults.peak.toFixed(2) + ' ' + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</span>
									</div>
									<div class="col-4">
										<span v-if="calculationResults.average">{{ calculationResults.average.toFixed(2) + ' ' + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</span>
									</div>
								</div>
								<div
									v-if="!calculationResults.success"
									class=""
								>
									failed
								</div>
							</div>
							<div class="">
								{{ $t('thrust2Weight.guidance') }} <a class="external" href="https://www.thrustcurve.org" target="_blank">{{ $t('menu.thrustcurve') }}</a>.
								<div v-if="motor">
									<br>
									{{ $t('thrust2Weight.guidance2') }}
								</div>
							</div>
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>

	<MotorSearchDialog
		ref="motorSearchDialog"
		:signal="dialogMotorSearch.signal"
		@cancel="dialogMotorSearch.cancel()"
		@ok="selectMotor"
	/>
</template>

<script>
import { defineComponent } from 'vue';

import useVuelidate from '@vuelidate/core';
import { between, decimal, required } from '@vuelidate/validators';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import DialogSupport from '@/library_vue/components/support/dialog';

import toolBase from '@/components/tools/ToolBase';
import MotorSearchDialog from '@/components/external/MotorLookupDialog';

import QFormWrapper from '@/library_vue_quasar/components/form/QFormWrapper';
import QTextField from '@/library_vue_quasar/components/form/QTextField';
import QTextFieldWithValidation from '@/library_vue_quasar/components/form/QTextFieldWithValidation';

export default defineComponent({
	name: 'Thrust2Weight',
	components: {
		MotorSearchDialog,
		QFormWrapper,
		QTextField,
		QTextFieldWithValidation
	},
	extends: toolBase,
	setup (props) {
		return Object.assign(toolBase.setup(props), {
			scope: 'Thrust2Weight',
			validation: useVuelidate({ $scope: 'Thrust2Weight' })
		});
	},
	data: () => ({
		calculationData: null,
		calculationResults: {
			calculated: false
		},
		dialogMotorSearch: new DialogSupport(),
		mass: null,
		maxLaunchRodTime: null,
		maxLaunchRodTimeDefault: 0.3,
		motor: null,
		motorId: null,
		thrustAverage: null,
		thrustInitial: null,
		thrustPeak: null,
		serviceStore: null,
		serviceToolThrust2Weight: null,
		settings: null
	}),
	computed: {
		measurementUnitsWeight() {
			return GlobalUtility.$trans.t('measurementUnits.' + this.measurementUnits + '.weight');
		}
	},
	created() {
		this.serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		this.serviceToolThrust2Weight = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT);
	},
	mounted() {
		this.reset(false);

		this.settings = this.serviceStore.getters.getSettings();

		this.calculationData = this.serviceToolThrust2Weight.initialize(this.correlationId());
	},
	methods: {
		async calculationOk() {
			this.calculationResults.calculated = false;
			const correlationId = this.correlationId();
			this.initCalculationData(correlationId);
			const response = await this.serviceToolThrust2Weight.calculate(correlationId, this.calculationData);
			if (response && response.success) {
				this.calculationResults = response.results;
				this.calculationResults.calculated = true;
				this.notify('messages.thrust2Weight.calculated');
			}
		},
		async clickMotorSearch() {
			await this.$refs.motorSearchDialog.reset(this.correlationId(), {});
			// this.dialogMotorSearch.value.open(); // if using setup...
			this.dialogMotorSearch.open();
		},
		initCalculationData(correlationId) {
			this.calculationData.mass = this.mass;
			this.calculationData.maxLaunchRodTime = this.maxLaunchRodTime;
			this.calculationData.thrustAverage = this.thrustAverage;
			this.calculationData.thrustInitial = this.thrustInitial;
			this.calculationData.thrustPeak = this.thrustPeak;
		},
		reset(correlationId, notify) {
			this.$refs.frm.reset();

			notify = (notify !== null && notify !== undefined) ? notify : true;
			if (notify)
				this.notify('messages.reset');
		},
		resetForm() {
			this.calculationResults.calculated = false;
			this.mass = null;
			this.thrustAverage = null;
			this.thrustInitial = null;
			this.thrustPeak = null;
			this.maxLaunchRodTime = this.maxLaunchRodTimeDefault;
			this.motor = null;
			this.motorId = null;
		},
		async selectMotor(item) {
			const correlationId = this.correlationId();

			this.notify('messages.thrust2Weight.motor.selected');

			const response = await this.serviceStore.dispatcher.getMotor(correlationId, item.motorId);
			if (response) {
				this.initCalculationData(correlationId);
				const response2 = await this.serviceToolThrust2Weight.update(correlationId, response, this.calculationData);
				if (response2 && response2.success) {
					this.motor = item.designation;
					this.motorId = item.motorId;
					this.calculationData = response2.results;
					this.thrustAverage = this.calculationData.thrustAverage;
					this.thrustInitial = this.calculationData.thrustInitial;
					this.thrustPeak = this.calculationData.thrustPeak;
				}
			}

			this.dialogMotorSearch.ok();
		}
	},
	validations () {
		return {
			mass: { required, decimal, between: between(0, 9999), $autoDirty: true },
			maxLaunchRodTime: { required, decimal, between: between(0, 5), $autoDirty: true },
			thrustAverage: { decimal, between: between(0, 999999), $autoDirty: true },
			thrustInitial: { required, decimal, between: between(0, 999999), $autoDirty: true },
			thrustPeak: { decimal, between: between(0, 999999), $autoDirty: true }
		};
	}
});
</script>
