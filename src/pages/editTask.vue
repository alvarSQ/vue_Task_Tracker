<template>
  <NewTask v-if="hasTask">
    <router-link :to="{ name: 'home' }" class="btn btnPrimary" @click="saveTask(task.id)"
      :class="{ 'disabled': !supportStore.getInputs.title }">
      Изменить задачу
    </router-link>
  </NewTask>
  <notFound v-else />
</template>

<script setup>

</script>

<script>
import NewTask from '@/pages/newTask.vue'
import notFound from '@/pages/notFound.vue'
import { mapStores } from 'pinia';
import { useTasksStore } from "@/store/index.js";
import { useSupportStore } from "@/store/supportVar.js";

export default {    
  components: {
    NewTask, notFound
  },
  data() {
    return {};
  },
  methods: {
    saveTask(id) {
      let prior = this.supportStore.getTags.find(el => el.isActive === true)
      const newTask = {
        id: id,
        title: this.supportStore.getInputs.title,
        description: this.supportStore.getInputs.description,
        priority: prior.ind,
        deadLine: this.supportStore.getInputs.deadline,
        isEdit: false,
        isReady: false
      }
      if (this.supportStore.getInputs.title == '') {
        return alert('Заполни все поля!')
      } else {        
        this.tasksStore.setNewTask(id, newTask)
      }
    },
    fillInputs() {
      this.supportStore.getInputs.title = this.task.title
      this.supportStore.getInputs.description = this.task.description
      this.supportStore.getInputs.deadline = this.task.deadLine
      this.supportStore.getTags.forEach(el => (el.isActive = false))
      this.supportStore.getTags.find(el => {
        if (el.ind === this.task.priority) {
          el.isActive = true
        }
      })
    },    
  },
  mounted() {
    this.fillInputs()
  },
  computed: {
    ...mapStores(useTasksStore, useSupportStore),
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
</script>

<style lang="scss"></style>
