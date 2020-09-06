import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNote } from "../../reducers/notebooks";

const Note = ({ note }) => {
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.notebooks.currentNote) || {};

    const getNoteHandler = (note) => {
        dispatch(setCurrentNote(note));
    };

    let noteDescription = note.description.length > 60
        ? note.description.substr(0, 60) + "..."
        : note.description;

    return (
        <div
            className={`note-preview 
                ${selectedNote.id === note.id ? "selected-note" : ""}
            `}
            onClick={() => getNoteHandler(note)}
        >
            <h4 dangerouslySetInnerHTML={{__html:note.title}}/>
            <p dangerouslySetInnerHTML={{__html:noteDescription}}/>
        </div>
    );
};

export default Note;