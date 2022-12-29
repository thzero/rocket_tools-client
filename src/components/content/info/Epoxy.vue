<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.epoxy') + ' ' + $t('titles.content.info.title') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('strings.content.info.epoxy.chart') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<v-table
					fixed-header
				>
					<thead>
						<tr>
							<th></th>
							<th
								v-for="item in data"
								:key="item.name" 
								class="text-left"
							>
								<p class="header"><a :href="item.link" target="_blank">{{ item.name }}</a></p>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Ratio by weight<br/>(resin/hardener)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.ratioWeight }}</td>
						</tr>
						<tr>
							<td>Ratio by volume<br/>(resin/hardener)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.ratioVolume }}</td>
						</tr>
						<tr>
							<td>Pot life (m)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.potLife }}</td>
						</tr>
						<tr>
							<td>Handling time (m)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.handlingTime }}</td>
						</tr>
						<tr>
							<td>Full cure (m)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.fullCure }}</td>
						</tr>
						<tr>
							<td>Shore “D” hardness</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.shoreHardness }}</td>
						</tr>
						<tr>
							<td>Specific gravity</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.specificGravity }}</td>
						</tr>
						<tr>
							<td>Tensile strength (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileStrength ? item.tensileStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Tensile Elongation (%)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileElongation }}</td>
						</tr>
						<tr>
							<td>Flexural strength (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.fFlexuralStrength ? item.fFlexuralStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Flexural Modulus (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.flexuralModulus ? item.flexuralModulus.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Compression strength (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.compressionStrength ? item.compressionStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Maximum use temperature</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.maxUseTemp }}</td>
						</tr>
						<tr>
							<td>Deflection temperature </td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.deflectionTemp }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pt-4 pb-2">
				{{ $t('strings.content.info.epoxy.additionalLinks') }}
			</v-col>
			<v-col cols="12" class="pb-2">
				<a href="http://www.jcrocket.com/adhesives.shtml" target="_blank">http://www.jcrocket.com/adhesives.shtml</a><br/>
				<a href="https://www.rocketryforum.com/threads/epoxy-comparisons-and-technical-data-sheets.138953/page-2" target="_blank">https://www.rocketryforum.com/threads/epoxy-comparisons-and-technical-data-sheets.138953/page-2</a>
			</v-col>
		</v-row>
	</div>
</template>
		
<script>
import { computed, getCurrentInstance, ref } from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import contentBase from '@/components/content/contentBase';

export default {
	name: 'Epxoy',
	extends: contentBase,
	setup(props) {
		const instance = getCurrentInstance();

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		
		const data = computed(() => {
			let temp = instance.ctx.serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.info)
				return [];
			const content = temp.info.find(l => l.id === 'epoxy');
			return content ? content.data : [];
		});

		return Object.assign(contentBase.setup(props), {
			data,
			serviceStore
		});
	}
};
</script>

<style scoped>
	.header {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		text-align: left;
		margin-bottom: 12px;
		min-height: 100px;
	}
</style>
