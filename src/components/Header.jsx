import React, { useState }  from "react";
import StarIcon from "@material-ui/icons/Star";
//import LoginIcon from "@material-ui/icons/LockOpen";

function Header(props) {

  const [isExpanded, setExpanded] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);
  function expand() {
    setExpanded(true);
  }
  function compress() {
    setExpanded(false);
  }

  function handleClick() {
    props.onDelete(props.id);
  }

  function check(event){
    props.getUser(user.email,user.password);
    event.preventDefault();
    setIsPrepared(true);
  }
  function getUser(event) {
    //props.onAdd(note);
    props.getUser(user.email,user.password);
    setUser({
      email: "",
      password:"",
      show_input: false
    });
    compress();
    event.preventDefault();
    setIsPrepared(false);
  }

  //const handleClick = () => alert("Login");
  const [user, setUser] = useState({
    email: "",
    password:"",
    show_input: false
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      };
    });
  }

  return (
    <header>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
        <h1>
          <StarIcon /> &nbsp;
          ASM Tasks
        </h1>
        <div style={{display: 'flex', flexDirection: 'row',justifyContent:'space-evenly'}}>
        <h3 onClick={expand}>
            Login &nbsp; &nbsp; &nbsp; 
        </h3>
          {isExpanded && (
          <input
            name="email"
            onChange={handleChange}
            onClick={expand}
            value={user.email}
            placeholder="email..."
          />)}
          {isExpanded && (
          <input
            type={user.show_input?'text':'password'}
            name="password"
            onChange={handleChange}
            onClick={expand}
            value={user.password}
            placeholder="password..."
          />)}
          {isExpanded && (
          <div className="mt-0" style={{marginLeft:20}}>
            {isPrepared ? 
            <button type="submit" onClick={getUser} className="btn btn-primary">
              Enter
            </button>: 
            <button type="submit" onClick={check} className="btn btn-secondary">
              Check
            </button>
          }
            
          </div>
        )}
        </div>
      </div>
    </header>
  );
}

export default Header;
