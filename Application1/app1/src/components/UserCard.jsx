import classes from './UserCard.module.css';

function UserCard({name,age}){
    console.log(name);
    return <>
    <div className={classes.card}>
        <p className={classes.details}>{name} {age}</p>
    </div>
    </>
}

export default UserCard;