<template>
  <NewTask v-if="hasTask" :tags="tags">
    <!-- <router-link :to="{ name: 'home' }" class="btn btnPrimary" @click="saveTask(task.id)"
      :class="{ 'disabled': !slotInputs.newTaskObj.titleTask }"> -->
    <router-link :to="{ name: 'home' }" class="btn btnPrimary" @click="saveTask(task.id)">
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
import { useTasksStore } from '@/store/index.js'

export default {
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore
    };
  },
  props: {
    newTaskObj: {
      type: Object,
      reduce: true,
    },
  },
  components: {
    NewTask, notFound
  },
  data() {
    return {
      // newTaskObj: {
      //   titleTask: "",
      //   descriptionTask: "",
      //   deadLineTask: "",
      // },
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
    // saveTask(id) {
    //   let prior = this.tags.find(el => el.isActive === true)
    //   const newTask = {
    //     id: id,
    //     title: this.newTaskObj.titleTask,
    //     description: this.newTaskObj.descriptionTask,
    //     priority: prior.ind,
    //     deadLine: this.newTaskObj.deadLineTask,
    //     isEdit: false,
    //     isReady: false
    //   }
    //   if (this.newTaskObj.titleTask == '') {
    //     return alert('Заполни все поля!')
    //   } else {        
    //     this.tasksStore.setNewTask(id, newTask)
    //   }
    // },
    // fillInputs() {
    //   this.newTaskObj.titleTask = this.task.title
    //   this.newTaskObj.descriptionTask = this.task.description
    //   this.newTaskObj.deadLineTask = this.task.deadLine
    //   this.tags.forEach(el => (el.isActive = false))
    //   this.tags.find(el => {
    //     if (el.ind === this.task.priority) {
    //       el.isActive = true
    //     }
    //   })
    // },
    // clearOdj() {
    //   this.newTaskObj.titleTask = "";
    //   this.newTaskObj.descriptionTask = "";
    //   this.newTaskObj.deadLineTask = "";
    // },
  },
  mounted() {
    // console.log(slotInputs.newTaskObj.titleTask);
    // this.fillInputs()
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
