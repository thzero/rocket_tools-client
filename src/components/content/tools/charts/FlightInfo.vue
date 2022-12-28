<template>
	<div>
		<v-row
			dense
			v-if="date"
		>
			<v-col cols="6" class="text-h6 text-left pl-2">
				{{ title }}
			</v-col>
			<v-col cols="6" class="text-h6 text-right pr-2">
				{{ date }}
			</v-col>
		</v-row>
		<v-row
			dense
			v-if="!date"
		>
			<v-col cols="12" class="text-h6 text-left pl-2">
				{{ title }}
			</v-col>
		</v-row>
		<v-row
			dense
			v-if="location"
		>
			<v-col cols="12" class="text-center text-subtitle1 text-left pl-2">
				{{ location }}
			</v-col>
		</v-row>
	</div>
	<div style="min-height: 800px;">
		<canvas id="flight-info-chart-int"></canvas>
	</div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

import { Chart, registerables } from 'chart.js';

// import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

Chart.register(...registerables);

export default {
	name: 'FlightInfoChart',
	props: {
		chartData: Object,
		optionsOverride: Object
	},
	extends: base,
	setup(props) {
		const instance = getCurrentInstance();
		
		const chart = ref(null);
		const chartContext = ref(null);
		const date = ref('');
		const location = ref(null);
		const options = ref({
			maintainAspectRatio: false,
			responsive: true,
			lineTension: 1,
			scales: {
				xAxis: {
					// afterTickToLabelConversion: function (data) {
					// 	const xLabels = data.ticks;
					// 	xLabels.forEach(function (labels, i) {
					// 		if (i % 2 == 1)
					// 			xLabels[i] = '';
					// 	});
					// },
					ticks: {
						autoSkip: true,
						autoSkipPadding: 6,
						maxRotation: 0,
						minRotation: 0
					}
				}
			}
			// plugins: {
			// 	title: {
			// 		display: true,
			// 		font: {
			// 			size: 16
			// 		},
			// 		text: ''
			// 	}
			// }
		});
		const title = ref('');

		watch(() => props.chartData,
			(flightInfo) => {
				// AppUtility.debug2(flightInfo);
				if (chart.value) {
					chart.value.destroy();
					chart.value = null;
				}

				if (flightInfo) {
					title.value = flightInfo.title ?? GlobalUtility.$trans.t('charts.flightInfo.title');
					date.value = flightInfo.date ?? '';
					location.value = flightInfo.location ?? '';

					// this.options.plugins.title.text = title + '\nsdfsdf';

					const chartTemp = {
						type: 'line',
						data: {
							labels: flightInfo.time,
							datasets: []
						},
						options: options.value
					};

					if (flightInfo.dataTypes.filtered) {
						chartTemp.data.datasets.push({
							type: 'line',
							data: flightInfo.altitude.dataF,
							label: GlobalUtility.$trans.t('charts.flightInfo.altitude.titleF'),
							borderColor: flightInfo.style.altitudeF,
							fill: false,
							pointRadius: 0
						});
					}
					if (flightInfo.dataTypes.actual) {
						chartTemp.data.datasets.push({
							type: 'line',
							data: flightInfo.altitude.data,
							label: GlobalUtility.$trans.t('charts.flightInfo.altitude.title'),
							borderColor: flightInfo.style.altitude,
							fill: false,
							pointRadius: 0
						});
					}

					if (flightInfo.dataTypes.filtered) {
						chartTemp.data.datasets.push({
							type: 'line',
							data: flightInfo.velocity.dataF,
							label: GlobalUtility.$trans.t('charts.flightInfo.velocity.titleF'),
							borderColor: flightInfo.style.velocityF,
							fill: false,
							pointRadius: 0
						});
					}
					if (flightInfo.dataTypes.actual) {
						chartTemp.data.datasets.push({
							type: 'line',
							data: flightInfo.velocity.data,
							label: GlobalUtility.$trans.t('charts.flightInfo.velocity.title'),
							borderColor: flightInfo.style.velocity,
							fill: false,
							pointRadius: 0
						});
					}

					chartTemp.data.datasets.push({
						type: 'scatter',
						data: flightInfo.events.apogee.data,
						label: GlobalUtility.$trans.t('charts.flightInfo.events.apogee'),
						borderColor: flightInfo.style.event.apogeeBorder,
						backgroundColor: flightInfo.style.event.apogee + '7F',
						borderWidth: 2,
						pointRadius: 10
					});
					// chartTemp.data.datasets.push({
					// 	type: 'scatter',
					// 	data: flightInfo.events.noseOver.data,
					// 	label: GlobalUtility.$trans.t('charts.flightInfo.events.noseOver'),
					// 	borderColor: '#FFFF00',
					// 	pointRadius: 10
					// });
					chartTemp.data.datasets.push({
						type: 'scatter',
						data: flightInfo.events.drogue.data,
						label: GlobalUtility.$trans.t('charts.flightInfo.events.drogue'),
						borderColor: flightInfo.style.event.drogueBorder,
						backgroundColor: flightInfo.style.event.drogue + '7F',
						pointRadius: 10
					});
					chartTemp.data.datasets.push({
						type: 'scatter',
						data: flightInfo.events.main.data,
						label: GlobalUtility.$trans.t('charts.flightInfo.events.main'),
						borderColor: flightInfo.style.event.mainBorder,
						backgroundColor: flightInfo.style.event.main + '7F',
						pointRadius: 10
					});

					chart.value = new Chart(chartContext.value, chartTemp);
				}
			}
		);

		onMounted(async () => {
			// this.options.plugins.title.text = GlobalUtility.$trans.t('charts.flightInfo.title');
			chartContext.value = document.getElementById('flight-info-chart-int');
			if (props.chartData)
				chart.value = new Chart(chartContext.value, props.chartData);
		});

		return Object.assign(base.setup(props), {
			chart,
			chartContext,
			date,
			location,
			options,
			title
		});
	},
	// data: () => ({
	// 	date: '',
	// 	location: '',
	// 	options: {
	// 		maintainAspectRatio: false,
	// 		responsive: true,
	// 		lineTension: 1,
	// 		scales: {
	// 			xAxis: {
	// 				// afterTickToLabelConversion: function (data) {
	// 				// 	const xLabels = data.ticks;
	// 				// 	xLabels.forEach(function (labels, i) {
	// 				// 		if (i % 2 == 1)
	// 				// 			xLabels[i] = '';
	// 				// 	});
	// 				// },
	// 				ticks: {
	// 					autoSkip: true,
	// 					autoSkipPadding: 6,
	// 					maxRotation: 0,
	// 					minRotation: 0
	// 				}
	// 			}
	// 		}
	// 		// plugins: {
	// 		// 	title: {
	// 		// 		display: true,
	// 		// 		font: {
	// 		// 			size: 16
	// 		// 		},
	// 		// 		text: ''
	// 		// 	}
	// 		// }
	// 	},
	// 	title: ''
	// }),
	// watch: {
	// 	chartData: function (flightInfo) {
	// 		// AppUtility.debug2(flightInfo);
	// 		if (this.chart) {
	// 			this.chart.destroy();
	// 			this.chart = null;
	// 		}

	// 		if (flightInfo) {
	// 			this.title = flightInfo.title ?? GlobalUtility.$trans.t('charts.flightInfo.title');
	// 			this.date = flightInfo.date ?? '';
	// 			this.location = flightInfo.location ?? '';

	// 			// this.options.plugins.title.text = title + '\nsdfsdf';

	// 			const chart = {
	// 				type: 'line',
	// 				data: {
	// 					labels: flightInfo.time,
	// 					datasets: []
	// 				},
	// 				options: this.options
	// 			};

	// 			if (flightInfo.dataTypes.filtered) {
	// 				chart.data.datasets.push({
	// 					type: 'line',
	// 					data: flightInfo.altitude.dataF,
	// 					label: GlobalUtility.$trans.t('charts.flightInfo.altitude.titleF'),
	// 					borderColor: flightInfo.style.altitudeF,
	// 					fill: false,
	// 					pointRadius: 0
	// 				});
	// 			}
	// 			if (flightInfo.dataTypes.actual) {
	// 				chart.data.datasets.push({
	// 					type: 'line',
	// 					data: flightInfo.altitude.data,
	// 					label: GlobalUtility.$trans.t('charts.flightInfo.altitude.title'),
	// 					borderColor: flightInfo.style.altitude,
	// 					fill: false,
	// 					pointRadius: 0
	// 				});
	// 			}

	// 			if (flightInfo.dataTypes.filtered) {
	// 				chart.data.datasets.push({
	// 					type: 'line',
	// 					data: flightInfo.velocity.dataF,
	// 					label: GlobalUtility.$trans.t('charts.flightInfo.velocity.titleF'),
	// 					borderColor: flightInfo.style.velocityF,
	// 					fill: false,
	// 					pointRadius: 0
	// 				});
	// 			}
	// 			if (flightInfo.dataTypes.actual) {
	// 				chart.data.datasets.push({
	// 					type: 'line',
	// 					data: flightInfo.velocity.data,
	// 					label: GlobalUtility.$trans.t('charts.flightInfo.velocity.title'),
	// 					borderColor: flightInfo.style.velocity,
	// 					fill: false,
	// 					pointRadius: 0
	// 				});
	// 			}

	// 			chart.data.datasets.push({
	// 				type: 'scatter',
	// 				data: flightInfo.events.apogee.data,
	// 				label: GlobalUtility.$trans.t('charts.flightInfo.events.apogee'),
	// 				borderColor: flightInfo.style.event.apogeeBorder,
	// 				backgroundColor: flightInfo.style.event.apogee + '7F',
	// 				borderWidth: 2,
	// 				pointRadius: 10
	// 			});
	// 			// chart.data.datasets.push({
	// 			// 	type: 'scatter',
	// 			// 	data: flightInfo.events.noseOver.data,
	// 			// 	label: GlobalUtility.$trans.t('charts.flightInfo.events.noseOver'),
	// 			// 	borderColor: '#FFFF00',
	// 			// 	pointRadius: 10
	// 			// });
	// 			chart.data.datasets.push({
	// 				type: 'scatter',
	// 				data: flightInfo.events.drogue.data,
	// 				label: GlobalUtility.$trans.t('charts.flightInfo.events.drogue'),
	// 				borderColor: flightInfo.style.event.drogueBorder,
	// 				backgroundColor: flightInfo.style.event.drogue + '7F',
	// 				pointRadius: 10
	// 			});
	// 			chart.data.datasets.push({
	// 				type: 'scatter',
	// 				data: flightInfo.events.main.data,
	// 				label: GlobalUtility.$trans.t('charts.flightInfo.events.main'),
	// 				borderColor: flightInfo.style.event.mainBorder,
	// 				backgroundColor: flightInfo.style.event.main + '7F',
	// 				pointRadius: 10
	// 			});

	// 			this.chart = new Chart(this.ctx, chart);
	// 		}
	// 	}
	// },
	// mounted() {
	// 	// this.options.plugins.title.text = GlobalUtility.$trans.t('charts.flightInfo.title');
	// 	this.ctx = document.getElementById('flight-info-chart-int');
	// 	if (this.chartData)
	// 		this.chart = new Chart(this.ctx, this.chartData);
	// }
};
</script>
