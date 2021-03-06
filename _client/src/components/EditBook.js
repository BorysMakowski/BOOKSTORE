import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import Navbar from './Navbar'
import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditBook extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            _id: ``,
            price: ``,
            title: ``,
            isbn: ``,
            pageCount: ``,
            publishedDate: ``,
            thumbnailUrl: ``,
            shortDescription: ``,
            longDescription: ``,
            status: ``,
            authors: ``,
            categories: ``,
            redirectToDisplayAllBooks:sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }

    componentDidMount() 
    {      
        console.log(this.props.match.params.id)

        axios.defaults.withCredentials = true // needed for sessions to work
        axios.get(`${SERVER_HOST}/books/${this.props.match.params.id}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    this.setState({
                        _id: res.data._id,
                        price: res.data.price,
                        title: res.data.title,
                        isbn: res.data.isbn,
                        pageCount: res.data.pageCount,
                        publishedDate: res.data.publishedDate,
                        thumbnailUrl: res.data.thumbnailUrl,
                        shortDescription: res.data.shortDescription,
                        longDescription: res.data.longDescription,
                        status: res.data.status,
                        authors: res.data.authors.join(", "),
                        categories: res.data.categories
                        
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()


        const bookObject = {
            price: this.state.price,
            title: this.state.title,
            isbn: this.state.isbn,
            pageCount: this.state.pageCount,
            publishedDate: this.state.publishedDate,
            thumbnailUrl: this.state.thumbnailUrl,
            shortDescription: this.state.shortDescription,
            longDescription: this.state.longDescription,
            status: this.state.status,
            authors: this.state.authors,
            categories: this.state.categories
        }
  

        axios.defaults.withCredentials = true // needed for sessions to work
        axios.put(`${SERVER_HOST}/books/${this.props.match.params.id}`, bookObject)
        .then(res => 
        {             
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {      
                    console.log(`Record updated`)
                    this.setState({redirectToDisplayAllBooks:true})
                }
            }
            else
            {
                console.log(`Record not updated`)
            }
        })
    }


    render() 
    {
        return (
            <div className="form-container">
    <Navbar></Navbar>
                {this.state.redirectToDisplayAllBooks ? <Redirect to="/DisplayAllBooks"/> : null}  
               
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="pageCount">
                        <Form.Label>Page count</Form.Label>
                        <Form.Control type="number" name="pageCount" value={this.state.pageCount} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="publishedDate">
                        <Form.Label>Publish date</Form.Label>
                        <Form.Control type="date" name="publishedDate" value={this.state.publishedDate} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="isbn">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="number" name="isbn" value={this.state.isbn} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="thumbnail">
                        <Form.Label>Thumbnail url</Form.Label>
                        <Form.Control type="text" name="isbn" value={this.state.thumbnailUrl} onChange={this.handleChange} />
                    </Form.Group>
                    

                    <Form.Group controlId="shortDescription">
                        <Form.Label>Short description</Form.Label>
                        <Form.Control type="text" name="shortDescription" value={this.state.shortDescription} onChange={this.handleChange} />
                    </Form.Group>


                    <Form.Group controlId="longDescription">
                        <Form.Label>Long description</Form.Label>
                        <Form.Control type="text" name="longDescription" value={this.state.longDescription} onChange={this.handleChange} />
                    </Form.Group>


                    <Form.Group controlId="authors">
                        <Form.Label>Authors</Form.Label>
                        <Form.Control type="text" name="authors" value={this.state.authors} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="categories">
                        <Form.Label>Categories</Form.Label>
                        <Form.Control type="text" name="categories" value={this.state.categories} onChange={this.handleChange} />
                    </Form.Group>

                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllBooks"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}