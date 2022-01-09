import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class CheckBoxElement extends Component 
{    
    render() 
    {  
       
        return (

                <option value={this.props.element}>{this.props.element} </option>

        )
    }
}