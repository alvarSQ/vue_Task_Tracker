import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [
            {
                title: ''
            }
        ],
        tasksSort: null,
        tags: [
            {
                title: 'низкий',
                ind: 1,
                isActive: false
            },
            {
                title: 'средний',
                ind: 2,
                isActive: true
            },
            {
                title: 'высокий',
                ind: 3,
                isActive: false
            }
        ],
        isCloseForm: false,
        isEditTask: true,
        isChekReady: false
    }),
    persist: {
        paths: ['tasks'],
    },
    getters: {
        getTasks: state => state.tasks,
        getTaskById: state => id => state.tasks.find(el => el.id === id),
        getisChekReady: state => state.isChekReady,
        getDelTask: state => id => state.tasks.filter(el => el.id !== id),

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
        delTask(id) {
            this.tasks = this.getDelTask(id)
        },
    }
})

