import React from 'react'

function InputField(props) {
    return (
        <div className="inputField">
            <form onSubmit={props.handleSubmit}>
                <label>Username</label><br/>
                <input type="text" name="username" placeholder="username" required onChange={props.handleChange}/><br/>
                <label>Password</label><br/>
                <input type="password" name="password" placeholder="password" required onChange={props.handleChange}/><br/>
                <button onSubmit={props.handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default InputField
