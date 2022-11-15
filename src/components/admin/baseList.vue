<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import baseList from '@/library_vue/components/admin/baseList';
import VConfirmationDialog from '@/library_vue/components/VConfirmationDialog';

export default {
	name: 'BaseAdminList',
	components: {
		VConfirmationDialog
	},
	extends: baseList,
	data: () => ({
	}),
	methods: {
		initializeServices() {
		},
		initialize() {
		}
	}
};
</script>
