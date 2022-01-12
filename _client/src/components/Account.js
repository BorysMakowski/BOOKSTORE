import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import Navbar from './Navbar'
import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class Account extends Component
{
    constructor(props)
    {
        console.log(localStorage)
        super(props)

        this.state = {
           name : '',
           email : '',
           address : '',
           phoneNumber :'',

        }
    }

    componentDidMount() 
    {      
        console.log(sessionStorage.email)
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.get(`${SERVER_HOST}/users/${sessionStorage.email}`)
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
                    this.setState({
                        name:res.data.name,
                        email:res.data.email
                        
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })
    }

 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const userObject = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            phoneNumber : this.state.phoneNumber,
        }
  

        axios.defaults.withCredentials = true // needed for sessions to work

        axios.put(`${SERVER_HOST}/users/${this.state.email}`, userObject)
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
                    console.log(`Record updated`)
                    this.setState({redirectToDisplayAllBooks:true})
                }
            }
            else
            {
                console.log(`Record not updated`)
            }
        })
    }


    render()
    {        
        return (
            <div className="form-container"> 
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}         
                <Navbar></Navbar>                                   
                <h1>Your account</h1>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="pageCount">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="publishedDate">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                    </Form.Group>

                   

                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayAllBooks"}>Go back</Link>
                </Form>
            </div>
        )
    }
}