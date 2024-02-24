import { defineStore } from 'pinia'
import { nextTick } from 'vue'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [
            {
                title: ''
            }
        ],
        // tasksSort: null,        
        isCloseForm: false,
        isEditTask: true,
        isChekReady: false
    }),
    persist: {
        paths: ['tasks', 'selectSort', 'isEditTask', 'isChekReady'],
    },
    getters: {
        getTasks: state => state.tasks,
        getTaskById: state => id => state.tasks.find(el => el.id === id),
        getisChekReady: state => state.isChekReady,

        sortByReadyTask: state => st => st.toSorted((x, y) => x.isReady - y.isReady),
        sortByDeadLine: state => st => st.toSorted((x, y) => new Date(x.deadLine) - new Date(y.deadLine)),
        sortById: state => st => st.toSorted((x, y) => x.id - y.id),
        sortByPriority: state => st => st.toSorted((x, y) => y.priority - x.priority),

        getSortTasks(state) {
            return function (selectSort) {
                let st = state.tasks
                if (this.getisChekReady) {
                    st = st.filter(el => el.isReady === false)
                }
                if (selectSort === 'readytask') {
                    st = this.sortByReadyTask(st)
                } else if (selectSort === 'deadline') {
                    st = this.sortByDeadLine(st)
                } else if (selectSort === 'priority') {
                    st = this.sortByPriority(st)
                } else if (selectSort === 'id') {
                    st = this.sortById(st)
                }
                return st
            }
        }
    },
    actions: {        
        saveTask(id) {
            let pr = this.tags.find(el => el.isActive === true)
            const newTask = {
                id: id,
                title: this.newTaskObj.titleTask,
                description: this.newTaskObj.descriptionTask,
                priority: pr.ind,
                deadLine: this.newTaskObj.deadLineTask,
                isEdit: false,
                isReady: false
            }
            if (this.newTaskObj.titleTask == '') {
                return alert('Заполни все поля!')
            } else {
                this.tasks = this.tasks.map(el => {
                    if (el.id === id) {
                        el = newTask
                    }
                    return el
                })
            }
        },
        delTask(id) {
            this.tasks = this.tasks.filter(el => el.id !== id)
        },        
        
    }
})

