import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class BestsellerTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.price.toFixed(2)}€</td>
                <td><img src = {this.props.book.thumbnailUrl} alt="Thumbnail not found"/></td>
                <td>{this.props.book.authors.join(", ")}</td>
                <td>{this.props.book.timesSold}</td>
                <td class="align-middle">
                <Link class="btn btn-outline-secondary" to={"/Book/" + this.props.book._id}>Learn More</Link>
                </td>
        {
             
            <td class="align-middle">
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link class="btn btn-outline-info" to={"/EditBook/" + this.props.book._id}>Edit</Link> : null}
                    </td>
        }
        
        {<td class="align-middle">
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link class="btn btn-outline-danger" to={"/DeleteBook/" + this.props.book._id}>Delete</Link> : null}   
                </td>
               
             
        }
            </tr>
        )
    }
}