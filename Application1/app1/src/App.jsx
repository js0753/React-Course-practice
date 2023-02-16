import { useState } from 'react';
import './App.css'
import AddUser from './components/AddUser'
import DisplayUsers from './components/DisplayUsers'
function App() {
  const [userList,setUserList] = useState([]);
  function addUser(newUser){
    setUserList([newUser,...userList]);
  }
  return <>
      <AddUser onAddUser={addUser}/>
      <DisplayUsers users={userList}/>
  </>
}

export default App
