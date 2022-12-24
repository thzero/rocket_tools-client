<template>
	<v-dialog
		v-model="display"
		:width="dialogWidth"
	>
		<template #activator="{ on }">
			<v-text-field
				v-bind="textFieldProps"
				:disabled="disabled"
				:loading="loading"
				:label="label"
				:value="formattedDateTime"
				readonly
				v-on="on"
			>
				<template #progress>
					<slot name="progress">
						<v-progress-linear
							color="primary"
							indeterminate
							absolute
							height="2"
						/>
					</slot>
				</template>
			</v-text-field>
		</template>

		<v-card>
			<v-card-text class="px-0 py-0">
				<v-tabs
					v-model="activeTab"
					fixed-tabs
				>
					<v-tab key="calendar">
						<slot name="dateIcon">
							<v-icon>event</v-icon>
						</slot>
					</v-tab>
					<v-tab
						key="timer"
						:disabled="dateSelected"
					>
						<slot name="timeIcon">
							<v-icon>access_time</v-icon>
						</slot>
					</v-tab>
					<v-tab-item key="calendar">
						<v-date-picker
							v-model="date"
							v-bind="datePickerProps"
							full-width
							@input="showTimePicker"
						/>
					</v-tab-item>
					<v-tab-item key="timer">
						<v-time-picker
							ref="timer"
							v-model="time"
							class="v-time-picker-custom"
							v-bind="timePickerProps"
							full-width
						/>
					</v-tab-item>
				</v-tabs>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<slot
					name="actions"
					:parent="this"
				>
					<v-btn
						color="primary lighten-1"
						text
						@click.native="clearHandler"
					>
						{{ clearText }}
					</v-btn>
					<v-btn
						color="primary lighten-1"
						text
						@click.native="cancelHandler"
					>
						{{ cancelText }}
					</v-btn>
					<v-btn
						color="green darken-1"
						text
						@click="okHandler"
					>
						{{ okText }}
					</v-btn>
				</slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
const DEFAULT_CANCEL_TEXT = 'CANCEL';
const DEFAULT_CLEAR_TEXT = 'CLEAR';
const DEFAULT_DATE = '';
const DEFAULT_DIALOG_WIDTH = 340;
const DEFAULT_OK_TEXT = 'OK';
const DEFAULT_TIME = '00:00:00';
const OUTPUT_TYPE_DATE = 'date';
const OUTPUT_TYPE_TIMESTAMP = 'timestamp';

export default {
	props: {
		// must be included in props
		value: {
			type: [Date, String, Number],
			default: null
		},
		cancelText: {
			type: String,
			default: DEFAULT_CANCEL_TEXT
		},
		change: {
			type: Function,
			default: () => {}
		},
		clearText: {
			type: String,
			default: DEFAULT_CLEAR_TEXT
		},
		dateFormat: {
			type: String,
			default: null
		},
		datePickerProps: {
			type: Object,
			default: null
		},
		disabled: {
			type: Boolean
		},
		dialogWidth: {
			type: Number,
			default: DEFAULT_DIALOG_WIDTH
		},
		label: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean
		},
		okText: {
			type: String,
			default: DEFAULT_OK_TEXT
		},
		outputType: {
			type: String,
			default: OUTPUT_TYPE_DATE,
			validator: (val) => [OUTPUT_TYPE_DATE, OUTPUT_TYPE_TIMESTAMP].includes(val)
		},
		textFieldProps: {
			type: Object,
			default: null
		},
		timeFormat: {
			type: String,
			default: null
		},
		timePickerProps: {
			type: Object,
			default: null
		},
		timePickerProps: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		display: false,
		activeTab: 0,
		date: DEFAULT_DATE,
		innerOutputType: OUTPUT_TYPE_DATE,
		time: DEFAULT_TIME
	}),
	computed: {
		dateSelected() {
			return !this.date;
		},
		dateTimeFormat() {
			return (this.dateFormat ? this.dateFormat : this.getDefaultDateFormat()) + ' ' + (this.timeFormat ? this.timeFormat : this.getDefaultTimeFormat());
		},
		formattedDateTime() {
			return this.getOutputDateTime(this.selectedDateTime);
		},
		selectedDateTime() {
			if (this.date && this.time) {
				let datetimeString = this.date + ' ' + this.time;
				if (this.time.length === 5)
					datetimeString += ':00';

				const date = this.convert(datetimeString);
				return date;
			}

			return null;
		}
	},
	watch: {
		outputType(newVal) {
			this.innerOutputType = newVal;
		},
		value(newVal) {
			this.init(newVal);
		}
	},
	created() {
		this.innerOutputType = this.outputType;
		this.init(this.value);
	},
	mounted() {
		this.init(this.value);
	},
	methods: {
		cancelHandler() {
			this.resetPicker();
		},
		clearHandler() {
			this.resetPicker();
			this.date = DEFAULT_DATE;
			this.time = DEFAULT_TIME;
			this.$emit('input', null);
		},
		// eslint-disable-next-line
		convert(value) {
			return '';
		},
		// eslint-disable-next-line
		formatDateTime(value) {
			return '';
		},
		getDefaultDateFormat() {
			return '';
		},
		getDefaultTimeFormat() {
			return '';
		},
		getDefaultTimeMillisecondsFormat() {
			return '';
		},
		getOutputDateTime(value) {
			return this.formatDateTime(value);
		},
		// eslint-disable-next-line
		getOutputTimestamp(value) {
			return 0;
		},
		// eslint-disable-next-line
		init(value) {
		},
		okHandler() {
			const output = this.innerOutputType == OUTPUT_TYPE_DATE ? this.getOutputDateTime(this.selectedDateTime) : this.getOutputTimestamp(this.selectedDateTime);
			this.$emit('input', output);
			if (this.change)
				this.change();
			this.resetPicker();
		},
		resetPicker() {
			this.display = false;
			this.activeTab = 0;
			if (this.$refs.timer)
				this.$refs.timer.selectingHour = true;
		},
		showTimePicker() {
			this.activeTab = 1;
		}
	}
};
</script>

<style scoped>
</style>
