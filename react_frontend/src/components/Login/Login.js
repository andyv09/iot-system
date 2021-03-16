import React, {useState} from 'react'
import SubmitButton from './SubmitButton'
import InputField from './InputField'



function Login(props) {
    const [userState, setUserState] = useState({username: '', password: ''})


    
    
    function handleSubmit(e){
        e.preventDefault()
        //console.log("Username: ", userState)
        props.tryLogin(useState.username, userState.password);
    }
    
    function handleChange(e){
        const {name,value} = e.target;
        if(name === "username"){
            setUserState({username: value, password: userState.password})
        }
        else if(name === "password"){
            setUserState({username: userState.username, password: value})
        }
    }


    return (
        <div className="loginForm">
            <InputField handleSubmit={handleSubmit} handleChange={handleChange}/>
        </div>
    )
}

export default Login
