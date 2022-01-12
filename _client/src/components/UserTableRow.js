import React, {Component} from "react"
import {Link} from "react-router-dom"
import Alert from "./Alert"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class UserTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email} </td>


        {<td>
           { console.log(sessionStorage._id)}
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? 
                    sessionStorage.email == this.props.user.email ?<Link class="btn btn-outline-danger disabled" >You can't delete yourself</Link>
                    :<Link class="btn btn-outline-danger"  to={"/DeleteUser/" + this.props.user._id}>Delete</Link> : null}   
        </td>
               
             
        }
            </tr>
        )
    }
}