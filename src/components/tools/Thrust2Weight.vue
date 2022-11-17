<template>
	<div>
		<div>
			<div class="q-pb-md q-gutter-sm"
				v-if="errors"
			>
				<q-banner rounded inline-actions dense class="bg-red text-white">
					<span v-html="errorMessage"></span>
				</q-banner>
			</div>
			<div class="row">
				<div class="col-12 text-center text-h5 q-pb-sm">
					{{ $t('titles.tools.thrust2Weight') }}
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3"/>
				<div class="col-lg-6 col-xs-12">
					<q-card
						flat
						bordered
						dense>
						<q-card-section>
							<q-input
								ref="mass"
								v-model.number="mass"
								type="number"
								filled
								dense
								:label="$t('thrust2Weight.mass')"
								:placeholder="$t('thrust2Weight.mass_hint')"
								:rules="[val => !!val || $t('validation.required'), val => isNumberBlankOrValid(val) || $t('validation.invalidDecimal')]"
								@change="(v) => { onChangeMass(v); }"
								@update:model-value="checkErrors"
							/>
							<q-input
								v-model="motor"
								filled
								dense
								readonly
								:label="$t('thrust2Weight.motor')"
								:placeholder="$t('thrust2Weight.motor_hint')"
								:rules="[val => isMotor(val) || $t('validation.invalidMotor')]"
							/>
							<q-input
								v-model.number="maxLaunchRodTime"
								type="number"
								filled
								dense
								readonly
								:label="$t('thrust2Weight.calculation_max_launch_rod_timespan')"
								:placeholder="$t('thrust2Weight.calculation_max_launch_rod_timespan_hint')"
								:rules="[val => !!val || $t('validation.required')]"
							/>
							<q-input
								ref="thrustInitial"
								v-model.number="thrustInitial"
								type="number"
								filled
								dense
								:label="$t('thrust2Weight.thrust_initial') + ' ' + $t('thrust2Weight.thrust')"
								:placeholder="$t('thrust2Weight.thrust_initial_hint')"
								:rules="[val => !!val || $t('validation.required'), val => isNumberBlankOrValid(val) || $t('validation.invalidDecimal')]"
								@change="(v) => { onChangeThrustInitial(v); }"
								@update:model-value="checkErrors"
							/>
							<q-input
								ref="thrustPeak"
								v-model.number="thrustPeak"
								type="number"
								filled
								dense
								:label="$t('thrust2Weight.thrust_peak') + ' ' + $t('thrust2Weight.thrust')"
								:placeholder="$t('thrust2Weight.thrust_peak_hint')"
								:rules="[val => isNumberBlankOrValid(val) || $t('validation.invalidDecimal')]"
								@change="(v) => { onChangeThrustPeak(v); }"
								@update:model-value="checkErrors"
							/>
							<q-input
								ref="thrustAverage"
								v-model.number="thrustAverage"
								type="number"
								filled
								dense
								:label="$t('thrust2Weight.thrust_average') + ' ' + $t('thrust2Weight.thrust')"
								:placeholder="$t('thrust2Weight.thrust_average_hint')"
								:rules="[val => isNumberBlankOrValid(val) || $t('validation.invalidDecimal')]"
								@change="(v) => { onChangeThrustAverage(v); }"
								@update:model-value="checkErrors"
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
									class="q-pa-sm q-mr-sm"
									dense
									color="primary"
									:label="$t('buttons.calculate')"
									:disabled="buttons.calculate.disabled"
									@click="calculationSubmit"
								/>
								<q-btn
									class="q-pa-sm"
									dense
									color="primary"
									:label="$t('buttons.reset')"
									@click="calculationReset"
								/>
							</div>
						</q-card-actions>
					</q-card>
				</div>
			</div>
			<div class="row q-pt-md">
				<div class="col-lg-3"/>
				<div class="col-lg-6 col-xs-12">
					<q-card
						flat
						bordered
						dense>
						<q-card-section>
							<div class="text-center text-h5 q-pb-sm">
								{{ $t('thrust2Weight.calculated') }}
							</div>
							<div v-if="calculationResults.calculated">
								<div class="display-flex flex-direction-row justify-content-center  q-pb-sm">
									<!-- <table>
										<tr>
											<th class="buffer">{{ $t('thrust2Weight.thrust_initial') }}</th>
											<td>{{ calculationResults.initial.toFixed(2) + ' '  + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</td>
										</tr>
										<tr v-if="calculationResults.peak">
											<th class="buffer">{{ $t('thrust2Weight.thrust_peak') }}</th>
											<td>{{ calculationResults.peak.toFixed(2) + ' ' + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</td>
										</tr>
										<tr v-if="calculationResults.average">
											<th class="buffer">{{ $t('thrust2Weight.thrust_average') }}</th>
											<td>{{ calculationResults.average.toFixed(2) + ' ' + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</td>
										</tr>
									</table> -->
									<table style="width: 100%;">
										<tr>
											<th class="buffer">{{ $t('thrust2Weight.thrust_initial') }}</th>
											<th v-if="calculationResults.peak" class="buffer">{{ $t('thrust2Weight.thrust_peak') }}</th>
											<th v-if="calculationResults.average" class="buffer">{{ $t('thrust2Weight.thrust_average') }}</th>
										</tr>
										<tr>
											<td>{{ calculationResults.initial.toFixed(2) + ' '  + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</td>
											<td v-if="calculationResults.peak">{{ calculationResults.peak.toFixed(2) + ' ' + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</td>
											<td v-if="calculationResults.average">{{ calculationResults.average.toFixed(2) + ' ' + $t('thrust2Weight.newtons_abbr') +'/' + $t('thrust2Weight.mass_metric_abbr') }}</td>
										</tr>
									</table>
								</div>
								<div
									v-if="!calculationResults.success"
									class="display-flex flex-direction-row justify-content-center"
								>
									failed
								</div>
							</div>
							<div class="display-flex flex-direction-row justify-content-center">
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
		@ok="dialogMotorSearch.ok()"
	/>
</template>

<script>
import { defineComponent } from 'vue';

import Papa from 'papaparse';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import DialogSupport from '@/library_vue/components/support/dialog';

import ToolBase from '@/components/tools/ToolBase';
import MotorSearchDialog from '@/components/external/MotorLookupDialog';

export default defineComponent({
	name: 'Thrust2Weight',
	extends: ToolBase,
	components: {
		MotorSearchDialog
	},
	data: () => ({
		buttons: {
			calculate: {
				disabled: true
			}
		},
		calculationResults: {
			calculated: false
		},
		dialogMotorSearch: new DialogSupport(),
		mass: null,
		maxLaunchRodTime: null,
		maxLaunchRodTimeDefault: 0.3,
		motor: null,
		thrustAverage: null,
		thrustInitial: null,
		thrustPeak: null,
		serviceToolThrust2Weight: null
	}),
	created() {
		this.serviceToolThrust2Weight = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT);

		this.calculationReset(false);
	},
	mounted() {
		this.reset();
		this.calculationReset(false);
	},
	methods: {
		async clickMotorSearch() {
			await this.$refs.motorSearchDialog.reset(this.correlationId(), {});
			// this.dialogMotorSearch.value.open(); // if using setup...
			this.dialogMotorSearch.open();

			this.notify('messages.saved');
		},
		calculationReset(notify) {
			this.mass = null;
			this.thrustAverage = null;
			this.thrustInitial = null;
			this.thrustPeak = null;
			this.maxLaunchRodTime = this.maxLaunchRodTimeDefault;
			this.motor = null;

			notify = (notify !== null && notify !== undefined) ? notify : true;
			if (notify)
				this.notify('messages.reset');
		},
		calculationSubmit() {
			this.calculationResults.calculated = false;
			const correlationId = this.correlationId();
			const data = this.serviceToolThrust2Weight.initialize(correlationId);
			data.mass = this.mass;
			data.thrustAverage = this.thrustAverage;
			data.thrustInitial = this.thrustInitial;
			data.thrustPeak = this.thrustPeak;
			this.calculationResults = this.serviceToolThrust2Weight.calculate(correlationId, data);
			console.log(this.calculationResults);
			this.calculationResults.calculated = true;

			this.notify('messages.calculated');
		},
		checkErrors() {
			this.$refs.thrustAverage.validate();
			this.$refs.thrustInitial.validate();
			this.$refs.thrustPeak.validate();
			this.$refs.mass.validate();
			this.buttons.calculate.disabled = this.hasError();
		},
		flightPathProcess() {
			this.reset();
			this.output = '';

			this.$refs.flightPathInput.validate();
			this.$refs.flightPathProcessor.validate();
			this.$refs.flightPathMeasurementUnits.validate();

			if (this.hasError()) {
				this.setError(GlobalUtility.$trans.t('errors.process.required'));
				return;
			}

			if (String.isNullOrEmpty(this.flightPathInput)) {
				this.setError(GlobalUtility.$trans.t('errors.process.noInput'));
				return;
			}

			const data = Papa.parse(this.flightPathInput.trim());
			if (data.errors && data.errors.length > 0) {
				this.setError(GlobalUtility.$trans.t('errors.process.unableToConvert'));
				return;
			}

			const flightInfo = {
				date: this.flightPathDate,
				style: {
					path: {
						flight: {
							color: this.flightPathStylePathFlightColor ?? this.serviceFlightPath.styleDefault.path.flight.color
						},
						ground: {
							color: this.flightPathStylePathGroundColor ?? this.serviceFlightPath.styleDefault.path.ground.color
						}
					},
					pin: {
						launch: {
							color: this.flightPathColorLaunchPinColor ?? this.serviceFlightPath.styleDefault.pin.launch.color
						},
						touchdown: {
							color: this.flightPathColorTouchdownPinColor ?? this.serviceFlightPath.styleDefault.pin.touchdown.color
						}
					}
				},
				location: this.flightPathLocation,
				title: this.flightPathTitle
			};
			const flightPathResults = this.serviceFlightPath.process(data, this.flightPathProcessor, this.flightPathMeasurementUnits, flightInfo);
			this.flightPathData = flightPathResults.info.flightPath;
			// this.output = JSON.stringify(flightPathResults, null, 2);
			this.output = flightPathResults.info.flightPath;

			this.notify('messages.processed');

			this.buttons.export.disabled = false;
		},
		hasError() {
			return (this.$refs.mass.hasError || this.$refs.thrustAverage.hasError || this.$refs.thrustInitial.hasError || this.$refs.thrustPeak.hasError);
		},
		isMotor(value) {
			return true;
		},
		isNumberBlankOrValid(value) {
			if (value === null || value === '')
				return true;
			return /^\d+$/.test(value);
		},
		onChangeDate(value) {
			GlobalUtility.$store.dispatch('setFlightDate', value);
		},
		onChangeMass(value) {
		},
		onChangeMaxLaunchRodTimespan(value) {
		},
		onChangeThrustAverage(value) {
		},
		onChangeThrustInitial(value) {
		},
		onChangeThrustPeak(value) {
		},
		reset() {
			this.buttons.calculate.disabled = true;
			this.calculationResults.calculated = false;
			this.errorMessage = null;
			if (this.errorTimer)
				clearTimeout(this.errorTimer);
		},
		setError(message) {
			this.buttons.calculate.disabled = true;
			this.errorMessage = message;

			this.errorTimer = setTimeout(() => {
				this.errorMessage = null;
				clearTimeout(this.errorTimer);
			},
			3000);
		}
	}
});
</script>
