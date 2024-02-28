import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [
            {
                title: ''
            }
        ],
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
        sortChange() {
            this.tasks.sort((x, y) => y.priority - x.priority)
        },
        detectEnd(e) {
            const difference = e.newIndex - e.oldIndex
            const start = e.oldIndex + 1
            const end = e.newIndex + 1

            this.tasks = this.tasks.map((el, i) => {  
                if (difference > 0) {
                    if (el.sortHandle > start && el.sortHandle <= end) {
                        el.sortHandle -= 1                        
                    }
                }
                if (difference < 0) {
                    if (el.sortHandle < start && el.sortHandle >= end) {                                            
                        el.sortHandle += 1                        
                    }
                }
                if (i === e.newIndex) {
                    el.sortHandle += difference
                }               
                return el
            })
            // console.log(e.dragged.__draggable_context.element.id)
            // console.log(e.related.__draggable_context.element.id)
            // console.log(e.oldIndex)
            // console.log(e.newIndex)
            // console.log(el.sortHandle > start && el.sortHandle <= end)  
        }
    }
})
// { "tasks": [{ "id": 1, "title": "1", "description": "1111", "priority": 2, "deadLine": "", "sortHandle": 1, "isEdit": false, "isReady": false }, { "id": 2, "title": "2", "description": "22", "priority": 1, "deadLine": "", "sortHandle": 2, "isEdit": false, "isReady": false }, { "id": 3, "title": "3", "description": "33", "priority": 3, "deadLine": "", "sortHandle": 3, "isEdit": false, "isReady": false }, { "id": 4, "title": "4", "description": "444", "priority": 3, "deadLine": "", "sortHandle": 4, "isEdit": false, "isReady": false }, { "id": 5, "title": "5", "description": "55", "priority": 1, "deadLine": "", "sortHandle": 5, "isEdit": false, "isReady": false }, { "id": 6, "title": "6", "description": "6666", "priority": 3, "deadLine": "", "sortHandle": 6, "isEdit": false, "isReady": false }] }
// { "tasks": [{ "id": 3, "title": "3", "description": "33", "priority": 3, "deadLine": "", "sortHandle": 1, "isEdit": false, "isReady": false }, { "id": 2, "title": "2", "description": "22", "priority": 1, "deadLine": "", "sortHandle": 2, "isEdit": false, "isReady": false }, { "id": 6, "title": "6", "description": "6666", "priority": 3, "deadLine": "", "sortHandle": 3, "isEdit": false, "isReady": false }, { "id": 1, "title": "1", "description": "1111", "priority": 2, "deadLine": "", "sortHandle": 4, "isEdit": false, "isReady": false }, { "id": 4, "title": "4", "description": "444", "priority": 3, "deadLine": "", "sortHandle": 5, "isEdit": false, "isReady": false }, { "id": 5, "title": "5", "description": "55", "priority": 1, "deadLine": "", "sortHandle": 6, "isEdit": false, "isReady": false }] }

