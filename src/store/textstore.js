import { writable } from 'svelte/store';

const connectionsStore = writable({
    formattedText : '',
});

const textStoreActions = {
    subscribe: connectionsStore.subscribe,
    setFormattedText: text => connectionsStore.update((store) => {
        const newData = {...store,formattedText:text};
        return newData;
    }),
};

export {textStoreActions};

