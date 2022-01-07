import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",    
            isRegistered:false
        } 
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        axios.defaults.withCredentials = true // needed for sessions to work
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully registered
                { 
                    console.log("User registered and logged in")
                    
                    sessionStorage.name = res.data.name
                    sessionStorage.accessLevel = res.data.accessLevel
                    
                    this.setState({isRegistered:true})
                }        
            }
            else
            {
                console.log("Registration failed")
            }
        })   
    }


    render() 
    {     
        return (


<div class="d-flex justify-content-center" style={{height: "100vh"}}>







<div class="card text-center align-self-center my-auto bg-light border-dark"  style={{padding:"10vh"}}>
  <div class="card-body">
    <h2 class="card-title">New User Registration</h2>
    <form noValidate = {true} id = "loginOrRegistrationForm">
           
           {this.state.isRegistered ? <Redirect to="/DisplayAllBooks"/> : null} 
       

      
           <input  style={{margin: 5}}
               name = "name"              
               type = "text"
               placeholder = "Name"
               autoComplete="name"
               value = {this.state.name}
               onChange = {this.handleChange}
               ref = {(input) => { this.inputToFocus = input }} 
           /><br/>           

       <input  style={{margin: 5}}
               name = "email"              
               type = "email"
               placeholder = "Email"
               autoComplete="email"
               value = {this.state.email}
               onChange = {this.handleChange}
           /><br/>              

       <input  style={{margin: 5}}
               name = "password"           
               type = "password"
               placeholder = "Password"
               autoComplete="password"
               title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
               value = {this.state.password}
               onChange = {this.handleChange}
           /><br/>           

           <input  style={{margin: 5}} 
               name = "confirmPassword"    
               type = "password"
               placeholder = "Confirm password"
               autoComplete="confirmPassword"
               value = {this.state.confirmPassword}
               onChange = {this.handleChange}
           /><br/>
           



           <Link class="btn btn-outline-success" onClick={this.handleSubmit} style={{margin: 5}}>Register</Link>   
                
                <Link class="btn btn-outline-danger" to={"/DisplayAllBooks"} style={{margin: 5}}>Cancel</Link>    

       </form>
    <p class="card-text">Or <a href="/Login" class="text-decoration-none">login</a> if you have an existing account</p>
  </div>
</div>
</div>
        )
    }
}