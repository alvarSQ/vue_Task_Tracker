<template>
  <div class="note-form__wrapper">
    <form
      class="note-form"
      @submit.prevent="tasksStore.addNewTask()"
      v-if="!tasksStore.isCloseForm"
    >
      <div class="top" @click="tasksStore.clearOdj">
        <router-link class="close" :to="{ name: 'home' }">&#10060;</router-link>
      </div>
      <!-- инпуты -->
      <input
        required
        v-model="tasksStore.newTaskObj.titleTask"
        placeholder="Название задачи..."
      />
      <textarea
        required
        v-model="tasksStore.newTaskObj.descriptionTask"
        placeholder="Описание задачи..."
      />
      <input v-model="tasksStore.newTaskObj.deadLineTask" type="date" />
      <!-- /инпуты -->
      <strong style="text-align: center">приоритет выполнения:</strong>
      <TagsList :items="tasksStore.tags" />
      <button
        class="btn btnPrimary"
        type="submit"
        :disabled="!tasksStore.newTaskObj.titleTask"
        v-if="!tasksStore.isEditTask"
      >
        Добавить новую задачу
      </button>
      <slot v-else/>
    </form>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
import TagsList from '@/pages/UI/TagsList.vue'
import { useTasksStore } from '@/store/index.js'

const tasksStore = useTasksStore()

onMounted(() => {  
  tasksStore.clearOdj()
})

</script>

<style lang="scss">
.task-ready {
  text-decoration: line-through;
}
.top {
  margin-top: -15px;
  margin-bottom: 5px;
}
.close {
  float: right;
  font-size: 12px;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
}


.deadline {
  margin-top: 5px;
  color: #4468e0;
}

.note-list {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: white;
}

.tag-item {
  padding: 8px 22px;
  margin-right: 10px;
  border-radius: 22px;
  user-select: none;
  cursor: pointer;
  &.isActive {
    background-color: #444ce0;
    color: #fff;
  }
  &.isPreview {
    padding: 0;
    color: #444ce0;
    cursor: default;
    &:before {
      content: '#';
    }
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
