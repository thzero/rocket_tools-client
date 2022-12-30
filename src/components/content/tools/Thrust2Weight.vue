<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.thrust2Weight') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="formThrust2WeightRef"
					:validation="validation"
					:resetForm="resetForm"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.calculate"
					notifyMessageSaved="messages.calculated"
					@ok="calculationOk"
				>
					<template v-slot:default>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="massRef"
									vid="mass"
									v-model="mass"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.mass')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="thrustInitialRef"
									vid="thrustInitial"
									v-model="thrustInitial"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
									:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="thrustPeakRef"
									vid="thrustPeak"
									v-model="thrustPeak"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
									:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="thrustAverageRef"
									vid="thrustAverage"
									v-model="thrustAverage"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
									:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VTextField
									ref="motorRef"
									vid="motor"
									v-model="motor"
									:readonly="true"
									:label="$t('forms.content.tools.thrust2Weight.motor')"
									:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="maxLaunchRodTimeRef"
									vid="maxLaunchRodTime"
									v-model="maxLaunchRodTime"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.max_launch_rod_timespan')"
									:placeholder="$t('forms.content.tools.thrust2Weight.max_launch_rod_timespan_hint')"
								/>
							</v-col>
						</v-row>
					</template>
					<template v-slot:buttons_pre>
						<v-btn
							class="mr-2"
							color="primary"
							@click="clickMotorSearch"
						>
							{{ $t('buttons.search') }}
						</v-btn>
					</template>
				</VFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<div class="text-center text-h5 pb-2">
							{{ $t('strings.content.tools.thrust2Weight.calculated') }}
						</div>
						<div v-if="calculationResults.calculated">
							<v-row class="pb-2" dense>
								<v-col cols="4">
									<span class="text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_initial') }}</span>
								</v-col>
								<v-col cols="4">
									<span class="text-bold" v-if="calculationResults.peak">{{ $t('forms.content.tools.thrust2Weight.thrust_peak') }}</span>
								</v-col>
								<v-col cols="4">
									<span class="text-bold" v-if="calculationResults.average">{{ $t('forms.content.tools.thrust2Weight.thrust_average') }}</span>
								</v-col>
								<v-col cols="4">
									<span>{{ calculationResults.initial.toFixed(2) + ' '  + $t('strings.content.tools.thrust2Weight.newtons_abbr') +'/' + $t('strings.content.tools.thrust2Weight.mass_metric_abbr') }}</span>
								</v-col>
								<v-col cols="4">
									<span v-if="calculationResults.peak">{{ calculationResults.peak.toFixed(2) + ' ' + $t('strings.content.tools.thrust2Weight.newtons_abbr') +'/' + $t('strings.content.tools.thrust2Weight.mass_metric_abbr') }}</span>
								</v-col>
								<v-col cols="4">
									<span v-if="calculationResults.average">{{ calculationResults.average.toFixed(2) + ' ' + $t('strings.content.tools.thrust2Weight.newtons_abbr') +'/' + $t('strings.content.tools.thrust2Weight.mass_metric_abbr') }}</span>
								</v-col>
							</v-row>
							<v-row 
								class="pb-2"
								dense
								v-if="!calculationResults.success"
							>
								failed
							</v-row>
						</div>
						<div class="">
							{{ $t('strings.content.tools.thrust2Weight.guidance') }} <a class="external" href="https://www.thrustcurve.org" target="_blank">{{ $t('menu.thrustcurve') }}</a>.
							<div v-if="motor">
								<br>
								{{ $t('strings.content.tools.thrust2Weight.guidance2') }}
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
	<MotorLookupDialog
		ref="dialogMotorSearchRef"
		:signal="dialogMotorSearchManager.signal"
		@close="dialogMotorSearchManager.cancel()"
		@ok="selectMotor"
	/>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { between, decimal, required } from '@vuelidate/validators';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import DialogSupport from '@/library_vue/components/support/dialog';

import { useToolsBaseComponent } from '@/components/content/tools/toolBase';

import MotorLookupDialog from '@/components/external/MotorLookupDialog';

import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VTextField from '@/library_vue_vuetify/components/form//VTextField';

