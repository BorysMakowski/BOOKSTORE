import React, {Component} from "react"
import CheckBoxElement from "./CheckBoxElement"

export default class CarTable extends Component 
{
    render() 
    {
        console.log(this.props.data)
        return (
                <select>
                    {this.props.data.map((element) => <CheckBoxElement element={element}/>)}
                </select>
     
        )
    }
}