<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="note-form__wrapper">
    <div class="note-form">
      <div class="task-content">
        <form style="margin-bottom: 10px">
          <select
            name="Task"
            id="selectTask"
            v-model="selectSort"
          >
            <option value="id">Без сортировки</option>
            <option value="readytask">по выполнению</option>
            <option value="deadline">по дедлайну</option>
            <option value="priority">по приортету</option>
          </select>
        </form>
        <DelSelektTask />

        <router-link
          class="btn btnDefault"
          :to="{ name: 'newTask' }"
          @click="tasksStore.isEditTask = false"
        >
          Добавить новую задачу
        </router-link>
      </div>

      <ul>
        <li
          :class="[
            {
              'low-prior': task.priority === 1,
              'mid-prior': task.priority === 2,
              'hi-prior': task.priority === 3
            },
            task.title ? 'note-list' : ''
          ]"
          v-for="task in tasksStore.getSortTasks(selectSort)"
          :key="task.id"
        >
          <template v-if="task.title">
          <div class="taskList">
            <div class="navbar-content">
              <div>
                <input
                  style="margin-bottom: 0; text-align: center"
                  type="checkbox"
                  v-model="task.isReady"
                  :name="task.title"
                />
              </div>
              <p class="title" :class="{ 'task-ready': task.isReady }">
                {{ task.title }}
              </p>
              <div class="cur-poi">
                <!-- редактировать задачу -->
                <router-link
                  :to="{ name: 'editTask', params: { id: task.id,  } }"
                  @click="tasksStore.isEditTask = true"
                  >&#9997;</router-link
                >
                <!-- удалить задачу -->
                <span @click="tasksStore.delTask(task.id)">&#10060;</span>
              </div>
            </div>
            <template v-if="!task.isReady">
              <div class="navbar-content">
                <p class="deadline" v-if="task.deadLine">
                  Дедлайн: {{ task.deadLine }}
                </p>
              </div>
            </template>
          </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useTasksStore } from '@/store/index.js'
import DelSelektTask from '@/pages/UI/DelSelektTask.vue'


export default {
  setup() {
    const tasksStore = useTasksStore()
    return {
    tasksStore
  }
},
  props: {},
  components: {
    DelSelektTask
  },
  data() {
    return {
       newTaskObj: {
        titleTask: "",
        descriptionTask: "",
        deadLineTask: "",
      },
      selectSort: 'id'
    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>

<style lang="scss">
.task-ready {
  text-decoration: line-through;
}

select {
  padding: 10px;
  border-radius: 15px;
}

.deadline {
  font-size: 14px;
  margin-top: 5px;
  color: #4468e0;
}

.note-list {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: white;

  &.low-prior {
    border: 2px solid #6a02fc4b;
  }
  &.mid-prior {
    border: 2px solid #6a02fca8;
  }
  &.hi-prior {
    border: 2px solid #6a02fc;
  }
}
</style>
