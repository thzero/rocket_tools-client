<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.epoxy') }}
			</v-col>
		</v-row>
	</div>
</template>
		
<script>
import contentBase from '@/components/content/contentBase';

export default {
	name: 'Epxoy',
	extends: contentBase,
	setup(props) {
		return Object.assign(contentBase.setup(props), {
		});
	},
};
</script>
