<script>
import base from '@/library_vue/components/base';

import AppUtility from '@/utility/app';

export default {
	name: 'ToolBase',
	extends: base,
	setup(props) {
		return base.setup(props);
	},
	data: () => ({
		errorMessage: null,
		errorTimer: null
	}),
	computed: {
		dateFormat() {
			return AppUtility.dateFormat();
		},
		dateFormatMask() {
			return AppUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
		},
		errors() {
			return this.errorMessage;
		}
	},
	methods: { // TODO: to setup() https://javascript.plainenglish.io/differences-between-vue-2-and-vue-3-ee627e2c83a8
		notify(message) {
			if (String.isNullOrEmpty(message))
				return;

			this.$q.notify({
				color: 'green-4',
				textColor: 'white',
				message: this.$t(message)
				// message: GlobalUtility.$trans.t(message)
			});
		},
		setError(message) {
			if (this.buttons.export != null)
				this.buttons.export.disabled = true;
			this.errorMessage = message;

			this.errorTimer = setTimeout(() => {
				this.errorMessage = null;
				clearTimeout(this.errorTimer);
			},
			3000);
		}
	}
};
</script>