export default {
	name: 'Thrust2Weight',
	components: {
		MotorLookupDialog,
		VFormControl,
		VNumberFieldWithValidation,
		VTextField
	},
	setup (props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			formatNumber,
			notify,
			notifyColor,
			notifyMessage,
			notifyTimeout,
			setErrorMessage,
			setErrorTimer,
			setNotify
		} = useToolsBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		const serviceToolThrust2Weight = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT);

		const calculationData = ref(null);
		const calculationResults = ref({
			calculated: false
		});
		const dialogMotorSearchRef = ref(null);
		const dialogMotorSearchManager = ref(new DialogSupport());
		const formThrust2WeightRef = ref(null);
		const mass = ref(null);
		const maxLaunchRodTime = ref(null);
		const maxLaunchRodTimeDefault = ref(0.3);
		const motor = ref(null);
		const motorId = ref(null);
		const thrustAverage = ref(null);
		const thrustInitial = ref(null);
		const thrustPeak = ref(null);
		const settings = ref(null);

		const measurementUnitsWeight = computed(() => {
			return GlobalUtility.$trans.t('measurementUnits.' + measurementUnits.value + '.weight');
		});

		const calculationOk = async () => {
			calculationResults.value.calculated = false;
			const correlationIdI = correlationId();
			initCalculationData(correlationIdI);
			const response = await serviceToolThrust2Weight.calculate(correlationIdI, calculationData.value);
			if (response && response.success) {
				calculationResults.value = response.results;
				calculationResults.value.calculated = true;
				// this.notify('messages.thrust2Weight.calculated');
			}
		};
		const clickMotorSearch = async () => {
			await dialogMotorSearchRef.value.reset(correlationId());
			dialogMotorSearchManager.value.open();
		};
		const initCalculationData = (correlationId) => {
			calculationData.value.mass = mass.value;
			calculationData.value.maxLaunchRodTime = maxLaunchRodTime.value;
			calculationData.value.thrustAverage = thrustAverage.value;
			calculationData.value.thrustInitial = thrustInitial.value;
			calculationData.value.thrustPeak = thrustPeak.value;
		};
		const reset = async (correlationId) => {
			await formThrust2WeightRef.value.reset(correlationId, false);
			// setTimeout(async () => {
			// 	await formThrust2WeightRef.value.reset(correlationId);
			// },
			// 150);
		};

		const resetForm = (correlationId) => {
			calculationResults.value.calculated = false;
			mass.value = null;
			thrustAverage.value = null;
			thrustInitial.value = null;
			thrustPeak.value = null;
			maxLaunchRodTime.value = maxLaunchRodTimeDefault.value;
			motor.value = null;
			motorId .value= null;
		};

		const selectMotor = async (item)=> {
			const correlationIdI = correlationId();

			// this.notify('messages.thrust2Weight.motor.selected');

			const response = await serviceStore.dispatcher.requestMotor(correlationIdI, item.motorId);
			if (response) {
				initCalculationData(correlationIdI);
				const response2 = await serviceToolThrust2Weight.update(correlationIdI, response, calculationData);
				if (response2 && response2.success) {
					motor.value = item.designation;
					motorId.value = item.motorId;
					calculationData.value = response2.results;
					thrustAverage.value = calculationData.value.thrustAverage;
					thrustInitial.value = calculationData.value.thrustInitial;
					thrustPeak.value = calculationData.value.thrustPeak;
				}
			}

			dialogMotorSearchManager.value.ok();
		}

		onMounted(async () => {
			reset(false);

			settings.value = serviceStore.getters.user.getUserSettings();

			calculationData.value = serviceToolThrust2Weight.initialize(correlationId());
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			formatNumber,
			notify,
			notifyColor,
			notifyMessage,
			notifyTimeout,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			calculationData,
			calculationOk,
			calculationResults,
			clickMotorSearch,
			dialogMotorSearchRef,
			dialogMotorSearchManager,
			formThrust2WeightRef,
			initCalculationData,
			mass,
			maxLaunchRodTime,
			maxLaunchRodTimeDefault,
			measurementUnitsWeight,
			motor,
			motorId,
			reset,
			resetForm,
			selectMotor,
			serviceStore,
			serviceToolThrust2Weight,
			settings,
			thrustAverage,
			thrustInitial,
			thrustPeak,
			scope: 'Thrust2Weight',
			validation: useVuelidate({ $scope: 'Thrust2Weight' })
		};
	},
	// data: () => ({
	// 	calculationData: null,
	// 	calculationResults: {
	// 		calculated: false
	// 	},
	// 	dialogMotorSearch: new DialogSupport(),
	// 	mass: null,
	// 	maxLaunchRodTime: null,
	// 	maxLaunchRodTimeDefault: 0.3,
	// 	motor: null,
	// 	motorId: null,
	// 	thrustAverage: null,
	// 	thrustInitial: null,
	// 	thrustPeak: null,
	// 	serviceStore: null,
	// 	serviceToolThrust2Weight: null,
	// 	settings: null
	// }),
	// computed: {
	// 	measurementUnitsWeight() {
	// 		return GlobalUtility.$trans.t('measurementUnits.' + this.measurementUnits + '.weight');
	// 	}
	// },
	// created() {
	// 	this.serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	// 	this.serviceToolThrust2Weight = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT);
	// },
	// mounted() {
	// 	this.reset(false);

	// 	this.settings = this.serviceStore.getters.user.getUserSettings();

	// 	this.calculationData = this.serviceToolThrust2Weight.initialize(this.correlationId());
	// },
	// methods: {
	// 	// async calculationOk() {
	// 	// 	this.calculationResults.calculated = false;
	// 	// 	const correlationId = this.correlationId();
	// 	// 	this.initCalculationData(correlationId);
	// 	// 	const response = await this.serviceToolThrust2Weight.calculate(correlationId, this.calculationData);
	// 	// 	if (response && response.success) {
	// 	// 		this.calculationResults = response.results;
	// 	// 		this.calculationResults.calculated = true;
	// 	// 		// this.notify('messages.thrust2Weight.calculated');
	// 	// 	}
	// 	// },
	// 	// async clickMotorSearch() {
	// 	// 	// await this.$refs.motorSearchDialog.reset(this.correlationId(), {});
	// 	// 	// // this.dialogMotorSearch.value.open(); // if using setup...
	// 	// 	// this.dialogMotorSearch.open();
	// 	// },
	// 	// initCalculationData(correlationId) {
	// 	// 	this.calculationData.mass = this.mass;
	// 	// 	this.calculationData.maxLaunchRodTime = this.maxLaunchRodTime;
	// 	// 	this.calculationData.thrustAverage = this.thrustAverage;
	// 	// 	this.calculationData.thrustInitial = this.thrustInitial;
	// 	// 	this.calculationData.thrustPeak = this.thrustPeak;
	// 	// },
	// 	// reset(correlationId, notify) {
	// 	// 	this.$refs.frm.reset();

	// 	// 	// notify = (notify !== null && notify !== undefined) ? notify : true;
	// 	// 	// if (notify)
	// 	// 	// 	this.notify('messages.reset');
	// 	// },
	// 	// resetForm() {
	// 	// 	this.calculationResults.calculated = false;
	// 	// 	this.mass = null;
	// 	// 	this.thrustAverage = null;
	// 	// 	this.thrustInitial = null;
	// 	// 	this.thrustPeak = null;
	// 	// 	this.maxLaunchRodTime = this.maxLaunchRodTimeDefault;
	// 	// 	this.motor = null;
	// 	// 	this.motorId = null;
	// 	// },
	// 	// async selectMotor(item) {
	// 	// 	// const correlationId = this.correlationId();

	// 	// 	// // this.notify('messages.thrust2Weight.motor.selected');

	// 	// 	// const response = await this.serviceStore.dispatcher.getMotor(correlationId, item.motorId);
	// 	// 	// if (response) {
	// 	// 	// 	this.initCalculationData(correlationId);
	// 	// 	// 	const response2 = await this.serviceToolThrust2Weight.update(correlationId, response, this.calculationData);
	// 	// 	// 	if (response2 && response2.success) {
	// 	// 	// 		this.motor = item.designation;
	// 	// 	// 		this.motorId = item.motorId;
	// 	// 	// 		this.calculationData = response2.results;
	// 	// 	// 		this.thrustAverage = this.calculationData.thrustAverage;
	// 	// 	// 		this.thrustInitial = this.calculationData.thrustInitial;
	// 	// 	// 		this.thrustPeak = this.calculationData.thrustPeak;
	// 	// 	// 	}
	// 	// 	// }

	// 	// 	// this.dialogMotorSearch.ok();
	// 	// }
	// },
	validations () {
		return {
			mass: { required, decimal, between: between(0, 9999), $autoDirty: true },
			maxLaunchRodTime: { required, decimal, between: between(0, 5), $autoDirty: true },
			thrustAverage: { decimal, between: between(0, 999999), $autoDirty: true },
			thrustInitial: { required, decimal, between: between(0, 999999), $autoDirty: true },
			thrustPeak: { decimal, between: between(0, 999999), $autoDirty: true }
		};
	}
};
</script>
