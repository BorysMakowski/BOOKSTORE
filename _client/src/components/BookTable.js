import React, {Component} from "react"
import BookTableRow from "./BookTableRow"


export default class BookTable extends Component 
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
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.books.map((book) => <BookTableRow key={book._id} book={book}/>)}
                </tbody>
            </table>      
        )
    }
}