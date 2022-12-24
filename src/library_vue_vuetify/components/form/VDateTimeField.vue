
<script>
import dayjs from 'dayjs';

import VDateTimeFieldBase from './VDateTimeFieldBase';

export default {
	name: 'VtDatetimePicker',
	extends: VDateTimeFieldBase,
	methods: {
		convert(value) {
			return dayjs(value, this.getDefaultDateFormat() + ' ' + this.getDefaultTimeMillisecondsFormat()).valueOf();
		},
		formatDateTime(value) {
			return value ? dayjs(value).format(this.dateTimeFormat) : '';
		},
		getDefaultDateFormat() {
			return 'YYYY-MM-DD';
		},
		getDefaultTimeFormat() {
			return 'HH:mm';
		},
		getDefaultTimeMillisecondsFormat() {
			return 'HH:mm:ss';
		},
		// eslint-disable-next-line
		getOutputTimestamp(value) {
			return value ? dayjs(value).valueOf() : 0;
		},
		init(newVal) {
			if (!newVal)
				return;

			let initDateTime;
			if (this.datetime instanceof Date)
				initDateTime = dayjs(this.value);
			else if (typeof newVal === 'number' || newVal instanceof Number)
				initDateTime = dayjs(this.value);
			else if (typeof newVal === 'string' || newVal instanceof String)
				initDateTime = dayjs(this.value, this.dateTimeFormat);

			this.date = initDateTime.format(this.getDefaultDateFormat());
			this.time = initDateTime.format(this.getDefaultTimeFormat());
		}
	}
};
</script>

<style scoped>
</style>
