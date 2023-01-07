<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.foam') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="formFoamRef"
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
									ref="bodyTubeIDRef"
									vid="bodyTubeID"
									v-model="bodyTubeID"
									:validation="validation"
									:label="$t('forms.content.tools.foam.bodyTubeID')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="motorTubeODRef"
									vid="motorTubeOD"
									v-model="motorTubeOD"
									:validation="validation"
									:label="$t('forms.content.tools.foam.motorTubeOD')"
									:placeholder="$t('forms.content.tools.foam.motorTubeOD_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finRootLengthRef"
									vid="finRootLength"
									v-model="finRootLength"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finRootLength')"
									:placeholder="$t('forms.content.tools.foam.finRootLength_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finTabLengthRef"
									vid="finTabLength"
									v-model="finTabLength"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finTabLength')"
									:placeholder="$t('forms.content.tools.foam.finTabLength_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finWidthRef"
									vid="finWidth"
									v-model="finWidth"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finWidth')"
									:placeholder="$t('forms.content.tools.foam.finWidth_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="numberFinsRef"
									vid="numberFins"
									v-model="numberFins"
									:validation="validation"
									:label="$t('forms.content.tools.foam.numberFins')"
									:placeholder="$t('forms.content.tools.foam.numberFins_hint')"
								/>
							</v-col>
						</v-row>
					</template>
				</VFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense class="pb-2">
							<v-col class="text-center text-h5">
								{{ $t('strings.content.tools.foam.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-bold">{{ $t('forms.content.tools.foam.totalVolume') }}</span>&nbsp;&nbsp;
										<span class="text-bold" v-if="calculationResults.totalVolume">{{ calculationResults.totalVolume }}</span>
									</v-col>
								</v-row>
								<v-row 
									class="pb-2" 
									dense
									v-for="item in calculationResults.foams"
									:key="item.manufacturer"
								>
									<v-col cols="3" style="">
											{{ item.manufacturer }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.expansion }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.massGMl }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.foamWeight }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.requiredAmount }}
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<!-- <v-row dense class="pb-4">
							<v-col>
								{{ $t('strings.content.tools.thrust2Weight.guidance') }} <a class="external" href="https://www.thrustcurve.org" target="_blank">{{ $t('menu.thrustcurve') }}</a>.
								<div v-if="motor">
									<br>
									{{ $t('strings.content.tools.thrust2Weight.guidance2') }}
								</div>
							</v-col>
						</v-row> -->
						<!-- <v-row dense style="overflow: auto; max-height: 100vh;">
							<v-col
								style="overflow: overflow-y; height: 150px;"
							>
								<v-code lang="javascript">
									<template
										v-for="value in calculationOutput"
									>
										{{ value }}<br/>
									</template>
								</v-code>
							</v-col>
						</v-row> -->
						<CalculatedOuput
							v-model="calculationOutput"
						/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { between, decimal, integer, required } from '@vuelidate/validators';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useToolsBaseComponent } from '@/components/content/tools/toolBase';

import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';

