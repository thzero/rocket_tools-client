<template>
	<v-row>
		<v-col cols="0" md="2" />
		<v-col cols="12" md="8">
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
