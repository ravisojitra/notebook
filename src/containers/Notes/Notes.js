import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import { DeleteIcon } from "./../../components/Icons";
import { deleteNotebook } from "../../reducers/notebooks";
import "./Notes.css";

const Notes = () => {

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const currentNotebook = useSelector(state => state.notebooks.currentNotebook);

    const searchNotesHandler = ({ target: { value } }) => {
        setSearch(value.trim())
    }

    const deleteNotebookHandler = () => {
        dispatch(deleteNotebook());
    };

    return (
        <div className="notes-panel">
            <div className="search-notes">
                <input
                    type="text"
                    placeholder="search notes"
                    onChange={searchNotesHandler}
                    value={search}
                />
            </div>

            {currentNotebook.notes && currentNotebook.notes.map((note) => {
                if (
                    !search ||
                    (search && note.title.toLowerCase().indexOf(search) >= 0)
                ) {
                    return (
                        <Note key={note.id} note={note} />
                    )
                }
                return null
            })}


            {currentNotebook.notes && currentNotebook.notes.length < 1 && (
                <div className="delete-notebook"
                    onClick={deleteNotebookHandler}
                >
                    <DeleteIcon /> <span>Delete Notebook</span>
                </div>
            )}
        </div>
    );
};

export default Notes;