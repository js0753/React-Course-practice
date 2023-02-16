import classes from './DisplayUsers.module.css';
import { useState } from 'react';
import UserCard from './UserCard';
function DisplayUsers({users}){
    console.log("Lenght ",users.length);
return (
    users.length>0?<div className = {classes.viewer}>
        {users.map((user) => <UserCard name={user.username} age={user.age}/>)}
    </div>:<></>
);
}

export default DisplayUsers;