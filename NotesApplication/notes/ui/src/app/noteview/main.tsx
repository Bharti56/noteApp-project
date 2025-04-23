import { useEffect, useState } from "react";
import apis from "../common/model";

interface Note {
    nid: number;
    title: string;
    content: string;
}

const NoteView = () => {

    const [notesList, setNotesList] = useState<Note[]>([]);
    const [note, setNote] = useState<Note>({ nid: 0, title: "", content: "" });
    const [windowTitle, setWindowTitle] = useState<string>("Add New Note");

    const toggleWindow = (id: string) => {
        const windowstyle = document.getElementById(id);
        if (windowstyle) {
            if (windowstyle.style.display == "flex") {
                windowstyle.style.display = "none";
            }
            else {
                windowstyle.style.display = "flex";
                windowstyle.style.flexDirection = "column";
                windowstyle.style.alignItems = "center";
                windowstyle.style.justifyContent = "center";
            }
        }
    }

    const handleUpdate = (id: number) => {
        const noteToUpdate = notesList.find((note) => note.nid === id);
        if (noteToUpdate) {
            setNote(noteToUpdate);
            toggleWindow("updatenotewindow");
            setWindowTitle("Update Note");
        }
    }

    const updateNote = () => {
        apis().update(note).then((response) => {
            if (response.status === 200) {
                setNotesList(notesList.map((n) => n.nid === note.nid ? note : n));
                toggleWindow("updatenotewindow");
            }
            else {
                console.log("Error: ", response.data.message);
            }
        }).catch((error) => {
            console.log("Error: ", error.message);
        });
    }

    const createNote = async () => {
    
       const request = await fetch("http://localhost:9090/note/postnote",{
        method:"post",
        body:JSON.stringify(note),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        
       });
       const response = await request.json()
       if(response.status === 200){
        setNotesList(response.body);
    }
    else {
        console.error("Error: ", response.data.message);
    }
    }

    // const getNoteById = (id: number) => {
    //     apis().getById(id.toString()).then((response) => {
    //         if (response.status === 200) {
    //             setNote(response.data);
    //         }
    //         else {
    //             console.log("Error: ", response.data.message);
    //         }
    //     }).catch((error) => {
    //         console.log("Error: ", error.message);
    //     })
    // };

    const deleteNote = (id: number) => {
        apis().delete(id.toString()).then((response) => {
            if (response.status === 200) {
                setNotesList(notesList.filter((note) => note.nid !== id));
                toggleWindow("confirmdelete");
            }
            else {
                console.log("Error: ", response.data.message);
            }
        }).catch((error) => {
            console.log("Error: ", error.message);
        });
    }

    const confirmDelete = (id: number) => {
        const noteToDelete = notesList.find((note) => note.nid === id);
        if (noteToDelete) {
            setNote(noteToDelete);
            toggleWindow("windowviewid");
            setWindowTitle("Confirm Delete Note");
        }
    }

    useEffect(() => {
        const getAllNotes = async () => {
            const request = await fetch("http://localhost:9090/note/getallnotes");
            const response = await request.json();
            if(response.status === 200){
                setNotesList(response.body);
            }
            else {
                console.error("Error: ", response.data.message);
            }
        }

        getAllNotes().catch((error) => {
            console.error("Error: ", error.message);
        });
    }, []);

    return (

        <div className="page-view bg-body text-body">
            <div className="grid-row row-top row-center col-height-10">

                <div className="col-width-13 padding--small col-height-auto">
                    <h1 className="heading--h1">Apps List</h1>
                    <div className="form-wrapper grid-row padding--medium">
                        <div className="col-width-12">
                            <ul className="lsist-view-vertical">
                                <li>
                                    <button className="primary-add-button border--none border--smooth bg-secondary-light text-secondary" onClick={() => toggleWindow("newnotewindow")}>Add New Note</button>
                                </li>
                                {notesList.map((note, index) => {
                                    return (
                                        <li key={index} className="list-item grid-row row-middle row-center">
                                            <div className="col-width-1">
                                                <p className="list-item-label">{note.nid}</p>
                                            </div>
                                            <div className="col-width-3">
                                                <p className="list-item-label">{note.title}</p>
                                            </div>
                                            <div className="col-width-7">
                                                <p className="list-item-label">{note.content}</p>
                                            </div>
                                            <div className="col-width-2">
                                                <button onClick={() => handleUpdate(note.nid)} className="list-item-button">update</button>
                                            </div>
                                            <div className="col-width-2">
                                                <button onClick={() => confirmDelete(note.nid)} className="list-item-button">delete</button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>  

<div className="window-view padding--large window-view--small" id="newnotewindow">
    <div className="window-title bg-muted-light text-muted">
        <span className="window-title-text">Add new note</span>
        <button className="window-title-action bg-error border--none border--smooth" onClick={() => toggleWindow("windowviewid")}>&nbsp;&nbsp; X &nbsp;&nbsp;</button>
    </div>
    <div className="window-content bg-body-dark text-body">
        <h2 className="heading--h2">Add new note</h2>
        <div className="form-wrapper grid-row row-bottom padding--small">
            <div className="col-width-15">
                <h3 className="heading--h3">Note title</h3><br />
                <input type="text" className="input--text" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Enter note title" />
            </div><br /><br />
            <div className="col-width-15">
                <h3 className="heading--h3">Note title</h3><br />
                <input type="text" className="input--text" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} placeholder="Enter note title" />
            </div><br /><br />
            <div className="col-width-15">
                <button>
                    <span className="primary-add-button border--none border--smooth bg-secondary-light text-secondary" onClick={windowTitle === "Add New Note" ? createNote : updateNote}>
                        Add
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>

<div className="window-view padding--large window-view--small" id="updatenotewindow">
    <div className="window-title bg-muted-light text-muted">
        <span className="window-title-text">Update note</span>
        <button className="window-title-action bg-error border--none border--smooth" onClick={() => toggleWindow("windowviewid")}>&nbsp;&nbsp; X &nbsp;&nbsp;</button>
    </div>
    <div className="window-content bg-body-dark text-body">
        <h2 className="heading--h2">Update note</h2>
        <div className="form-wrapper grid-row row-bottom padding--small">
            <div className="col-width-15">
                <h3 className="heading--h3">Note title</h3><br />
                <input type="text" className="input--text" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Enter note title" />
            </div><br /><br />
            <div className="col-width-15">
                <h3 className="heading--h3">Note title</h3><br />
                <input type="text" className="input--text" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} placeholder="Enter note title" />
            </div><br /><br />
            <div className="col-width-15">
                <button>
                    <span className="primary-add-button border--none border--smooth bg-secondary-light text-secondary" onClick={windowTitle === "Add New Note" ? createNote : updateNote}>
                        Update
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>

            <div className="window-view padding--large window-view--small" id="confirmdelete">
                <div className="window-title bg-muted-light text-muted">
                    <span className="window-title-text">Delete note</span>
                    <button className="window-title-action bg-error border--none border--smooth" onClick={() => toggleWindow("confirmdelete")}>&nbsp;&nbsp; X &nbsp;&nbsp;</button>
                </div>
                <div className="window-content bg-body-dark text-body">
                    <h2 className="heading--h2">Delete note</h2>
                    <div className="form-wrapper grid-row row-bottom padding--small">
                        <div className="col-width-15">
                            <h3 className="heading--h3">Note title</h3><br />
                            <input type="text" className="input--text" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Enter note title" />
                        </div><br /><br />
                        <div className="col-width-15">
                            <h3 className="heading--h3">Note title</h3><br />
                            <input type="text" className="input--text" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} placeholder="Enter note title" />
                        </div><br /><br />
                        <div className="col-width-15">
                            <button>
                                <span className="primary-add-button border--none border--smooth bg-secondary-light text-secondary" onClick={() => deleteNote(note.nid)}>
                                    Confirm delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NoteView;