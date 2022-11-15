<script>
import baseAuth from '@/library_vue_quasar/components/qBaseAuth';

export default {
	name: 'AppAuth',
	extends: baseAuth,
	setup(props) {
		return Object.assign(baseAuth.setup(props), {
		});
	}
};
</script>
