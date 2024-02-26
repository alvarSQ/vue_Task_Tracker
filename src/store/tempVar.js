import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        newTaskObj: {
            titleTask: "",
            descriptionTask: "",
            deadLineTask: "",
        }         
        
    }),
    getters: {
        
    },
    actions: {        

    }
})

