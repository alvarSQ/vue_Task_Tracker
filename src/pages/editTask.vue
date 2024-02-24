<template>
  <newTask v-if="hasTask"> 
    <router-link 
        :to="{ name: 'home' }"
        class="btn btnPrimary"
        @click="tasksStore.saveTask(task.id)"
        :class="{'disabled': !tasksStore.newTaskObj.titleTask}"
      >
        Изменить задачу
      </router-link >
  </newTask>
  
  <notFound v-else />
</template>

<script setup>
import { onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import newTask from '@/pages/newTask.vue'
import notFound from '@/pages/notFound.vue'
import { useTasksStore } from '@/store/index.js'

const tasksStore = useTasksStore()

const router = useRouter()
const route = useRoute()

onMounted(() => {  
  fillInputs()
})

const id = computed(() => parseInt(route.params.id))
const validId = computed(() => /^[1-9]+\d*$/.test(id.value))
const task = computed(() => tasksStore.getTaskById(id.value))
const hasTask = computed(() => validId.value && task.value !== undefined)

function fillInputs() {
  tasksStore.getNewTaskObj.titleTask = task.value.title
  tasksStore.getNewTaskObj.descriptionTask = task.value.description
  tasksStore.getNewTaskObj.deadLineTask = task.value.deadLine
  tasksStore.tags.forEach(el => (el.isActive = false))
  tasksStore.tags.find(el => {
    if (el.ind === task.value.priority) {
      el.isActive = true
    }
  })
}

// console.log(tasksStore.newTaskObj.titleTask)
</script>

<style lang="scss"></style>
