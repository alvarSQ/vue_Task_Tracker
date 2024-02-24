<template>
  <label class="chek">
    <input v-model="tasksStore.isChekReady" type="checkbox" />
    Скрыть&#160;выполненные
  </label>
  <!-- <el-checkbox class="chek" v-model="checked1" label="Скрыть выполненные" size="large" border/>     -->
</template>

<script setup>
import { onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
import { useTasksStore } from '@/store/index.js'

const tasksStore = useTasksStore()

</script>

<style lang="scss">


</style>
