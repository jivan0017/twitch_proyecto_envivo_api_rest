import { defineStore } from 'pinia';

export const useSearchElementsStore = defineStore({
    id: 'sarch',
    state: () => ({
        text: 'texto valor defecto:: desde el store',
        otroTextEnElEstado: 'valor de ejemplo en el estado global'
    }),
    action: {
        setText(textCualquiera) {
            this.text = textCualquiera
        }
    }
});
