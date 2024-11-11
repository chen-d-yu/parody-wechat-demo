<template>
	<view>
		<up-overlay show :custom-style="{ backgroundColor: '#000000' }">
			<view class="u-flex u-row-center u-col-center">
				<view style="color: #fff">
					<up-image :width="useCommonStore.windowWidth" :height="useCommonStore.windowHeight"
						:show-loading="true" :src="startUp" mode="aspectFill" duration="450" fade />
				</view>
			</view>
		</up-overlay>
	</view>
</template>

<script setup lang="ts">
	import commonStore from "@/store/commonStore";
	import { onMounted } from "vue";
	const startUp = "/static/login/bg.jpg";
	const useCommonStore = commonStore();

	// 跳转首页
	onMounted(() => {
		setTimeout(() => {
			uni.redirectTo({
				url: "/pages/group/index",
			});
		}, 2000);
	});
</script>

<style scoped lang="scss"></style>