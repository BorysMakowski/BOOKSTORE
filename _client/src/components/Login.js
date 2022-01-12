import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            email:"",
            password:"",
            isLoggedIn:false
        }
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    
                    sessionStorage.name = res.data.name
                    sessionStorage.email = this.state.email
                    localStorage.token = res.data.token
                    sessionStorage.accessLevel = res.data.accessLevel
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })                
    }


    render()
    {            
        return (
<div class="d-flex justify-content-center" style={{height: "100vh"}}>
<div class="card text-center align-self-center my-auto bg-light border-dark"  style={{padding:"10vh"}}>
  <div class="card-body">
    <h2 class="card-title">Login</h2>
    <form  noValidate = {true} id = "loginOrRegistrationForm">

                {this.state.isLoggedIn ? <Redirect to="/DisplayAllBooks"/> : null} 
                
                <input  style={{margin: 5}} 
                    type = "email" 
                    name = "email" 
                    placeholder = "Email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                /><br/>
                    
                <input style={{margin: 5}}
                    type = "password" 
                    name = "password" 
                    placeholder = "Password"
                    autoComplete="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                /><br/>
                
                <Link class="btn btn-outline-success" onClick={this.handleSubmit} style={{margin: 5}}>Login</Link>   
                
                <Link class="btn btn-outline-danger" to={"/DisplayAllBooks"} style={{margin: 5}}>Cancel</Link>                                      
            </form>
    <p class="card-text">Or <a href="/Register" class="text-decoration-none">make a new account</a> instead</p>
  </div>
</div>
</div>

        )
    }
}
