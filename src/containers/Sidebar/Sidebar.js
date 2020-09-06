import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotebookIcon, PlusIcon } from "./../../components/Icons";
import Modal from "./../../components/Modal";
import AddNotebook from "./../Notes/AddNotebook";
import NewNote from "./../Notes/NewNote";
import { setCurrentNotebook, setCurrentNote } from "../../reducers/notebooks";
import { changeTheme } from "../../reducers/theme";
import "./Sidebar.css";

const Sidebar = () => {
    const dispatch = useDispatch()

    const [notebookModal, setNotebookModal] = useState(false);
    const [newNoteModal, setNewNotebookModal] = useState(false);

    const notebooks = useSelector((state) => state.notebooks.notebooks);
    const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);
    const selectedNote = useSelector((state) => state.notebooks.currentNote);
    const sidebar = useSelector((state) => state.sidebar);

    const getNotesHandler = (notebook) => {
        dispatch(setCurrentNotebook(notebook))
    };

    return (
        <div className={`sidebar ${sidebar ? "mobile" : ""}`}>
            <div className="user-theme">
                <span className="user">{'Change Theme'}</span>
                <div
                    className="theme-switch"
                    onClick={() => dispatch(changeTheme())}
                ></div>
            </div>

            <ul className="notebooks">
                {notebooks && notebooks.map((notebook) => {
                    let isSelected = currentNotebook.id === notebook.id;
                    return (
                        <div key={notebook.id}>
                            <li
                                className={isSelected ? "selected-notebook" : ''}
                                onClick={() => getNotesHandler(notebook)}
                            >
                                <span >{notebook.name}</span>{" "}
                                {isSelected && (
                                    <PlusIcon
                                        onClick={() => setNewNotebookModal(true)}
                                    />
                                )}
                            </li>

                            {isSelected && (
                                <div className="notes">
                                    {currentNotebook.notes.map((note) => (
                                        <p
                                            className={
                                                selectedNote.id === note.id ? "selected-note-sidebar" : ""
                                            }
                                            key={note.id}
                                            onClick={() => dispatch(setCurrentNote(note))}
                                        >
                                            {note.title}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </ul>

            <div
                className="new-notebook"
                onClick={() => setNotebookModal(true)}
            >
                <NotebookIcon />
                <span>Add Notebook</span>
            </div>

            {notebookModal && (
                <Modal>
                    <AddNotebook setNotebookModal={setNotebookModal} />
                </Modal>
            )}

            {newNoteModal && (
                <Modal>
                    <NewNote setNewNotebookModal={setNewNotebookModal} />
                </Modal>
            )}
        </div>
    );
};

export default Sidebar