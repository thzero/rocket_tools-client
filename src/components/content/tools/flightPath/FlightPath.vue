<template>
	<div style="min-width: 1024px">
		<div class="pb-4"
			v-if="errors"
		>
			<v-banner
				color="error"
			>
				<v-banner-text>
					<span v-html="errorMessage"></span>
				</v-banner-text>
			</v-banner>
		</div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.flightPath') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="3">
				<VFormControl
					ref="formFlightPathRef"
					:validation="validation"
					:resetForm="resetInput"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.process"
					notifyMessageSaved=""
					@ok="flightPathProcess"
				>
					<template v-slot:default>
						<div class="pb-4">
							<v-card
								class="mb-4"
								flat
								bordered
								dense>
								<v-card-item>
									<v-row dense>
										<v-col cols="12">
											<VTextFieldWithValidation
												ref="flightTitleRef"
												vid="flightTitle"
												v-model="flightTitle"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VTextFieldWithValidation
												ref="flightLocationRef"
												vid="flightLocation"
												v-model="flightLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.location')"
											/>
										</v-col>
										<v-col cols="12">
											<VDateTimeField
												ref="flightDateRef"
												vid="flightDate"
												v-model="flightDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VSelectWithValidation
												ref="flightPathMeasurementUnitsIdRef"
												v-model="flightPathMeasurementUnitsId"
												vid="flightPathMeasurementUnitsId"
												:items="flightPathMeasurementUnitsOptions"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.measurementUnits')"
											/>
										</v-col>
										<v-col cols="12">
											<VSelectWithValidation
												ref="flightPathProcessorRef"
												v-model="flightPathProcessor"
												vid="flightPathProcessor"
												:items="flightPathProcessors"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.processors.title')"
											/>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<v-card
								flat
								bordered
								dense>
								<v-expansion-panels
									v-model="styles"
								>
									<v-expansion-panel
										:title="$t('forms.content.tools.flightPath.style.title')"
										value="foo"
									>
										<v-expansion-panel-text>
											<v-row dense>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinLaunchColor"
														vid="flightPathStylePinLaunchColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.launch.color')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePathFlightColor"
														vid="flightPathStylePathFlightColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.flight.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePathGroundColor"
														vid="flightPathStylePathGroundColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.ground.color')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinTouchdownColor"
														vid="flightPathStylePinTouchdownColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.touchdown.color')"
													/>
												</v-col>
											</v-row>
										</v-expansion-panel-text>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-card>
						</div>
					</template>
					<template v-slot:buttons_post>
						<v-btn
							v-if="!buttons.export.disabled"
							class="ml-2"
							color="primary"
							v-bind="props"
							@click="flightPathExport"
						>
							{{ $t('buttons.export') }}
						</v-btn>
					</template>
					<template v-slot:after>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="flightPathInputRef"
								vid="flightPathInput"
								v-model="flightPathInput"
								:validation="validation"
								:blur="flightPathInputChange"
								:label="$t('forms.content.tools.flightPath.csv')"
							/>
						</div>
						<div class="pt-4" style="float: right">
							<v-btn
								density="compact"
								@click="flightPathInputChange"
							>
								{{ $t('buttons.top') }}
							</v-btn>
						</div>
					</template>
				</VFormControl>
			</v-col>
			<v-col cols="9" class="pl-4">
				<v-row
					id="flight-path"
					dense
					style="color: black; background-color: white"
				>
					<v-col
						cols="12"
						ref="outputRef"
					>
						<pre>
{{ output }}
						</pre>
					</v-col>
				</v-row>
				<v-row dense>
					<v-col cols="12">
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templateMainRef"
								vid="templateMain"
								v-model="templateMain"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templateMain')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinLaunchRef"
								vid="templatePinLaunch"
								v-model="templatePinLaunch"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templatePinLaunch')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinTouchdownRef"
								vid="templatePinTouchdown"
								v-model="templatePinTouchdown"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templatePinTouchdown')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinsAdditionalRef"
								vid="templatePinsAdditional"
								v-model="templatePinsAdditional"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templatePinsAdditional')"
							/>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
	<v-snackbar
		v-model="notifySignal"
		:color="notifyColor"
		:timeout="notifyTimeout"
    >
		{{ notifyMessage }}
    </v-snackbar>
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import Papa from 'papaparse';

import Constants from '@/constants';

import AppUtility from '@/utility/app';
import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';
import VuetifyUtility from '@/library_vue_vuetify/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolBase';

