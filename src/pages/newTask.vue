<template>
  <div class="note-form__wrapper">
    <form class="note-form" @submit.prevent="addNewTask()" v-if="!tasksStore.isCloseForm">
      <div class="top" @click="tasksStore.clearOdj">
        <router-link class="close" :to="{ name: 'home' }">&#10060;</router-link>
      </div>
      <!-- инпуты -->
      <input v-model="newTaskObj.titleTask" placeholder="Название задачи..." />
      <textarea v-model="newTaskObj.descriptionTask" placeholder="Описание задачи..." />
      <input v-model="newTaskObj.deadLineTask" type="date" />
      <!-- /инпуты -->
      <strong style="text-align: center">приоритет выполнения:</strong>
      <TagsList :tags="tags" @tagClick="handleTagClick" />
      <button class="btn btnPrimary" type="submit" :disabled="!newTaskObj.titleTask" v-if="!tasksStore.isEditTask">
        Добавить новую задачу
      </button>
      <slot v-else :newTaskObj="newTaskObj" />
    </form>
  </div>
</template>

<script setup>
import { useTasksStore } from "@/store/index.js";
const tasksStore = useTasksStore();
</script>



<script>
import { onMounted, watch, computed, onUpdated, onUnmounted } from "vue";
import TagsList from "@/pages/UI/TagsList.vue";
// import { useTasksStore } from "@/store/index.js";

export default {      
  props: {
    // newTaskObj: {
    //   type: Object,
    //   reduce: true,
    // },
    tags: {
      type: Array,
      reduce: true,
    },
  },
  components: {
    TagsList,
  },
  data() {
    return {
      newTaskObj: {
        titleTask: "",
        descriptionTask: "",
        deadLineTask: "",
      }
    }
  },
  methods: {
    addNewTask() {
      const prior = this.tags.find((el) => el.isActive === true);
      const newTask = {
        id:
          this.tasksStore.getTasks.reduce((max, el) => (el.id > max ? el.id : max), 0) +
          1,
        title: this.titleTask,
        description: this.descriptionTask,
        priority: prior.ind,
        deadLine: this.deadLineTask,
        isEdit: false,
        isReady: false,
      };
      if (this.titleTask == "") {
        return;
      } else {
        this.tasksStore.getTasks.push(newTask);
      }
      if (this.tasksStore.getTasks[0].title == "") {
        this.tasksStore.getTasks.shift();
      }
      // this.clearOdj();
    },
    handleTagClick(tag) {
      this.tags.forEach((el) => (el.isActive = false));
      tag.isActive = !tag.isActive;
    },
  },
  mounted() { },
  watch: {},
};
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
      content: "#";
    }
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
