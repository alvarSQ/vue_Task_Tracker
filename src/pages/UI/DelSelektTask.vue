<template>
  <label class="chek">
    <input v-model="tasksStore.isChekReady" type="checkbox" />
    Скрыть выполненные
  </label>
</template>

<script setup>
import { onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
import { useTasksStore } from '@/store/index.js'

const tasksStore = useTasksStore()

</script>

<style lang="scss">


</style>
