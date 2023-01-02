<template>
	<v-row dense style="overflow: auto; max-height: 100vh;">
		<v-col
			style="overflow: overflow-y; height: 150px;"
		>
			<v-code lang="javascript">
				<template
					v-for="value in modelValue"
				>
					{{ value }}<br/>
				</template>
			</v-code>
		</v-col>
	</v-row>
</template>

<script>
import { useBaseComponent } from '@/library_vue/components/base';

export default {
	name: 'CalculatedOuput',
	props: {
		modelValue: {
			type: Array,
			default: () => { return []; }
		}
	},
	setup (props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success
		} = useBaseComponent(props, context);

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success
		};
	}
};
</script>
