import React, {Component} from "react"
import {Link} from "react-router-dom"

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
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link class="btn btn-outline-danger" style={{padding:'40%'}}to={"/DeleteBook/" + this.props.book._id}>DELET</Link> : null}   
                </td>
               
             
        }
            </tr>
        )
    }
}