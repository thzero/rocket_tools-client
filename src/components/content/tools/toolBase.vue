<script>
import { computed, ref } from 'vue';

import contentBase from '@/components/content/contentBase';

import GlobalUtility from '@thzero/library_client/utility/global';

export default {
	name: 'toolBase',
	extends: contentBase,
	setup(props) {
		const errors = ref(null);
		const errorTimer = ref(null);

		const dateFormat = computed(() => {
			return GlobalUtility.dateFormat();
		});
		const dateFormatMask = computed(() => {
			return GlobalUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
		});

		return Object.assign(contentBase.setup(props), {
			dateFormat,
			dateFormatMask,
			errors,
			errorTimer
		});
	}
};
</script>
