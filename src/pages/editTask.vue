<template>
  <NewTask v-if="hasTask" 
  :newTask="newTaskObj" 
  :tags="tags">
    <router-link :to="{ name: 'home' }" class="btn btnPrimary" @click="tasksStore.saveTask(task.id)"
      :class="{ 'disabled': !newTaskObj.titleTask }">
      Изменить задачу
    </router-link>
  </NewTask>

  <notFound v-else />
</template>

<script>
import NewTask from '@/pages/newTask.vue'
import notFound from '@/pages/notFound.vue'
import { useTasksStore } from '@/store/index.js'

export default {
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore
    };
  },
  props: {},
  components: {
    NewTask, notFound
  },
  data() {
    return {
      newTaskObj: {
        titleTask: "",
        descriptionTask: "",
        deadLineTask: "",
      },
      tags: [
        {
          title: "низкий",
          ind: 1,
          isActive: false,
        },
        {
          title: "средний",
          ind: 2,
          isActive: true,
        },
        {
          title: "высокий",
          ind: 3,
          isActive: false,
        },
      ],
    };
  },
  methods: {
    fillInputs() {
      this.newTaskObj.titleTask = this.task.title
      this.newTaskObj.descriptionTask = this.task.description
      this.newTaskObj.deadLineTask = this.task.deadLine
      this.tags.forEach(el => (el.isActive = false))
      this.tags.find(el => {
        if (el.ind === this.task.priority) {
          el.isActive = true
        }
      })
    },
    clearOdj() {
      this.newTaskObj.titleTask = "";
      this.newTaskObj.descriptionTask = "";
      this.newTaskObj.deadLineTask = "";
    },
  },
  mounted() {
    this.fillInputs()
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },
    validId() {
      return /^[1-9]+\d*$/.test(this.id);
    },
    task() {
      return this.tasksStore.getTaskById(this.id);
    },
    hasTask() {
      return this.validId && this.task !== undefined;
    }
  },
  watch: {},
}




// console.log(tasksStore.newTaskObj.titleTask)
</script>

<style lang="scss"></style>