import VColorWithValidation from '@/library_vue_vuetify/components/form/VColorWithValidation';
import VDateTimeField from '@/library_vue_vuetify/components/form/VDateTimeFieldTemp';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@/library_vue_vuetify/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@/library_vue_vuetify/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'FlightPath',
	components: {
		VColorWithValidation,
		VDateTimeField,
		VFormControl,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	setup(props, context) {
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
			calculationOutput,
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			formatNumber,
			handleListener,
			measurementUnits,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			serviceStore,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			settings
		} = useToolsBaseComponent(
			props, 
			context
		);

		const serviceDownload = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
		const serviceFlightPath = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR);

		const buttons = ref({
			export: {
				disabled: true
			},
			process: {
				disabled: true
			}
		});
		const downloadProgress = ref(false);
		const expanded = ref(false);
		const flightDate = ref(null);
		const flightPath = ref(null);
		const flightPathData = ref(null);
		const flightPathInput = ref(null);
		const flightLocation = ref(null);
		const flightPathMeasurementUnitsId = ref(null);
		const flightPathMeasurementUnitsOptions = ref([]);
		const flightPathProcessor = ref(null);
		const flightPathProcessors = ref([]);
		const flightPathStylePathFlightColor = ref(null);
		const flightPathStylePathGroundColor = ref(null);
		const flightPathStylePinLaunchColor = ref(null);
		const flightPathStylePinTouchdownColor = ref(null);
		const flightTitle = ref(null);
		const output = ref(null);
		const processing = ref(false);
		const styles = ref(false);
		const templateMain = ref(serviceFlightPath.defaultTemplateMain);
		const templatePinLaunch = ref(serviceFlightPath.defaultTemplatePinLaunch);
		const templatePinsAdditional = ref('');
		const templatePinTouchdown = ref(serviceFlightPath.defaultTemplatePinTouchdown);
		
		const flightPathInputChange = () => {
			document.getElementById('top').scrollIntoView({behavior: 'smooth'});
		};
		const flightPathStyleLoad = (coorrelationId) => {
			if (String.isNullOrEmpty(flightPathProcessor.value))
				return;

			const style = serviceStore.getters.getFlightPathStyle(flightPathProcessor.value);
			if (!style)
				return;

			flightPathStylePathFlightColor.value = style.path.flight.color.value;
			flightPathStylePathGroundColor.value = style.path.ground.color.value;
			flightPathStylePinLaunchColor.value = style.pin.launch.color.value;
			flightPathStylePinTouchdownColor.value = style.pin.touchdown.color.value;
		};
		const flightPathStyleReset = (correlationId, notify) => {
			flightPathStylePathFlightColor.value = serviceFlightPath.styleDefault.path.flight.color;
			flightPathStylePathGroundColor.value = serviceFlightPath.styleDefault.path.ground.color;
			flightPathStylePinLaunchColor.value = serviceFlightPath.styleDefault.pin.launch.color;
			flightPathStylePinTouchdownColor.value = serviceFlightPath.styleDefault.pin.touchdown.color;

			if (notify)
				setNotify(correlationId(), 'messages.reset');
		};
		const flightPathStyleSave = () => {
			const correlationIdI = correlationId();
			if (String.isNullOrEmpty(flightPathProcessor.value))
				return;

			const style = {
				id: flightPathProcessor.value,
				path: {
					flight: {
						color: flightPathStylePathFlightColor.value
					},
					ground: {
						color: flightPathStylePathGroundColor.value
					}
				},
				pin: {
					launch: {
						color: flightPathStylePinLaunchColor.value
					},
					touchdown: {
						color: flightPathStylePinTouchdownColor.value
					}
				}
			};

			serviceStore.dispatcher.setFlightPathStyle(coorrelationIdI, style);

			setNotify(correlationIdI, 'messages.saved');
		};
		const flightPathExport = () => {
			try {
				const correlationIdI = correlationId();
				if (CommonUtility.isNull(flightPathData.value))
					return;

				downloadProgress.value = true;

				const currentDate = flightDate.value ? new Date(flightDate.value) : new Date();
				const day = currentDate.getDate();
				const month = currentDate.getMonth() + 1;
				const year = currentDate.getFullYear();

				const name = 'flight-path-' + day + '-' + month + '-' + year + '.kml';
				
				serviceDownload.download(correlationIdI, flightPathData.value,
					name,
					() => {
						AppUtility.debug2('download', 'completed');
								downloadProgress.value = false;
					},
					() => {
						AppUtility.debug2('download', 'cancelled');
								downloadProgress.value = false;
					},
					(arg) => {
						AppUtility.debug2('download', 'progress');
						AppUtility.debug2(arg);
					}
				);
			}
			catch (err) {
				downloadProgress.value = false;
				logger.exception('FlightPath', 'flightPathExport', err, correlationId);
			}
		};
		const flightPathProcess = () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);
			output.value = '';

			processing.value = true;

			try {
				if (String.isNullOrEmpty(flightPathInput.value)) {
					setError(correlationIdI, GlobalUtility.$trans.t('errors.process.noInput'));	
					processing.value = false;
					return;
				}

				const data = Papa.parse(flightPathInput.value.trim());
				if (data.errors && data.errors.length > 0) {
					setError(correlationIdI, GlobalUtility.$trans.t('errors.process.unableToConvert'));
					processing.value = false;
					return;
				}

				const flightPath = {
					date: flightDate.value,
					style: {
						path: {
							flight: {
								color: flightPathStylePathFlightColor.value ?? serviceFlightPath.value.styleDefault.path.flight.color
							},
							ground: {
								color: flightPathStylePathGroundColor.value ?? serviceFlightPath.value.styleDefault.path.ground.color
							}
						},
						pin: {
							launch: {
								color: flightPathStylePinLaunchColor.value ?? serviceFlightPath.value.styleDefault.pin.launch.color
							},
							touchdown: {
								color: flightPathStylePinTouchdownColor.value ?? serviceFlightPath.value.styleDefault.pin.touchdown.color
							}
						}
					},
					location: flightLocation.value,
					title: flightTitle.value
				};

				const flightPathResponse = serviceFlightPath.process(correlationIdI, data, flightPathProcessor.value, 
					flightPath, flightPathMeasurementUnitsId.value,
					templateMain.value, templatePinLaunch.value, templatePinTouchdown.value, templatePinsAdditional.value);
				if (hasFailed(flightPathResponse))
					return; // TODO: error...

				flightPathData.value = flightPathResponse.results.flightPath;
				// this.output = JSON.stringify(flightPathResponse.results, null, 2);
				output.value = flightPathResponse.results.flightPath;

				serviceStore.dispatcher.setFlightDate(correlationIdI, flightDate.value);
				serviceStore.dispatcher.setFlightLocation(correlationIdI, flightLocation.value);
				serviceStore.dispatcher.setFlightMeasurementUnits(correlationIdI, flightPathMeasurementUnitsId.value);
				serviceStore.dispatcher.setFlightTitle(correlationIdI, flightTitle.value);

				serviceStore.dispatcher.setFlightPathProcessor(correlationIdI, flightPathProcessor.value);

				setNotify(correlationIdI, 'messages.processed');

				buttons.value.export.disabled = false;
				processing.value = false;

				nextTick(() =>
					document.getElementById('top').scrollIntoView({behavior: 'smooth'})
				);
			}
			catch (err) {
				processing.value = false;
				logger.exception('FlightPath', 'flightPathProcess', err, correlationId);
			}
		};
		const reset = (correlationId) => {
			buttons.value.export.disabled = true;
			setErrorMessage(null);
			setErrorTimer(null);
			flightPath.value = null;
			flightPathData.value = null;
			processing.value = false;
		};
		const resetInput = () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);
			flightDate.value = null;
			flightPathProcessor.value = null;
			flightPathInput.value = null;
			flightLocation.value = null;
			flightTitle.value = null;
			buttons.value.process.disabled = true;

			setNotify(correlationIdI, 'messages.reset');
		}

		onMounted(async () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);

			flightPathStyleReset(correlationIdI, false);

			flightDate.value = serviceStore.getters.getFlightDate();
			flightLocation.value = serviceStore.getters.getFlightLocation();
			flightPathMeasurementUnitsId.value = serviceStore.getters.getFlightMeasurementUnits();
			if (String.isNullOrEmpty(flightPathMeasurementUnitsId.value))
				flightPathMeasurementUnitsId.value = AppUtility.measurementUnitsId(correlationId, settings.value);
			flightTitle.value = serviceStore.getters.getFlightTitle();

			flightPathProcessor.value = serviceStore.getters.getFlightPathProcessor();

			flightPathProcessors.value = VuetifyUtility.selectOptions(serviceFlightPath.serviceProcessors, GlobalUtility.$trans.t, 'forms.content.tools.flightPath.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
			flightPathMeasurementUnitsOptions.value = VuetifyUtility.selectOptions(AppUtility.measurementUnitsOptions(), GlobalUtility.$trans.t, 'measurementUnits');
		});
		
		watch(() => flightPathProcessor.value,
			(value) => {
				if (!value)
					return;

				flightPathStyleLoad(correlationId(), value);
			}
		);

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
			calculationOutput,
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			formatNumber,
			handleListener,
			measurementUnits,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			serviceStore,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			settings,
			serviceDownload,
			serviceFlightPath,
			buttons,
			downloadProgress,
			expanded,
			flightDate,
			flightPath,
			flightPathData,
			flightPathInput,
			flightLocation,
			flightPathMeasurementUnitsId,
			flightPathMeasurementUnitsOptions,
			flightPathProcessor,
			flightPathProcessors,
			flightPathStylePathFlightColor,
			flightPathStylePathGroundColor,
			flightPathStylePinLaunchColor,
			flightPathStylePinTouchdownColor,
			flightTitle,
			output,
			processing,
			styles,
			flightPathInputChange,
			flightPathStyleLoad,
			templateMain,
			templatePinLaunch,
			templatePinsAdditional,
			templatePinTouchdown,
			flightPathStyleReset,
			flightPathStyleSave,
			flightPathExport,
			flightPathProcess,
			reset,
			resetInput,
			scope: 'FlightPath',
			validation: useVuelidate({ $scope: 'FlightPath' })
		}
	},
	validations () {
		return {
			flightDate: { $autoDirty: true },
			flightLocation: { $autoDirty: true },
			flightPathMeasurementUnitsId: { required, $autoDirty: true },
			flightPathProcessor: { required, $autoDirty: true },
			flightPathInput: { required, $autoDirty: true },
			flightTitle: { $autoDirty: true }
		};
	}
};
</script>
