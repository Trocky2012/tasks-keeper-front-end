import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Note from "./Note";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Section(props) {

    const [notes, setNotes] = useState([]);

    /* const loadDataOnlyOnce = () => {
      setNotes(props.notes);
    } */

    useEffect(() => setNotes(props.notes), [props.notes]);

    function handleClick() {
      props.onDelete(props.id);
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
              return (noteItem.id !== id);
            });
        });
        props.onNotesDelete(id);
    }

    return (
      <div className="section"  
            style={{color: (props.title==="Done / Deleted" ? '#BDBFBD' : '#333'), }}
      >
        {notes.length < 1 ? 
        <Popup trigger={<button ><DeleteIcon /></button>}
            position="right center">
            <div >Delete this section?</div>
            <button onClick={handleClick}>Delete</button>
        </Popup>
        : 
        <Popup trigger={<button ><DeleteIcon /></button>}
            position="right center">
            <div >You still have tasks associated to this section</div>
            {/* <button>Delete</button> */}
        </Popup>
        }
        
        <h1>{props.title}</h1>
            {(notes).sort((a, b) => new Date(...a.date.split('-').reverse()) - new Date(...b.date.split('-').reverse()))
                            .map((noteItem, index) => {
                return (
                    <Note
                        key={noteItem.id}
                        id={noteItem.id}
                        date={noteItem.date}
                        title={noteItem.title}
                        content={noteItem.content}
                        section={noteItem.section}
                        sectionTitle={noteItem.sectionTitle}
                        onDelete={deleteNote}
                    />
                );
            })}
        

      </div>
    );
  }
  
  export default Section;