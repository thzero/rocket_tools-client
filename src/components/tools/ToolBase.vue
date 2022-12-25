<script>
import { computed, ref } from 'vue';

import base from '@/library_vue/components/base';

import GlobalUtility from '@thzero/library_client/utility/global';

export default {
	name: 'toolBase',
	extends: base,
	setup(props) {
		const errors = ref(null);
		const errorTimer = ref(null);

		const dateFormat = computed(() => {
			return GlobalUtility.dateFormat();
		});
		const dateFormatMask = computed(() => {
			return GlobalUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
		});

		return Object.assign(base.setup(props), {
			dateFormat,
			dateFormatMask,
			errors,
			errorTimer
		});
	}
};
</script>
