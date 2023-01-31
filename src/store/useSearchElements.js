import { defineStore } from "pinia";

export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        text: 'default',
        name: 'search'
    }),
    actions: {
        setText(text) {
            this.text = text;
        }
    }
})