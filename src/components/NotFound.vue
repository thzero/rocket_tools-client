<script>
import QNotFound from '@/library_vue_quasar/components/QNotFound';

export default {
	name: 'NotFound',
	extends: QNotFound,
	setup(props) {
		return Object.assign(QNotFound.setup(props), {
		});
	}
};
</script>
