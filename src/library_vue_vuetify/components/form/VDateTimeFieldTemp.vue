<template>
    <Datepicker 
		v-model="innerValue"
		:enable-time-picker="false"
		:dark="dark"
	/>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from 'vue';
import { useTheme } from 'vuetify';
		
import dayjs from 'dayjs';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'VtDatetimePicker',
    components: { 
		Datepicker 
	},
	extends: baseControlEdit,
	setup (props) {
		const instance = getCurrentInstance();

		const theme = useTheme();

		const dark = computed(() => {
			return theme.current.value.dark;
		});

		const convertValue = (value) => {
			return value ? value : Date();
		};

		return Object.assign(baseControlEdit.setup(props), {
			convertValue,
			dark,
			theme
		});
	}
};
</script>

<style scoped>
</style>
