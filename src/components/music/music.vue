<template>
	<transition :name="transitionName2">
		<router-view></router-view>
	</transition>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState({
				transitionName: state => state.transitionName,
				transitionName2: state => state.transitionName2
			})
		},
		components: {}
	}
</script>
