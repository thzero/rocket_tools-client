<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import QFormDialog from '@/library_vue_quasar/components/form/QFormDialog';
import QSelectWithValidation from '@/library_vue_quasar/components/form/QSelectWithValidation';
import QTextFieldWithValidation from '@/library_vue_quasar/components/form/QTextFieldWithValidation';

export default {
	name: 'BaseScenarioLookupDialog',
	components: {
		QFormDialog,
		QSelectWithValidation,
		QTextFieldWithValidation
	},
	extends: QFormDialog,
	props: {
	},
	data: () => ({
		lookups: []
	}),
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
		},
		initializeLookups(correlationId) {
		},
		initializeServices() {
			this.notImplementedError();
		},
		markup(correlationId, value) {
			if (!value)
				return null;
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, value));
		},
		async ok(id) {
			this.$emit('ok', id);
			return true;
		},
		// eslint-disable-next-line
		async resetDialog(correlationId) {
			await this.resetDialogI(correlationId);
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId) {
		}
	}
};
</script>

<style scoped>
</style>
