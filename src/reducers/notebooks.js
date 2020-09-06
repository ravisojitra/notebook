import { createSlice, nanoid } from '@reduxjs/toolkit';

const notebooks = createSlice({
    name: 'notebooks',
    initialState: { notebooks: [], currentNotebook: {}, currentNote: {} },
    reducers: {
        addNotebook: {
            reducer: (state, { payload }) => {
                state.notebooks.push(payload);
                state.currentNote = {};
                state.currentNotebook = payload
            },
            prepare: name => {
                let id = nanoid(8);
                return { payload: { id, name, notes: [] } }
            }
        },
        addNewNote: (state, { payload }) => {
            let selectedNotebook = state.notebooks.find(notebook => notebook.id == payload.notebookId);
            selectedNotebook.notes.push(payload.newNote);
            state.currentNotebook = selectedNotebook;
            state.currentNote = payload.newNote
        },
        setCurrentNotebook: (state, { payload }) => {
            state.currentNotebook = payload;
        },
        deleteNotebook: (state, { payload }) => {
            let { notebooks,currentNotebook } = state;
            notebooks.splice(notebooks.findIndex(n => n.id == currentNotebook.id), 1);
            state.currentNotebook = state.notebooks[0] || {}
        },
        setCurrentNote: (state, { payload }) => {
            state.currentNote = payload;
        },
        deleteNote: (state, { payload }) => {
            let { currentNotebook, notebooks } = state;
            notebooks.map(notebook => {
                if (notebook.id == currentNotebook.id) {
                    notebook.notes.splice(
                        notebook.notes.findIndex(n => n.id == payload.id), 1
                    );
                }
                return notebook
            });
            currentNotebook.notes && currentNotebook.notes.splice(
                currentNotebook.notes.findIndex(n => n.id == payload.id), 1
            );
            state.currentNotebook = currentNotebook;
            state.currentNote = state.currentNotebook.notes[0] || {}
        },
        saveNote: (state, { payload }) => {
            let { currentNotebook, notebooks } = state;
            let notebook = notebooks.find(notebook => notebook.id == currentNotebook.id);
            notebook.notes = notebook.notes.map(note => {
                if (note.id == payload.id) {
                    return payload
                }
                return note;
            })
            state.currentNotebook = notebook
        }
    }
});

const { reducer, actions } = notebooks;

export default reducer;
export const { addNotebook, editNotebookName, addNewNote, setCurrentNotebook, deleteNotebook, setCurrentNote, deleteNote, saveNote } = actions;