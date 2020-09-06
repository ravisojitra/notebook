import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HamburgerIcon, DownloadIcon, DeleteIcon } from "./../../components/Icons";
import { openSidebar, closeSidebar } from "../../reducers/sidebar";
import { deleteNote, saveNote } from "../../reducers/notebooks";
import downloadAsPdf from "../../utils/downloadAsPdf";

import createNewEditor from "../../utils/createNewEditor";

import "./editor.css";

const Editor = () => {
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();

    const note = useSelector((state) => state.notebooks.currentNote);
    const { theme } = useSelector((state) => state.theme);

    const deleteNoteHandler = () => {
        dispatch(deleteNote(note));
    };

    const saveNoteHandler = async (instance) => {
        const data = await instance.saver.save()

        const title = data.blocks[0];

        if (title.type !== "header" || !note.id) {
            alert("Note cannot be saved without title or note id");
            return;
        }

        const description = data.blocks.find((block) => block.type === "paragraph");

        const updatedNote = {
            ...note,
            title: title.data.text,
            description: description?.data?.text ? description.data.text : "",
            data: data ? JSON.stringify(data) : "",
        };

        dispatch(saveNote(updatedNote))
    };

    useEffect(() => {
        if (editor && editor.isReady) {
            editor.isReady.then(() => editor.destroy());
        }

        if (note.data) {
            setEditor(createNewEditor(JSON.parse(note.data), saveNoteHandler));
        }
    }, [note.data]);

    const downloadAsPdfHandler = () => {
        const dom = document.getElementById("editorjs");
        const title = note.title;
        downloadAsPdf({ dom, title, bg: theme["--bg"] });
    };

    return (
        <div className="editor">
            <div className="editor-header">
                <HamburgerIcon
                    onClick={() => dispatch(openSidebar())}
                />
                <h3
                    onClick={() => dispatch(closeSidebar())}
                >Notebook</h3>
            </div>

            <div id="editorjs" style={{ display: !note.id ? "none" : "" }}></div>

            {note.id && (
                <div className="save-options">
                    <button className="danger-btn" onClick={deleteNoteHandler} >
                        <DeleteIcon width={15} height={15} style={{ marginRight: 10,color:'white' }} />
                    Delete
                    </button>

                    <button className="export-btn" onClick={downloadAsPdfHandler} >
                        <DownloadIcon width={15} height={15} style={{ marginRight: 10 }} />
                        Export to PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default Editor;