export default {
	name: 'Foam',
	components: {
		CalculatedOuput,
		VFormControl,
		VNumberFieldWithValidation
	},
	setup (props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			success,
			calculationOutput,
			calculateI,
			handleListener,
			initCalculationResults,
			measurementUnits,
			resetFormI,
			serviceStore,
			toFixed,
			settings
		} = useToolsBaseComponent(props, context);

		const serviceToolsFoam = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_FOAM);

		const calculationData = ref(null);
		const calculationResults = initCalculationResults(correlationId(), ref({}));
		const formFoamRef = ref(null);
		const bodyTubeID = ref(null);
		const finRootLength = ref(null);
		const finTabLength = ref(0.3);
		const finWidth = ref(null);
		const motorTubeOD = ref(null);
		const numberFins = ref(null);

		const calculationOk = async () => {
			calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
				calculationResultsI.value.foams = [];

				const responseFoams = await serviceToolsFoam.foams(correlationIdI);
				if (!responseFoams || !responseFoams.success) {
					return false; // TODO
				}

				initCalculationData(correlationIdI);
				const responseCalc = await serviceToolsFoam.initializeCalculation(correlationIdI, calculationData.value, measurementUnits.value, settings);
				if (!responseCalc || !responseCalc.success) {
					return false; // TODO
				}

				responseCalc.results.instance.addListener(correlationIdI, handleListener);
				const responseCalcInstance = responseCalc.results.instance.calculate(correlationIdI, responseCalc.results.steps, 'volume');
				if (!responseCalcInstance || !responseCalcInstance.success) {
					return false; // TODO
				}
				calculationResultsI.value = responseCalcInstance.results;
				calculationResultsI.value.calculated = false;
				calculationResultsI.value.foams = [];
				
				let responseCalcFoam;
				let responseCalcFoamInstance;
				for (const foam of responseFoams.results) {
					foam.totalVolume = calculationResultsI.value.totalVolume;
					responseCalcFoam = await serviceToolsFoam.initializeCalculationFoam(correlationIdI, foam, measurementUnits.value);
					if (!responseCalcFoam || !responseCalcFoam.success) {
						continue; // TODO
					}

					responseCalcFoam.results.instance.addListener(correlationIdI, handleListener);
					responseCalcFoamInstance = responseCalcFoam.results.instance.calculate(correlationIdI, responseCalcFoam.results.steps, foam.manufacturer);
					if (!responseCalcFoamInstance || !responseCalcFoamInstance.success) {
						continue; // TODO
					}

					calculationResultsI.value.foams.push(responseCalcFoamInstance.results);
				}

				return true;
			});
			// calculationOutput.value = [];
			// calculationResults.value.calculated = false;
			// calculationResults.value.foams = [];

			// const correlationIdI = correlationId();
			
			// const responseFoams = await serviceToolsFoam.foams(correlationIdI);
			// if (!responseFoams || !responseFoams.success) {
			// 	return; // TODO
			// }

			// initCalculationData(correlationIdI);
			// const responseCalc = await serviceToolsFoam.initializeCalculation(correlationIdI, calculationData.value, measurementUnits.value, settings);
			// if (!responseCalc || !responseCalc.success) {
			// 	return; // TODO
			// }

			// responseCalc.results.instance.addListener(correlationIdI, handleListener);
			// const responseCalcInstance = responseCalc.results.instance.calculate(correlationIdI, responseCalc.results.steps, 'volume');
			// if (!responseCalcInstance || !responseCalcInstance.success) {
			// 	return; // TODO
			// }
			// calculationResults.value = responseCalcInstance.results;
			// calculationResults.value.calculated = false;
			// calculationResults.value.foams = [];
			
			// let responseCalcFoam;
			// let responseCalcFoamInstance;
			// for (const foam of responseFoams.results) {
			// 	foam.totalVolume = calculationResults.value.totalVolume;
			// 	responseCalcFoam = await serviceToolsFoam.initializeCalculationFoam(correlationIdI, foam, measurementUnits.value);
			// 	if (!responseCalcFoam || !responseCalcFoam.success) {
			// 		continue; // TODO
			// 	}

			// 	responseCalcFoam.results.instance.addListener(correlationIdI, handleListener);
			// 	responseCalcFoamInstance = responseCalcFoam.results.instance.calculate(correlationIdI, responseCalcFoam.results.steps, foam.manufacturer);
			// 	if (!responseCalcFoamInstance || !responseCalcFoamInstance.success) {
			// 		continue; // TODO
			// 	}

			// 	calculationResults.value.foams.push(responseCalcFoamInstance.results);
			// }

			// calculationResults.value.calculated = true;
		};
		const initCalculationData = (correlationId) => {
			calculationData.value.bodyTubeID = bodyTubeID.value;
			calculationData.value.units = Constants.MeasurementUnits.english.length.in; // TODO
			calculationData.value.finRootLength = finRootLength.value;
			calculationData.value.finTabLength = finTabLength.value;
			calculationData.value.finWidth = finWidth.value;
			calculationData.value.motorTubeOD = motorTubeOD.value;
			calculationData.value.numberFins = numberFins.value;
		};
		const reset = async (correlationId) => {
			await formFoamRef.value.reset(correlationId, false);
		};
		const resetForm = (correlationId) => {
			resetFormI(correlationId, calculationResults, (correlationId) => {
				calculationResults.value.foams = [];

				bodyTubeID.value = null;
				finRootLength.value = null;
				finTabLength.value = null;
				finWidth.value = null;
				motorTubeOD.value = null;
				numberFins .value = null;
			});
		};

		onMounted(async () => {
			reset(false);

			calculationData.value = serviceToolsFoam.initialize(correlationId());
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			success,
			calculationOutput,
			calculateI,
			handleListener,
			initCalculationResults,
			measurementUnits,
			resetFormI,
			serviceStore,
			toFixed,
			settings,
			calculationData,
			calculationResults,
			calculationOk,
			formFoamRef,
			initCalculationData,
			bodyTubeID,
			finRootLength,
			finTabLength,
			finWidth,
			motorTubeOD,
			numberFins,
			reset,
			resetForm,
			serviceToolsFoam,
			settings,
			scope: 'Thrust2Weight',
			validation: useVuelidate({ $scope: 'Thrust2Weight' })
		};
	},
	validations () {
		return {
			bodyTubeID: { required, decimal, between: between(0, 9999), $autoDirty: true },
			finRootLength: { required, decimal, between: between(0, 9999), $autoDirty: true },
			finTabLength: { decimal, between: between(0, 999999), $autoDirty: true },
			finWidth: { required, decimal, between: between(0, 999999), $autoDirty: true },
			motorTubeOD: { required, decimal, between: between(0, 999999), $autoDirty: true },
			numberFins: { required, integer, between: between(0, 999999), $autoDirty: true }
		};
	}
};
</script>
