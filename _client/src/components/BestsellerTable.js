import React, {Component} from "react"
import BestsellerTableRow from "./BestsellerTableRow"



export default class BestsellerTable extends Component 
{
    render() 
    {
        return (
            <table class="table table-responsive-md">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                        <th>Authors</th>
                        <th colspan="2">Times sold</th>
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.books.map((book) => <BestsellerTableRow key={book._id} book={book}/>)}
                </tbody>
            </table>      
        )
    }
}