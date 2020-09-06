import React from "react";
import { useDispatch } from "react-redux";
import { CloseIcon } from "./../../components/Icons";
import { addNotebook } from "../../reducers/notebooks";
import "./newnote.css";

const AddNotebook = ({ setNotebookModal }) => {
    const dispatch = useDispatch()

    const addNotebookHandler = (e) => {
        if (e.keyCode === 13) {
            setNotebookModal(false);
            dispatch(addNotebook(e.target.value))
        }
    };

    return (
        <div className="new-note">
            <div className="header">
                <h3>Add Notebook</h3>
                <CloseIcon
                    onClick={() => setNotebookModal(false)}
                />
            </div>

            <div className="content">
                <input
                    type="text"
                    placeholder="GraphQL"
                    onKeyDown={addNotebookHandler}
                />
            </div>
        </div>
    );
};

export default AddNotebook;
