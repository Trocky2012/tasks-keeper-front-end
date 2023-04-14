import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

function CreateSection(props) {

  const [section, setSection] = useState({
    title: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setSection(prevSection => {
      return {
        ...prevSection,
        [name]: value
      };
    });
  }

  function submitSection(event) {
    props.onAdd(section);
    setSection({
      title: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-section">
        <input
          name="title"
          onChange={handleChange}
          value={section.title}
          placeholder="New Section"
        />
        <Fab type='submit' onClick={submitSection}>
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
}

export default CreateSection;
