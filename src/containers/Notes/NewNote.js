import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseIcon } from "./../../components/Icons";
import { addNewNote } from './../../reducers/notebooks';
import "./newnote.css";
import { nanoid } from "@reduxjs/toolkit";

const createNewNote = (title) => {
    const data = {
        timestamp: Math.floor(Date.now() / 1000),
        blocks: [{ type: "header", data: { text: title, level: 2 } }],
        version: "2.18.0",
    };

    return JSON.stringify(data);
};

const NewNote = ({ setNewNotebookModal }) => {
    const dispatch = useDispatch();
    const { currentNotebook } = useSelector(state => state.notebooks);
    const addNoteHandler = (e) => {
        if (e.keyCode === 13) {
            setNewNotebookModal(false);

            const newNote = {
                id: nanoid(8),
                title: e.target.value,
                description: "",
                data: createNewNote(e.target.value),
            };

            dispatch(addNewNote({ notebookId: currentNotebook.id, newNote }));
        }
    };

    return (
        <div className="new-note">
            <div className="header">
                <h3>New Note</h3>
                <CloseIcon onClick={() => setNewNotebookModal(false)} />
            </div>

            <div className="content">
                <input
                    type="text"
                    placeholder="State Management"
                    onKeyDown={addNoteHandler}
                />
            </div>
        </div>
    );
};

export default NewNote;
