import React, {Component} from "react"
import BookTableRow from "./BookTableRow"


export default class Alert extends Component 
{
    render() 
    {
        return (
            <div class="alert alert-success" role="alert">
            <p>{this.props.text}</p>
          </div> 
        )
    }
}