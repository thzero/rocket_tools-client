<template>
	<v-row id="top">
		<v-col cols="0" md="3" />
		<v-col cols="12" md="6">
<router-view />
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'ContentLayout',
};
</script>

<style scoped>
</style>
