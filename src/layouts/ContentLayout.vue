<template>
	<div>
		<v-row>
			<v-col cols="0" md="3" />
			<v-col cols="12" md="6">
	<router-view />
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'ToolLayout',
};
</script>

<style scoped>
</style>
