<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<script>
import baseAbout from '@/library_vue/components/baseAbout';

export default {
	name: 'About',
	extends: baseAbout,
	setup(props) {
		return Object.assign(baseAbout.setup(props), {
		});
	}
};
</script>

<style scoped>
</style>
