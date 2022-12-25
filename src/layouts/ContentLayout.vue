<template>
	<div>
		<v-row>
			<v-col cols="0" sm="3" />
			<v-col cols="12" sm="6">
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
