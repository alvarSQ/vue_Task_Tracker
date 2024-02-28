<template>
  <div class="note-form__wrapper">
    <form class="note-form" @submit.prevent="addNewTask()">
      <div class="top">
        <router-link class="close" :to="{ name: 'home' }" @click="clearInputs">&#10060;</router-link>
      </div>
      <!-- инпуты -->
      <input v-model="supportStore.getInputs.title" placeholder="Название задачи..." />
      <textarea
        v-model="supportStore.getInputs.description"
        placeholder="Описание задачи..."
      />
      <input v-model="supportStore.getInputs.deadline" type="date" />
      <!-- /инпуты -->
      <strong style="text-align: center">приоритет выполнения:</strong>
      <TagsList @tagClick="handleTagClick" />
      <button
        class="btn btnPrimary"
        type="submit"
        :disabled="!supportStore.getInputs.title"
        v-if="!supportStore.getIsEditTask"
      >
        Добавить новую задачу
      </button>
      <slot v-else />
    </form>
  </div>
</template>

<script setup></script>

<script>
import TagsList from "@/pages/UI/TagsList.vue";
import { mapStores } from "pinia";
import { useTasksStore } from "@/store/index.js";
import { useSupportStore } from "@/store/supportVar.js";

export default { 
  components: {
    TagsList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useTasksStore, useSupportStore),
  },
  methods: {
    addNewTask() {
      const prior = this.supportStore.getTags.find((el) => el.isActive === true);
      const newTask = {
        id:
          this.tasksStore.getTasks.reduce((max, el) => (el.id > max ? el.id : max), 0) +
          1,
        title: this.supportStore.getInputs.title,
        description: this.supportStore.getInputs.description,
        priority: prior.ind,
        deadLine: this.supportStore.getInputs.deadline,
        sortHandle: this.tasksStore.getTasks.reduce((max, el) => (el.sortHandle > max ? el.sortHandle : max), 0) +
          1,
        isEdit: false,
        isReady: false,
      };
      if (this.supportStore.getInputs.title == "") {
        return;
      } else {
        this.tasksStore.getTasks.push(newTask);
      }
      if (this.tasksStore.getTasks[0].title == "") {
        this.tasksStore.getTasks.shift();
      }
      this.clearInputs();
    },
    clearInputs() {
      this.supportStore.getInputs.title = "";
      this.supportStore.getInputs.description = "";
      this.supportStore.getInputs.deadline = "";
    },
    handleTagClick(tag) {
      this.supportStore.getTags.forEach((el) => (el.isActive = false));
      tag.isActive = !tag.isActive;
    },
  },
  mounted() { this.clearInputs() },
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
