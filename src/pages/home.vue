<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="note-form__wrapper">
    <div class="note-form">
      <div class="task-content">
        <form style="margin-bottom: 10px">
          <select name="Task" id="selectTask" v-model="tasksStore.selectSort">
            <option value="id">Без сортировки</option>
            <option value="readytask">по выполнению</option>
            <option value="deadline">по дедлайну</option>
            <option value="priority">по приортету</option>
            <option value="hand">вручную</option>
          </select>
        </form>
        <DelSelektTask />

        <router-link class="btn btnDefault" :to="{ name: 'newTask' }" @click="supportStore.isEditTask = false">

          Добавить новую задачу
        </router-link>
      </div>

      <draggable v-model="compSortTasks" tag="ul" item-key="id" @end="tasksStore.detectEnd">
        <template #item="{ element: task }">
          <li :class="[
            {
              'low-prior': task.priority === 1,
              'mid-prior': task.priority === 2,
              'hi-prior': task.priority === 3
            },
            task.title ? 'note-list' : ''
          ]" v-if="task.title">
            <div class="taskList">
              <div class="navbar-content">
                <div>
                  <input style="margin-bottom: 0; text-align: center" type="checkbox" v-model="task.isReady"
                    :name="task.title" />
                </div>
                <p class="title" :class="{ 'task-ready': task.isReady }">
                  {{ task.title }}
                </p>
                <div class="cur-poi">
                  <!-- редактировать задачу -->
                  <router-link :to="{ name: 'editTask', params: { id: task.id } }"
                    @click="supportStore.isEditTask = true">&#9997;</router-link>
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
          </li>
        </template>
      </draggable>      
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
import { useSupportStore } from "@/store/supportVar.js";
import { useTasksStore } from "@/store/index.js";
const tasksStore = useTasksStore();
const supportStore = useSupportStore();

const compSortTasks = computed({
  get: () => tasksStore.getSortTasks,
  set: (val) => tasksStore.handSort(val),
})
</script>

<script>
import draggable from 'vuedraggable'
import DelSelektTask from '@/pages/UI/DelSelektTask.vue'
export default {
  props: {},
  components: {
    DelSelektTask, draggable
  },
  data() {
    return {
      // selectSort: 'id'
    }
  },
  methods: {
    
  },
  mounted() { },
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
