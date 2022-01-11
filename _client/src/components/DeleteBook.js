import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteBook extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllBooks:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.defaults.withCredentials = true // needed for sessions to work

        axios.delete(`${SERVER_HOST}/books/${this.props.match.params.id}`)
        .then(res => 
        {
            
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                { 
                    console.log("Record deleted")
                }
                this.setState({redirectToDisplayAllBooks:true})
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirectToDisplayAllBooks ? <Redirect to="/DisplayAllBooks"/> : null}                      
            </div>
        )
    }
}