<template>
  <u-navbar
    :title="title"
    :bgColor="bgColor"
    :placeholder="placeholder"
    :leftIcon="getLeftIcon"
    left-icon-color="#fff"
    :titleStyle="titleStyle"
    @leftClick="handleLeftIconClick"
  >
  </u-navbar>
</template>

<script setup lang="ts">
import { useNavBar } from "@/hooks/useNavBar";
interface IProps {
  title: string;
  bgColor?: string;
  placeholder?: boolean;
  titleStyle?: string | object;
}
withDefaults(defineProps<IProps>(), {
  title: "",
  bgColor: "#f8f8f8",
  placeholder: true,
});
const { getLeftIcon, handleLeftIconClick } = useNavBar();
</script>

<style lang="scss" scoped></style>
