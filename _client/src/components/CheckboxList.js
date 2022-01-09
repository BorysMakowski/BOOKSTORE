import React, {Component} from "react"
import CheckBoxElement from "./CheckBoxElement"

export default class CarTable extends Component 
{
    render() 
    {
     
        return (
                <select id={this.props.id} style={{width:'20%'}}>
                    {this.props.data.map((element) => <CheckBoxElement element={element}/>)}
                </select>
     
        )
    }
}