import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import CreateSection from "./CreateSection";
import Section from "./Section";

const URL = 'http://localhost:8080/';

function App() {
  const DONE = "Done / Deleted";
  const [notes, setNotes] = useState([]);
  const [sections, setSections] = useState([]);
  const [user,setUser] = useState();
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  function getFormattedDate(d){
    const day = d.getDate().toString();
      const numbMonth = (d.getMonth()+1);
      var month="";
      if(numbMonth>9)
        month = (numbMonth).toString();
      else
        month = "0"+(numbMonth).toString();
    const year = d.getFullYear().toString();
    return(year+"-"+month+"-"+day);
  }

  function addNote(newNote) {
    if(newNote.title!==""){
      if(newNote.date===""){
        newNote.date=getFormattedDate(new Date());
      }
      if(isLoggedIn){
        const whichSection = sections.filter(sections => (sections.title) === newNote.sectionTitle);
        const newApiNote = JSON.stringify(
          { 
            "userId": user.id,
            "title": newNote.title,
            "content": newNote.content,
            "sectionTitle": newNote.sectionTitle,
            "date": newNote.date,
            "tkSection": {
                "id": whichSection[0].id
            }
          });
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        axios.post(URL+'tknote', newApiNote, customConfig)
      }
        
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });


    }else{
      alert("Please, set your new task.")
    }
  }

  function deleteNote(id) {
    if(isLoggedIn){
      axios.delete(URL+'tknote/'+id+'/m$s*a')
    }
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });
  }

  function addSection(newSection) {
    
    if(newSection.title!==""){
      if(isLoggedIn){
        const newApiSection = JSON.stringify(
          { 
            "title": newSection.title,
            "tkUser": {
                "id": user.id
            }
          });
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        axios.post(URL+'tksection', newApiSection, customConfig)
      }
      setSections(prevSections => {
        return [...prevSections, newSection];
      });
    }else{
      alert("Please, give a name to this new section.")
    }
  }
  function deleteSection(id) {
    if(isLoggedIn){
      axios.delete(URL+'tksection/'+id+'/m$s*a')
    }
    setSections(prevSections => {
      return prevSections.filter((sectionItem, index) => {
        return sectionItem.id !== id;
      });
    });
  }


  async function getUser(email, password){
      await axios
         .get(URL+'tkuser/find-by-email?email='+email+'&pssd='+password)
         .then((response) => {
            setUser(response.data);
         })
         .catch((err) => {
            console.log(err);
         });

      if(user.fName.length > 1){
        setSections(user.sections);
        //if((user.email).includes('.com')){
          axios
          .get(URL+'tknote/find-by-user-id/'+user.id)
          .then((response) => {
            setNotes(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        //}
        setIsLoggedIn(true) 
      }else{
        alert("Please, check your credentials. User not found.\n")
      }
  }



  return (
    <div>
      <div style={{flexDirection:"row"}}>
        <Header getUser={getUser}/>
        {/* {isLoggedIn ? <p> {user.email} </p>: ""} */}
        
        <CreateSection onAdd={addSection} />
      </div>
        <CreateArea onAdd={addNote} sections={sections}/>
        
        {/* <Section 
          key={DONE}
          id={DONE}  
          title={DONE}
          notes={notes.filter(notes => notes.section === DONE)}
        /> */}

      {sections.map((SectionItem, index) => {
        return (
          <Section 
            key={SectionItem.id}
            id={SectionItem.id}  
            title={SectionItem.title}
            notes={notes.filter(notes => (notes.sectionTitle) === SectionItem.title)}
            onDelete={deleteSection}
            onNotesDelete={deleteNote}
          />
        );
      })}

      {/* {notes.map((noteItem, index) => {
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
      })} */}
      
      <Footer />
    </div>
  );
}

export default (App);
