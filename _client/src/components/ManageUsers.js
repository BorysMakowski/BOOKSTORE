import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import UserTable from "./UserTable"
import Logout from "./Logout"
import Navbar from './Navbar'
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class ManageUsers extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            users:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.get(`${SERVER_HOST}/users`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")   
                    console.log(res.data)
                    this.setState({users: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

  
    render() 
    {   
        return (           
            <div className="form-container">
   

        <Navbar></Navbar>
   

               {/*<div className="table-container">*/}
               <div>
                    <UserTable users={this.state.users} /> 
                  
                </div>
            </div> 
        )
    }
}