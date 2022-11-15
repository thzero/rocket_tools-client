<script>
import base from '@/library_vue/components/base';

export default {
	name: 'FlightBase',
	extends: base,
	setup(props) {
		return base.setup(props);
	},
	data: () => ({
	}),
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
		}
	}
};
</script>
