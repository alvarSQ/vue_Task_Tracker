import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [
            {
                title: ''
            }
        ],
        isChekReady: false,
        selectSort: 'id'
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
        sortBySortHandle: state => st => st.toSorted((x, y) => x.sortHandle - y.sortHandle),

        setNewTask(state) {
            return function (id, newTask) {
                state.tasks = state.tasks.map(el => {
                    if (el.id === id) {
                        el = newTask
                    }
                    return el
                })
            }
        },

        getSortTasks(state) {
            let st = state.getTasks
            if (this.getisChekReady) {
                st = st.filter(el => el.isReady === false)
            }
            if (this.selectSort === 'readytask') {
                st = this.sortByReadyTask(st)
            } else if (this.selectSort === 'deadline') {
                st = this.sortByDeadLine(st)
            } else if (this.selectSort === 'priority') {
                st = this.sortByPriority(st)
            } else if (this.selectSort === 'id') {
                st = this.sortById(st)
            } else if (this.selectSort === 'hand') {
                st = this.sortBySortHandle(st)
            }
            return st
        }
    },
    actions: {
        handSort(val) {
            if (this.getisChekReady) {
                val = this.getTasks
            }
            this.isChekReady = false
            this.selectSort = 'hand'
            this.tasks = val
        },
        delTask(id) {
            this.tasks = this.getDelTask(id)
        },
        sortChange() {
            this.tasks.sort((x, y) => y.priority - x.priority)
        },
        detectEnd(e) {
            const difference = e.newIndex - e.oldIndex
            const start = e.oldIndex + 1
            const maxSort = Math.max(...this.getTasks.map(el => el.sortHandle))
            const endMax = maxSort - this.getTasks.length + 1
            const end = e.newIndex + endMax

            this.tasks = this.getTasks.map((el, i) => {
                if (difference > 0) {
                    if (el.sortHandle > start && el.sortHandle <= end) {
                        el.sortHandle = i + 1
                    }
                }
                if (difference < 0) {
                    if (el.sortHandle < start && el.sortHandle >= end) {
                        el.sortHandle = i + 1
                    }
                }
                if (i === e.newIndex) {
                    el.sortHandle = i + 1
                }
                return el
            })
        }
    }
})
// { "tasks": [{ "id": 1, "title": "1", "description": "1111", "priority": 2, "deadLine": "", "sortHandle": 1, "isEdit": false, "isReady": false }, { "id": 2, "title": "2", "description": "22", "priority": 1, "deadLine": "", "sortHandle": 2, "isEdit": false, "isReady": false }, { "id": 3, "title": "3", "description": "33", "priority": 3, "deadLine": "", "sortHandle": 3, "isEdit": false, "isReady": false }, { "id": 4, "title": "4", "description": "444", "priority": 3, "deadLine": "", "sortHandle": 4, "isEdit": false, "isReady": false }, { "id": 5, "title": "5", "description": "55", "priority": 1, "deadLine": "", "sortHandle": 5, "isEdit": false, "isReady": false }, { "id": 6, "title": "6", "description": "6666", "priority": 3, "deadLine": "", "sortHandle": 6, "isEdit": false, "isReady": false }] }

