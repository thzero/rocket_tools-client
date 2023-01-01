<template>
	<div id="top" style="min-width: 1024px">
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
				{{ $t('titles.content.tools.flightInfo') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="3">
				<VFormControl
					ref="formFlightInfoRef"
					:validation="validation"
					:resetForm="resetInput"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.process"
					@ok="flightInfoProcess"
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
												ref="flightInfoTitleRef"
												vid="flightInfoTitle"
												v-model="flightInfoTitle"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VTextFieldWithValidation
												ref="flightInfoLocationRef"
												vid="flightInfoLocation"
												v-model="flightInfoLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.location')"
											/>
										</v-col>
										<v-col cols="12">
											<VDateTimeField
												ref="flightInfoDateRef"
												vid="flightInfoDate"
												v-model="flightInfoDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VSelectWithValidation
												ref="flightInfoMeasurementUnitsRef"
												v-model="flightInfoMeasurementUnits"
												vid="flightInfoMeasurementUnits"
												:items="flightInfoMeasurementUnitsOptions"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.measurementUnits')"
											/>
										</v-col>
										<v-col cols="12">
											<VSelectWithValidation
												ref="flightInfoProcessorRef"
												v-model="flightInfoProcessor"
												vid="flightInfoProcessor"
												:items="flightInfoProcessors"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.processors.title')"
											/>
										</v-col>
										<v-col cols="12">
											<v-row dense>
												<v-col cols="12">
													<v-row dense no-gutters align="center" class="fill-height">
														<v-col cols="4">
															<span
																:class="!flightInfoDataTypeActual ? 'disabled' : ''"
															>
																{{ $t('forms.content.tools.flightInfo.actual') }}
															</span>
														</v-col>
														<v-col cols="4">
															<VSwitchWithValidation
																ref="flightInfoDataTypeUseRef"
																v-model="flightInfoDataTypeUse"
																vid="flightInfoDataTypeUse"
																:validation="validation"
															/>
														</v-col>
														<v-col cols="4" class="align-center justify-center">
															<span
																:class="!flightInfoDataTypeFiltered ? 'disabled' : ''"
															>
																{{ $t('forms.content.tools.flightInfo.filtered') }}
															</span>
														</v-col>
													</v-row>
												</v-col>
											</v-row>
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
										:title="$t('forms.content.tools.flightInfo.style.title')"
										value="foo"
									>
										<v-expansion-panel-text>
											<v-row dense>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleAltitudeFColor"
														vid="flightInfoStyleAltitudeFColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.altitude.filtered')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleAltitudeColor"
														vid="flightInfoStyleAltitudeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.altitude.title')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleVelocityFColor"
														vid="flightInfoStyleVelocityFColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.velocity.filtered')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleVelocityColor"
														vid="flightInfoStyleVelocityColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.velocity.title')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleEventApogeeColor"
														vid="flightInfoStyleEventApogeeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.apogee.title')"
													/>
													<VColorWithValidation
														v-model="flightInfoStyleEventApogeeBorderColor"
														vid="flightInfoStyleEventApogeeBorderColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.apogee.border')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleEventDrogueColor"
														vid="flightInfoStyleEventDrogueColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.drogue.title')"
													/>
													<VColorWithValidation
														v-model="flightInfoStyleEventDrogueBorderColor"
														vid="flightInfoStyleEventDrogueBorderColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.drogue.border')"
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
						<v-menu
							v-if="!buttons.export.disabled"
						>
							<template v-slot:activator="{ props }">
								<v-btn
									append-icon="mdi-menu-down"
									class="ml-2"
									color="primary"
									v-bind="props"
								>
									{{ $t('buttons.export') }}
								</v-btn>
							</template>

							<v-list>
								<v-list-item
									@click="flightInfoExportImage"
								>
									<v-list-item-title>
										{{ $t('forms.content.tools.flightInfo.export.image') }}
									</v-list-item-title>
								</v-list-item>
								<v-list-item
									@click="flightInfoExportJson"
								>
									<v-list-item-title>{{ $t('forms.content.tools.flightInfo.export.json') }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</template>
					<template v-slot:after>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="flightInfoInputRef"
								vid="flightInfoInput"
								v-model="flightInfoInput"
								:validation="validation"
								:label="$t('forms.content.tools.flightInfo.csv')"
							/>
						</div>
					</template>
				</VFormControl>
			</v-col>
			<v-col cols="9" class="pl-4">
				<div>
					<table style="width: 100%;">
						<tr>
							<td style="white-space: nowrap;">
								<v-chip
									color="secondary"
								>
									{{ $t('forms.content.tools.flightInfo.resolution')}}: {{ resolution }}
								</v-chip>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(720)"
								>
									720
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(1080)"
								>
									1080
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(1440)"
								>
									1440
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(1920)"
								>
									1920
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(2048)"
								>
									2048
								</v-btn>
							</td>
							<td style="width: 100%;">
								<table style="width: 100%;">
									<tr>
										<td style="width: 100%;">
											<v-slider
												v-model="resolution" 
												:min="720" 
												:max="2048"  
												step="1"
												class="ml-4"
												style="width: 100%;"
												dense 
											/>
										</td>
										<td style="white-space: nowrap;">
											<v-btn
												class="ml-8 ml-4"
        										size="small"
												color="primary" 
												@click="clickResolution(this.resolution)"
											>
												{{ $t('forms.content.tools.flightInfo.set') }}
											</v-btn>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
				<table
					id="flight-info"
					:style="'color: black; background-color: white; width: ' + resolution + 'px;'"
				>
					<tr><td colspan="2">
						<v-progress-linear
							v-if="downloadProgress"
							indeterminate
							height="10"
							color="primary"
						/>
					</td></tr>
					<tr>
						<td>
							<flightInfoChart
								ref="flightInfoChartRef"
								:chart-data="flightInfoChartData"
							/>
						</td>
						<td >
							<flightInfoData
								id="flight-info"
								ref="flightInfoRef"
								v-model="flightInfo"
							/>
						</td>
					</tr>
				</table>
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
import { required, requiredUnless } from '@vuelidate/validators';

import Papa from 'papaparse';
import html2canvas from 'html2canvas';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import VuetifyUtility from '@/library_vue_vuetify/utility/index';

import flightInfoData from '@/components/content/tools/flightInfo/FlightInfoData';
import flightInfoChart from '@/components/content/tools/flightInfo/charts/FlightInfo';

import { useToolsBaseComponent } from '@/components/content/tools/toolBase';

import VCheckboxWithValidation from '@/library_vue_vuetify/components/form/VCheckboxWithValidation';
import VColorWithValidation from '@/library_vue_vuetify/components/form/VColorWithValidation';
import VDateTimeField from '@/library_vue_vuetify/components/form/VDateTimeFieldTemp';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@/library_vue_vuetify/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@/library_vue_vuetify/components/form/VTextAreaWithValidation';
import VTextField from '@/library_vue_vuetify/components/form//VTextField';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'FlightInfo',
	// extends: toolBase,
	components: {
		flightInfoData,
		flightInfoChart,
		VCheckboxWithValidation,
		VColorWithValidation,
		VDateTimeField,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextField,
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
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			formatNumber,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setErrorMessage,
			setErrorTimer,
			setNotify
		} = useToolsBaseComponent(
			props, 
			context
		);

		const serviceDownload = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
		const serviceFlightInfo = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR);
		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

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
		const flightInfo = ref(null);
		const flightInfoChartData = ref(null);
		const flightInfoDataTypeActual = ref(true);
		const flightInfoDataTypeError = ref(false);
		const flightInfoDataTypeFiltered = ref(true);
		const flightInfoDataTypeUse = ref(true);
		const flightInfoDataTypeUseDisabled = ref(false);
		const flightInfoDate = ref(null);
		const flightInfoInput = ref(null);
		const flightInfoLocation = ref(null);
		const flightInfoMeasurementUnits = ref(null);
		const flightInfoMeasurementUnitsOptions = ref([]);
		const flightInfoProcessor = ref(null);
		const flightInfoProcessors = ref([]);
		const flightInfoStyleAltitudeColor = ref(null);
		const flightInfoStyleAltitudeFColor = ref(null);
		const flightInfoStyleEventApogeeColor = ref(null);
		const flightInfoStyleEventApogeeBorderColor = ref(null);
		const flightInfoStyleEventDrogueColor = ref(null);
		const flightInfoStyleEventDrogueBorderColor = ref(null);
		const flightInfoStyleEventMainColor = ref(null);
		const flightInfoStyleEventMainBorderColor = ref(null);
		const flightInfoStyleVelocityColor = ref(null);
		const flightInfoStyleVelocityFColor = ref(null);
		const flightInfoTitle = ref(null);
		const processing = ref(false);
		const resolution = ref(Constants.FlightInfo.Resolution);
		const styles = ref(false);

		watch(() => flightInfoDataTypeActual.value,
			(value) => {
				checkFlightInfoDataTypeUse();
			}
		);
		watch(() => flightInfoDataTypeFiltered.value,
			(value) => {
				checkFlightInfoDataTypeUse();
			}
		);
		watch(() => flightInfoProcessor.value,
			(value) => {
				if (!value)
					return;

				flightInfoStyleLoad(correlationId(), value);
			}
		);

		onMounted(async () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);

			flightInfoStyleReset(correlationIdI, false);

			flightInfoDate.value = serviceStore.getters.getFlightDate();
			flightInfoLocation.value = serviceStore.getters.getFlightLocation();
			flightInfoMeasurementUnits.value = serviceStore.getters.getFlightMeasurementUnits();
			flightInfoTitle.value = serviceStore.getters.getFlightTitle();

			flightInfoDataTypeUse.value = serviceStore.getters.getFlightInfoDataTypeUse();
			flightInfoProcessor.value = serviceStore.getters.getFlightInfoProcessor();

			flightInfoProcessors.value = VuetifyUtility.selectOptions(serviceFlightInfo.serviceProcessors, GlobalUtility.$trans.t, 'forms.content.tools.flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
			flightInfoMeasurementUnitsOptions.value = VuetifyUtility.selectOptions(AppUtility.measurementUnitsOptions(), GlobalUtility.$trans.t, 'measurementUnits');

			resolution.value = serviceStore.getters.getFlightInfoResolution(correlationIdI) ?? Constants.FlightInfo.Resolution;
		});
		
		const checkFlightInfoDataTypeUse = () => {
			flightInfoDataTypeUseDisabled.value = true;
			if (flightInfoDataTypeActual.value  && flightInfoDataTypeFiltered.value )
				flightInfoDataTypeUseDisabled.value = false;
			else if (flightInfoDataTypeActual.value )
				flightInfoDataTypeUse.value = false;
			else if (flightInfoDataTypeFiltered.value )
				flightInfoDataTypeUse.value = true;
		};
		const clickResolution = (resolution2) => {
			resolution.value = resolution2;

			const correlationIdI = correlationId();
			serviceStore.dispatcher.setFlightInfoResolution(correlationIdI, resolution2);

			if (processing.value )
				flightInfoProcess(correlationIdI);
		};
		const flightInfoStyleLoad = (correlationId) => {
			if (String.isNullOrEmpty(flightInfoProcessor.value ))
				return;

			const style = serviceStore.getters.getFlightInfoStyle(flightInfoProcessor.value);
			if (!style)
				return;

			flightInfoStyleAltitudeColor.value = style.altitude.color;
			flightInfoStyleAltitudeFColor .value = style.altitudeF.color;
			flightInfoStyleEventApogeeColor.value = style.event.apogee.color;
			flightInfoStyleEventApogeeBorderColor.value = style.event.apogeeBorder.color;
			flightInfoStyleEventDrogueColor .value = style.event.drogue.color;
			flightInfoStyleEventDrogueBorderColor.value = style.event.drogueBorder.color;
			flightInfoStyleEventMainColor.value = style.event.main.color;
			flightInfoStyleEventMainBorderColor.value = style.event.mainBorder.color;
			flightInfoStyleVelocityColor.value = style.velocity.color;
			flightInfoStyleVelocityFColor.value = style.velocityF.color;
		};
		const flightInfoStyleReset = (correlationId, notify) => {
			flightInfoStyleAltitudeColor.value = serviceFlightInfo.styleDefault.altitude.color;
			flightInfoStyleAltitudeFColor.value = serviceFlightInfo.styleDefault.altitudeF.color;
			flightInfoStyleEventApogeeColor.value = serviceFlightInfo.styleDefault.event.apogee.color;
			flightInfoStyleEventApogeeBorderColor.value = serviceFlightInfo.styleDefault.event.apogeeBorder.color;
			flightInfoStyleEventDrogueColor.value = serviceFlightInfo.styleDefault.event.drogue.color;
			flightInfoStyleEventDrogueBorderColor.value = serviceFlightInfo.styleDefault.event.drogueBorder.color;
			flightInfoStyleEventMainColor.value = serviceFlightInfo.styleDefault.event.main.color;
			flightInfoStyleEventMainBorderColor.value = serviceFlightInfo.styleDefault.event.mainBorder.color;
			flightInfoStyleVelocityColor.value = serviceFlightInfo.styleDefault.velocity.color;
			flightInfoStyleVelocityFColor.value = serviceFlightInfo.styleDefault.velocityF.color;

			if (notify)
				setNotify(correlationId(), 'messages.reset');
		};
		const flightInfoStyleSave = () => {
			const correlationIdI = correlationId();
			if (String.isNullOrEmpty(flightInfoProcessor.value))
				return;

			const style = {
				id: flightInfoProcessor.value,
				altitude: {
					color: flightInfoStyleAltitudeColor.value
				},
				altitudeF: {
					color: flightInfoStyleAltitudeFColor.value
				},
				event: {
					apogee: {
						color: flightInfoStyleEventApogeeColor.value
					},
					apogeeBorder: {
						color: flightInfoStyleEventApogeeBorderColor.value
					},
					drogue: {
						color: flightInfoStyleEventDrogueColor.value
					},
					drogueBorder: {
						color: flightInfoStyleEventDrogueBorderColor.value
					},
					main: {
						color: flightInfoStyleEventMainColor.value
					},
					mainBorder: {
						color: flightInfoStyleEventMainBorderColor.value
					}
				},
				velocity: {
					color: flightInfoStyleVelocityColor.value
				},
				velocityF: {
					color: flightInfoStyleVelocityFColor.value
				}
			};

			serviceStore.setFlightInfoStyle(correlationIdI, style);

			setNotify(correlationIdI, 'messages.saved');
		};
		const flightInfoExport = (correlationId) => {
			try {
				const el = document.getElementById('flight-info');
				getScreenshotOfElement(correlationId, el, (data) => {
					const name = flightInfoExportName('png');
					downloadProgress.value = true;

					serviceDownload.downloadUrl(correlationIdI, 'data:image/png;base64,' + data,
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
				// eslint-disable-next-line
				});
			}
			catch (err) {
				downloadProgress.value = false;
			}
		};
		const flightInfoExportDownload = (correlationId, output, extension) => {
			try {
				const name = flightInfoExportName(correlationId, extension);
				downloadProgress.value = true;

				serviceDownload.download(correlationId, output,
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
			}
		};
		const flightInfoExportImage = () => {
			const correlationIdI = correlationId();
			const output = serviceFlightInfo.processOutputJson(correlationIdI, flightInfo.value);
			flightInfoExportDownload(correlationIdI, output, 'json');
		};
		const flightInfoExportJson = () => {
			const correlationIdI = correlationId();
			const output = serviceFlightInfo.processOutputJson(correlationIdI, flightInfo.value);
			flightInfoExportDownload(correlationIdI, output, 'json');
		};
		const flightInfoExportName = (correlationId, extension) => {
			extension = !String.isNullOrEmpty(extension) ? extension : 'png';

			const currentDate = flightInfoDate.value ? new Date(flightInfoDate.value) : new Date();
			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1;
			const year = currentDate.getFullYear();

			return 'flight-input-' + day + '-' + month + '-' + year + '.' + extension;
		};
		const flightInfoExportText = () => {
			const correlationIdI = correlationId();
			const output = serviceFlightInfo.processOutputText(correlationIdI, flightInfo.value);
			flightInfoExportDownload(correlationIdI, output, 'txt');
		};
		const flightInfoProcess = (correlationId) => {
			reset(correlationId);
			setNotify(correlationId, 'messages.processing');

			processing.value = true;

			setTimeout(() => {
				try {
					if (String.isNullOrEmpty(flightInfoInput.value)) {
						setError(GlobalUtility.$trans.t('errors.process.noInput'));
						processing.value = false;
						return;
					}

					const data = Papa.parse(flightInfoInput.value.trim());
					if (data.errors && data.errors.length > 0) {
						setError(GlobalUtility.$trans.t('errors.process.unableToConvert'));
						processing.value = false;
						return;
					}

					const flightInfoDataTypes = {
						actual: flightInfoDataTypeActual.value,
						filtered: flightInfoDataTypeFiltered.value,
						use: flightInfoDataTypeUse.value
					};

					const flightInfoResults = serviceFlightInfo.process(correlationId, data, flightInfoProcessor.value, flightInfoMeasurementUnits.value, flightInfoDataTypes);
					AppUtility.debug2('flightInfoResults', flightInfoResults);
					if (flightInfoResults.errors && data.errors.length > 0) {
						const errors = flightInfoResults.errors.map(e => GlobalUtility.$trans.t(e) + '<br/>');
						setError(errors);
						processing.value = false;
						return;
					}

					flightInfoResults.info.title = GlobalUtility.$trans.t('charts.flightInfo.title');
					if (!String.isNullOrEmpty(flightInfoTitle.value && flightInfoTitle.value))
						flightInfoResults.info.title = flightInfoTitle.value;
					if (!String.isNullOrEmpty(flightInfoDate.value))
						flightInfoResults.info.date = flightInfoDate.value;
					if (!String.isNullOrEmpty(flightInfoLocation.value))
						flightInfoResults.info.location = flightInfoLocation.value;
					if (!String.isNullOrEmpty(flightInfoMeasurementUnits.value))
						flightInfoResults.info.measurementUnits = flightInfoMeasurementUnits.value;

					flightInfoResults.info.style.altitude = flightInfoStyleAltitudeColor.value;
					flightInfoResults.info.style.altitudeF = flightInfoStyleAltitudeFColor.value;
					flightInfoResults.info.style.event.apogee = flightInfoStyleEventApogeeColor.value;
					flightInfoResults.info.style.event.apogeeBorder = flightInfoStyleEventApogeeBorderColor.value;
					flightInfoResults.info.style.event.drogue = flightInfoStyleEventDrogueColor.value;
					flightInfoResults.info.style.event.drogueBorder = flightInfoStyleEventDrogueBorderColor.value;
					flightInfoResults.info.style.event.main = flightInfoStyleEventMainColor.value;
					flightInfoResults.info.style.event.mainBorder = flightInfoStyleEventMainBorderColor.value;
					flightInfoResults.info.style.velocity = flightInfoStyleVelocityColor.value;
					flightInfoResults.info.style.velocityF = flightInfoStyleVelocityFColor.value;

					flightInfoChartData.value = flightInfoResults.info;
					flightInfo.value = flightInfoResults.info;

					serviceStore.dispatcher.setFlightDate(correlationId, flightInfoDate.value);
					serviceStore.dispatcher.setFlightLocation(correlationId, flightInfoLocation.value);
					serviceStore.dispatcher.setFlightMeasurementUnits(correlationId, flightInfoMeasurementUnits.value);
					serviceStore.dispatcher.setFlightTitle(correlationId, flightInfoTitle.value);

					serviceStore.dispatcher.setFlightInfoDataTypeUse(correlationId, flightInfoDataTypeUse.value);
					serviceStore.dispatcher.setFlightInfoProcessor(correlationId, flightInfoProcessor.value);

					flightInfoMeasurementUnits.value = serviceStore.getters.getFlightMeasurementUnits();
					flightInfoTitle.value = serviceStore.getters.getFlightTitle();

					flightInfoDataTypeUse.value = serviceStore.getters.getFlightInfoDataTypeUse();
					flightInfoProcessor.value = serviceStore.getters.getFlightInfoProcessor();

					setNotify(correlationId, 'messages.processed');

					nextTick(() =>
						document.getElementById('top').scrollIntoView({behavior: 'smooth'})
					);

					buttons.value.export.disabled = false;
					processing.value = false;
				}
				catch (err) {
					processing.value = false;
				}
			}, 50);
		};
		const getScreenshotOfElement = (correlationId, element, callback, posX, posY, width, height) => {
			html2canvas(element).then(canvas => {
				// document.body.appendChild(canvas);
				posX = posX ?? 0;
				posY = posY ?? 0;
				width = width ?? canvas.width;
				height = height ?? canvas.height;
				const imageData = canvas.getContext('2d').getImageData(posX, posY, width, height).data;
				const outputCanvas = document.createElement('canvas');
				const outputContext = outputCanvas.getContext('2d');
				outputCanvas.width = width;
				outputCanvas.height = height;

				const idata = outputContext.createImageData(width, height);
				idata.data.set(imageData);
				outputContext.putImageData(idata, 0, 0);
				callback(outputCanvas.toDataURL().replace('data:image/png;base64,', ''));
			});
		};
		// const onChangeDate = (value) => {
		// 	serviceStore.dispatcher.setFlightDate(correlationId(), value);
		// };
		// const onChangeLocation = (value) => {
		// 	serviceStore.dispatcher.setFlightLocation(correlationId(), value);
		// };
		// const onChangeTitle = (value) => {
		// 	serviceStore.dispatcher.setFlightTitle(correlationId(), value);
		// };
		const reset = (correlationId) => {
			buttons.value.export.disabled = true;
			setErrorMessage(null);
			setErrorTimer(null);
			flightInfo.value = null;
			flightInfoChartData.value = null;
			processing.value = false;
		};
		const resetInput = () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);
			flightInfoDataTypeActual.value = true;
			flightInfoDataTypeFiltered.value = true;
			flightInfoDataTypeUse.value = true;
			flightInfoDataTypeUseDisabled.value = false;
			flightInfoDate.value = null;
			flightInfoInput.value = null;
			flightInfoLocation.value = null;
			flightInfoProcessor.value = null;
			flightInfoTitle.value = null;
			buttons.value.process.disabled = true;

			setNotify(correlationIdI, 'messages.reset');
		};

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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			buttons,
			downloadProgress,
			expanded,
			flightInfo,
			flightInfoChartData,
			flightInfoDataTypeActual,
			flightInfoDataTypeError,
			flightInfoDataTypeFiltered,
			flightInfoDataTypeUse,
			flightInfoDataTypeUseDisabled,
			flightInfoDate,
			flightInfoInput,
			flightInfoLocation,
			flightInfoMeasurementUnits,
			flightInfoMeasurementUnitsOptions,
			flightInfoProcessor,
			flightInfoProcessors,
			flightInfoStyleAltitudeColor,
			flightInfoStyleAltitudeFColor,
			flightInfoStyleEventApogeeColor,
			flightInfoStyleEventApogeeBorderColor,
			flightInfoStyleEventDrogueColor,
			flightInfoStyleEventDrogueBorderColor,
			flightInfoStyleEventMainColor,
			flightInfoStyleEventMainBorderColor,
			flightInfoStyleVelocityColor,
			flightInfoStyleVelocityFColor,
			flightInfoTitle,
			processing,
			resolution,
			styles,
			serviceDownload,
			serviceFlightInfo,
			serviceStore,
			checkFlightInfoDataTypeUse,
			clickResolution,
			flightInfoStyleLoad,
			flightInfoStyleReset,
			flightInfoStyleSave,
			flightInfoExportDownload,
			flightInfoExportImage,
			flightInfoExportJson,
			flightInfoExportName,
			flightInfoExportText,
			flightInfoExport,
			flightInfoProcess,
			getScreenshotOfElement,
			reset,
			resetInput,
			scope: 'FlightInfo',
			validation: useVuelidate({ $scope: 'FlightInfo' })
		};
	},
	validations () {
		return {
			flightInfoTitle: { $autoDirty: true },
			flightInfoLocation: { $autoDirty: true },
			flightInfoDate: { $autoDirty: true },
			flightInfoMeasurementUnits: { required, $autoDirty: true },
			flightInfoProcessor: { required, $autoDirty: true },
			flightInfoInput: { required, $autoDirty: true },
			flightInfoDataTypeActual: { requiredIfFiltered: requiredUnless(this.flightInfoDataTypeFiltered), $autoDirty: true },
			flightInfoDataTypeFiltered: { requiredIfActual: requiredUnless(this.flightInfoDataTypeActual), $autoDirty: true },
			flightInfoDataTypeUse: { required, $autoDirty: true }
		};
	}
	// data: () => ({
	// 	buttons: {
	// 		export: {
	// 			disabled: true
	// 		},
	// 		process: {
	// 			disabled: true
	// 		}
	// 	},
	// 	expanded: false,
	// 	flightInfo: null,
	// 	flightInfoChartData: null,
	// 	flightInfoDataTypeActual: true,
	// 	flightInfoDataTypeError: false,
	// 	flightInfoDataTypeFiltered: true,
	// 	flightInfoDataTypeUse: true,
	// 	flightInfoDataTypeUseDisabled: false,
	// 	flightInfoDate: null,
	// 	flightInfoInput: null,
	// 	flightInfoLocation: null,
	// 	flightInfoMeasurementUnits: null,
	// 	flightInfoMeasurementUnitsOptions: [],
	// 	flightInfoProcessor: null,
	// 	flightInfoProcessors: [],
	// 	flightInfoStyleAltitudeColor: null,
	// 	flightInfoStyleAltitudeFColor: null,
	// 	flightInfoStyleEventApogeeColor: null,
	// 	flightInfoStyleEventApogeeBorderColor: null,
	// 	flightInfoStyleEventDrogueColor: null,
	// 	flightInfoStyleEventDrogueBorderColor: null,
	// 	flightInfoStyleEventMainColor: null,
	// 	flightInfoStyleEventMainBorderColor: null,
	// 	flightInfoStyleVelocityColor: null,
	// 	flightInfoStyleVelocityFColor: null,
	// 	flightInfoTitle: null,
	// 	processing: false,
	// 	resolution: Constants.FlightInfo.Resolution,
	// 	resolution2: Constants.FlightInfo.Resolution,
	// 	serviceDownload: null,
	// 	serviceFlightInfo: null,
	// 	serviceStore: null
	// }),
	// watch: {
	// 	flightInfoDataTypeActual: function (value) {
	// 		this.checkFlightInfoDataTypeUse();
	// 	},
	// 	flightInfoDataTypeFiltered: function (value) {
	// 		this.checkFlightInfoDataTypeUse();
	// 	},
	// 	flightInfoProcessor: function (value) {
	// 		if (!value)
	// 			return;

	// 		this.flightInfoStyleLoad(value);
	// 	}
	// },
	// created() {
	// 	this.serviceDownload = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
	// 	this.serviceFlightInfo = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR);
	// 	this.serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

	// 	this.flightInfoStyleReset(false);

	// 	this.resolution = Constants.FlightInfo.Resolution;
	// 	this.resolution2 = this.resolution;
	// },
	// mounted() {
	// 	this.reset();
	// 	this.flightInfoStyleReset(false);

	// 	this.flightInfoDate = this.serviceStore.getters.getFlightDate();
	// 	this.flightInfoLocation = this.serviceStore.getters.getFlightLocation();
	// 	this.flightInfoTitle = this.serviceStore.getters.getFlightTitle();

	// 	this.flightInfoProcessors = VuetifyUtility.selectOptions(this.serviceFlightInfo.serviceProcessors, GlobalUtility.$trans.t, 'flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
	// 	this.flightInfoMeasurementUnitsOptions = VuetifyUtility.selectOptions(AppUtility.measurementUnitsOptions(), GlobalUtility.$trans.t, 'measurementUnits');
	// 	this.flightInfoMeasurementUnits = this.serviceStore.state.measurementUnits;

	// 	this.resolution = this.serviceStore.state.flightInfoResolution ?? Constants.FlightInfo.Resolution;
	// 	this.resolution2 = this.resolution;
	// },
	// methods: {
	// 	checkErrors() {
	// 		this.$refs.flightInfoInput.validate();
	// 		this.$refs.flightInfoMeasurementUnits.validate();
	// 		this.$refs.flightInfoProcessor.validate();

	// 		this.flightInfoDataTypeError = !(this.flightInfoDataTypeActual || this.flightInfoDataTypeFiltered);

	// 		this.buttons.process.disabled = this.hasError();
	// 	},
	// 	clickResolution(resolution) {
	// 		this.resolution = resolution;

	// 		this.serviceStore.dispatcher.setFlightInfoResolution(this.correlationId(), resolution);

	// 		if (this.processing)
	// 			this.flightInfoProcess();
	// 	},
	// 	flightInfoStyleLoad() {
	// 		if (String.isNullOrEmpty(this.flightInfoProcessor))
	// 			return;

	// 		const style = this.serviceStore.getters.getFlightInfoStyle(this.flightInfoProcessor);
	// 		if (!style)
	// 			return;

	// 		this.flightInfoStyleAltitudeColor = style.altitude.color;
	// 		this.flightInfoStyleAltitudeFColor = style.altitudeF.color;
	// 		this.flightInfoStyleEventApogeeColor = style.event.apogee.color;
	// 		this.flightInfoStyleEventApogeeBorderColor = style.event.apogeeBorder.color;
	// 		this.flightInfoStyleEventDrogueColor = style.event.drogue.color;
	// 		this.flightInfoStyleEventDrogueBorderColor = style.event.drogueBorder.color;
	// 		this.flightInfoStyleEventMainColor = style.event.main.color;
	// 		this.flightInfoStyleEventMainBorderColor = style.event.mainBorder.color;
	// 		this.flightInfoStyleVelocityColor = style.velocity.color;
	// 		this.flightInfoStyleVelocityFColor = style.velocityF.color;
	// 	},
	// 	flightInfoStyleReset(notify) {
	// 		this.flightInfoStyleAltitudeColor = this.serviceFlightInfo.styleDefault.altitude.color;
	// 		this.flightInfoStyleAltitudeFColor = this.serviceFlightInfo.styleDefault.altitudeF.color;
	// 		this.flightInfoStyleEventApogeeColor = this.serviceFlightInfo.styleDefault.event.apogee.color;
	// 		this.flightInfoStyleEventApogeeBorderColor = this.serviceFlightInfo.styleDefault.event.apogeeBorder.color;
	// 		this.flightInfoStyleEventDrogueColor = this.serviceFlightInfo.styleDefault.event.drogue.color;
	// 		this.flightInfoStyleEventDrogueBorderColor = this.serviceFlightInfo.styleDefault.event.drogueBorder.color;
	// 		this.flightInfoStyleEventMainColor = this.serviceFlightInfo.styleDefault.event.main.color;
	// 		this.flightInfoStyleEventMainBorderColor = this.serviceFlightInfo.styleDefault.event.mainBorder.color;
	// 		this.flightInfoStyleVelocityColor = this.serviceFlightInfo.styleDefault.velocity.color;
	// 		this.flightInfoStyleVelocityFColor = this.serviceFlightInfo.styleDefault.velocityF.color;

	// 		notify = (notify !== null && notify !== undefined) ? notify : true;
	// 		if (notify)
	// 			this.notify('messages.reset');
	// 	},
	// 	flightInfoStyleSave() {
	// 		if (String.isNullOrEmpty(this.flightInfoProcessor))
	// 			return;

	// 		const style = {
	// 			id: this.flightInfoProcessor,
	// 			altitude: {
	// 				color: this.flightInfoStyleAltitudeColor
	// 			},
	// 			altitudeF: {
	// 				color: this.flightInfoStyleAltitudeFColor
	// 			},
	// 			event: {
	// 				apogee: {
	// 					color: this.flightInfoStyleEventApogeeColor
	// 				},
	// 				apogeeBorder: {
	// 					color: this.flightInfoStyleEventApogeeBorderColor
	// 				},
	// 				drogue: {
	// 					color: this.flightInfoStyleEventDrogueColor
	// 				},
	// 				drogueBorder: {
	// 					color: this.flightInfoStyleEventDrogueBorderColor
	// 				},
	// 				main: {
	// 					color: this.flightInfoStyleEventMainColor
	// 				},
	// 				mainBorder: {
	// 					color: this.flightInfoStyleEventMainBorderColor
	// 				}
	// 			},
	// 			velocity: {
	// 				color: this.flightInfoStyleVelocityColor
	// 			},
	// 			velocityF: {
	// 				color: this.flightInfoStyleVelocityFColor
	// 			}
	// 		};

	// 		this.serviceStore.setFlightInfoStyle(this.correlationId(), style);

	// 		this.notify('messages.saved');
	// 	},
	// 	checkFlightInfoDataTypeUse() {
	// 		this.flightInfoDataTypeUseDisabled = true;
	// 		if (this.flightInfoDataTypeActual && this.flightInfoDataTypeFiltered)
	// 			this.flightInfoDataTypeUseDisabled = false;
	// 		else if (this.flightInfoDataTypeActual)
	// 			this.flightInfoDataTypeUse = false;
	// 		else if (this.flightInfoDataTypeFiltered)
	// 			this.flightInfoDataTypeUse = true;
	// 	},
	// 	flightInfoExportName(extension) {
	// 		extension = !String.isNullOrEmpty(extension) ? extension : 'png';

	// 		const currentDate = this.flightInfoDate ? new Date(this.flightInfoDate) : new Date();
	// 		const day = currentDate.getDate();
	// 		const month = currentDate.getMonth() + 1;
	// 		const year = currentDate.getFullYear();

	// 		return 'flight-input-' + day + '-' + month + '-' + year + '.' + extension;
	// 	},
	// 	flightInfoExportDownload(output, extension) {
	// 		const barRef = this.$refs.bar;
	// 		try {
	// 			const name = this.flightInfoExportName(extension);
	// 			barRef.start();

	// 			this.serviceDownload.download(this.correlationId(), output,
	// 				name,
	// 				() => {
	// 					AppUtility.debug2('download', 'completed');
	// 					barRef.stop();
	// 				},
	// 				() => {
	// 					AppUtility.debug2('download', 'cancelled');
	// 					barRef.stop();
	// 				},
	// 				(arg) => {
	// 					AppUtility.debug2('download', 'progress');
	// 					AppUtility.debug2(arg);
	// 				}
	// 			);
	// 		}
	// 		catch (err) {
	// 			barRef.stop();
	// 		}
	// 	},
	// 	flightInfoExportJson() {
	// 		const output = this.serviceFlightInfo.processOutputJson(this.flightInfo);
	// 		this.flightInfoExportDownload(output, 'json');
	// 	},
	// 	flightInfoExportText() {
	// 		const output = this.serviceFlightInfo.processOutputText(this.flightInfo);
	// 		this.flightInfoExportDownload(output, 'txt');
	// 	},
	// 	flightInfoExport() {
	// 		const barRef = this.$refs.bar;
	// 		try {
	// 			const el = document.getElementById('flight-info');
	// 			this.getScreenshotOfElement(el, ((data) => {
	// 				const name = this.flightInfoExportName('png');
	// 				barRef.start();

	// 				this.serviceDownload.downloadUrl(this.correlationId(), 'data:image/png;base64,' + data,
	// 					name,
	// 					() => {
	// 						AppUtility.debug2('download', 'completed');
	// 						barRef.stop();
	// 					},
	// 					() => {
	// 						AppUtility.debug2('download', 'cancelled');
	// 						barRef.stop();
	// 					},
	// 					(arg) => {
	// 						AppUtility.debug2('download', 'progress');
	// 						AppUtility.debug2(arg);
	// 					}
	// 				);
	// 			// eslint-disable-next-line
	// 			}).bind(this));
	// 		}
	// 		catch (err) {
	// 			barRef.stop();
	// 		}
	// 	},
	// 	flightInfoProcess() {
	// 		this.reset();

	// 		this.resolution2 = this.resolution;
	// 		this.processing = true;

	// 		setTimeout(() => {
	// 			this.$refs.flightInfoInput.validate();
	// 			this.$refs.flightInfoMeasurementUnits.validate();
	// 			this.$refs.flightInfoProcessor.validate();

	// 			if (this.hasError()) {
	// 				this.setError(GlobalUtility.$trans.t('errors.process.required'));
	// 				return;
	// 			}

	// 			if (String.isNullOrEmpty(this.flightInfoInput)) {
	// 				this.setError(GlobalUtility.$trans.t('errors.process.noInput'));
	// 				return;
	// 			}

	// 			const data = Papa.parse(this.flightInfoInput.trim());
	// 			if (data.errors && data.errors.length > 0) {
	// 				this.setError(GlobalUtility.$trans.t('errors.process.unableToConvert'));
	// 				return;
	// 			}

	// 			const flightInfoDataTypes = {
	// 				actual: this.flightInfoDataTypeActual,
	// 				filtered: this.flightInfoDataTypeFiltered,
	// 				use: this.flightInfoDataTypeUse
	// 			};

	// 			const flightInfoResults = this.serviceFlightInfo.process(data, this.flightInfoProcessor, this.flightInfoMeasurementUnits, flightInfoDataTypes);
	// 			AppUtility.debug2('flightInfoResults', flightInfoResults);
	// 			if (flightInfoResults.errors && data.errors.length > 0) {
	// 				const errors = flightInfoResults.errors.map(e => GlobalUtility.$trans.t(e) + '<br/>');
	// 				this.setError(errors);
	// 				return;
	// 			}

	// 			flightInfoResults.info.title = GlobalUtility.$trans.t('charts.flightInfo.title');
	// 			if (!String.isNullOrEmpty(this.flightInfoTitle && this.flightInfoTitle))
	// 				flightInfoResults.info.title = this.flightInfoTitle;
	// 			if (!String.isNullOrEmpty(this.flightInfoDate))
	// 				flightInfoResults.info.date = this.flightInfoDate;
	// 			if (!String.isNullOrEmpty(this.flightInfoLocation))
	// 				flightInfoResults.info.location = this.flightInfoLocation;
	// 			if (!String.isNullOrEmpty(this.flightInfoMeasurementUnit))
	// 				flightInfoResults.info.measurementUnits = this.flightInfoMeasurementUnits;

	// 			flightInfoResults.info.style.altitude = this.flightInfoStyleAltitudeColor;
	// 			flightInfoResults.info.style.altitudeF = this.flightInfoStyleAltitudeFColor;
	// 			flightInfoResults.info.style.event.apogee = this.flightInfoStyleEventApogeeColor;
	// 			flightInfoResults.info.style.event.apogeeBorder = this.flightInfoStyleEventApogeeBorderColor;
	// 			flightInfoResults.info.style.event.drogue = this.flightInfoStyleEventDrogueColor;
	// 			flightInfoResults.info.style.event.drogueBorder = this.flightInfoStyleEventDrogueBorderColor;
	// 			flightInfoResults.info.style.event.main = this.flightInfoStyleEventMainColor;
	// 			flightInfoResults.info.style.event.mainBorder = this.flightInfoStyleEventMainBorderColor;
	// 			flightInfoResults.info.style.velocity = this.flightInfoStyleVelocityColor;
	// 			flightInfoResults.info.style.velocityF = this.flightInfoStyleVelocityFColor;

	// 			this.flightInfoChartData = flightInfoResults.info;
	// 			this.flightInfo = flightInfoResults.info;

	// 			this.notify('messages.processed');

	// 			this.buttons.export.disabled = false;
	// 		}, 50);
	// 	},
	// 	hasError() {
	// 		return (
	// 			this.$refs.flightInfoInput.hasError ||
	// 			this.$refs.flightInfoProcessor.hasError ||
	// 			this.$refs.flightInfoMeasurementUnits.hasError ||
	// 			this.flightInfoDataTypeError
	// 		);
	// 	},
	// 	reset() {
	// 		this.buttons.export.disabled = true;
	// 		this.errorMessage = null;
	// 		if (this.errorTimer)
	// 			clearTimeout(this.errorTimer);
	// 		this.flightInfo = null;
	// 		this.flightInfoChartData = null;
	// 		this.processing = false;
	// 	},
	// 	onChangeDate(value) {
	// 		this.serviceStore.dispatcher.setFlightDate(this.correlationId(), value);
	// 	},
	// 	onChangeLocation(value) {
	// 		this.serviceStore.dispatcher.setFlightLocation(this.correlationId(), value);
	// 	},
	// 	onChangeTitle(value) {
	// 		this.serviceStore.dispatcher.setFlightTitle(this.correlationId(), value);
	// 	},
	// 	resetInput() {
	// 		this.reset();
	// 		this.flightInfoDataTypeActual = true;
	// 		this.flightInfoDataTypeFiltered = true;
	// 		this.flightInfoDataTypeUse = true;
	// 		this.flightInfoDataTypeUseDisabled = false;
	// 		this.flightInfoDate = null;
	// 		this.flightInfoInput = null;
	// 		this.flightInfoLocation = null;
	// 		this.flightInfoProcessor = null;
	// 		this.flightInfoTitle = null;
	// 		this.buttons.process.disabled = true;

	// 		this.notify('messages.reset');
	// 	},
	// 	getScreenshotOfElement(element, callback, posX, posY, width, height) {
	// 		html2canvas(element).then(canvas => {
	// 			// document.body.appendChild(canvas);
	// 			posX = posX ?? 0;
	// 			posY = posY ?? 0;
	// 			width = width ?? canvas.width;
	// 			height = height ?? canvas.height;
	// 			const imageData = canvas.getContext('2d').getImageData(posX, posY, width, height).data;
	// 			const outputCanvas = document.createElement('canvas');
	// 			const outputContext = outputCanvas.getContext('2d');
	// 			outputCanvas.width = width;
	// 			outputCanvas.height = height;

	// 			const idata = outputContext.createImageData(width, height);
	// 			idata.data.set(imageData);
	// 			outputContext.putImageData(idata, 0, 0);
	// 			callback(outputCanvas.toDataURL().replace('data:image/png;base64,', ''));
	// 		});
	// 	}
	// }
};
</script>
