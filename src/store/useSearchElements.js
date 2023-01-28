import { defineStore } from "pinia";

const searchText = '817';

export const useSearchElements = defineStore("searchElements", {
    state: () => ({
        searchElements: [...searchText]
    }),
    getters: {
        nameSearchElements: (state) => state.searchElements,
    },
    actions: {
        addSearchElement(searchText) {
            this.searchElements = searchText
        }
    }
})