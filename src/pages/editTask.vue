<template>
  <NewTask v-if="hasTask"> 
    <router-link 
        :to="{ name: 'home' }"
        class="btn btnPrimary"
        @click="tasksStore.saveTask(task.id)"
        :class="{'disabled': !tasksStore.newTaskObj.titleTask}"
      >
        Изменить задачу
      </router-link >
  </NewTask>
  
  <notFound v-else />
</template>

<script>
import { onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NewTask from '@/pages/newTask.vue'
import notFound from '@/pages/notFound.vue'
import { useTasksStore } from '@/store/index.js'

export default {
  setup() {
    const tasksStore = useTasksStore();
    
    const router = useRouter()
    const route = useRoute()

    const id = computed(() => parseInt(route.params.id))
    const validId = computed(() => /^[1-9]+\d*$/.test(id.value))
    const task = computed(() => tasksStore.getTaskById(id.value))
    const hasTask = computed(() => validId.value && task.value !== undefined)


    return {
      tasksStore,
      router,
      route
    };
  },
  props: {},
  components: {
    NewTask, notFound
  },
  data() {
    return {
      
    };
  },
  methods: {
    fillInputs() {
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
  },
  mounted() {
    this.fillInputs()
  },
  watch: {},
}




// console.log(tasksStore.newTaskObj.titleTask)
</script>

<style lang="scss"></style>
