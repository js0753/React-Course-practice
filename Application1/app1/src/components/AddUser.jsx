import classes from './AddUser.module.css';
import { useState } from 'react';
import Modal from './Modal';
function AddUser({onAddUser}){
    const [enteredUsername,setEnteredUsername] = useState(null);
    function nameChangeHandler(event){
        setEnteredUsername(event.target.value);
    }
    const [enteredAge,setEnteredAge] = useState(null);
    function ageChangeHandler(event){
        setEnteredAge(event.target.value);
    }
    const [negativeAlert,setNegativeAlert] = useState(false);
    const [emptyAlert,setEmptyAlert] = useState(false);

    function submitHandler(event){
        event.preventDefault();
        if(enteredAge==null || enteredUsername == null) setEmptyAlert(true);
        else if(enteredAge<0) {
            setNegativeAlert(true);
            console.log(negativeAlert);
        }
        else{
        const userData = {
            username: enteredUsername,
            age: enteredAge
        }
        console.log(userData);
        onAddUser(userData);
    }
    setEnteredUsername(null);
    setEnteredAge(null);
    document.getElementById('username').value = null;
    document.getElementById('age').value = null;
    }
    function closeNegativeModal(){
        setNegativeAlert(false);
    }
    function closeEmptyModal(){
        setEmptyAlert(false);
    }
 return (
    <div>
    {negativeAlert && <Modal onClose={closeNegativeModal}>
        <div>
            <p>Age cannot be negative.</p>
        </div>
    </Modal>}
    {emptyAlert && <Modal onClose={closeEmptyModal}>
        <div>
            <p>Fields cannot be empty.</p>
        </div>
    </Modal>}
    <form className={classes.form} onSubmit={submitHandler}>
        <p>
            <label htmlFor='username' >Username</label>
            <input id="username" name="username" onChange={nameChangeHandler}/>
            <label htmlFor='age' >Age (Years)</label>
            <input id="age" name="age" onChange={ageChangeHandler} />
            <button className={classes.submit} >Add User</button>
        </p>
    </form>
    </div>
 );
}

export default AddUser;