<script>
import vAuth from '@/library_vue_vuetify/components/VAuth';

export default {
	name: 'Auth',
	extends: vAuth,
	setup(props) {
		return Object.assign(vAuth.setup(props), {
		});
	}
};
</script>
