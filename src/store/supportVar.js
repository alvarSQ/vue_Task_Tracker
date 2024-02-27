import { defineStore } from 'pinia'

export const useSupportStore = defineStore('support', {
    state: () => ({
        newTaskInput: {
            title: "",
            description: "",
            deadline: "",
        },
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
        isEditTask: false        
    }),    
    getters: {
        getInputs: state => state.newTaskInput,
        getTags: state => state.tags,
        getIsEditTask: state => state.isEditTask
    },
    actions: {}
})

