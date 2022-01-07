import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class BookTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.price}</td>
                <td><img src = {this.props.book.thumbnailUrl} alt="Thumbnail not found"/></td>
                <td>{this.props.book.authors}</td>
                <td>
                    {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.book._id}>Edit</Link> : null}
                    
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCar/" + this.props.book._id}>Delete</Link> : null}   
                </td>
            </tr>
        )
    }
}