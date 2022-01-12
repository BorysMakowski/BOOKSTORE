import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import BookTable from "./BookTable"
import Logout from "./Logout"
import BuyBook from "./BuyBook"
import Navbar from './Navbar'

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, SANDBOX_CLIENT_ID} from "../config/global_constants"



export default class Book extends Component 
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
            stock:``
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
            { {/*
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
            else */}
                { 

                    if(res.data.publishedDate)
                    {
                        this.setState({
                            _id: res.data._id,
                            price: res.data.price,
                            title: res.data.title,
                            isbn: res.data.isbn,
                            pageCount: res.data.pageCount,
                            publishedDate: res.data.publishedDate.substring(0,10),
                            thumbnailUrl: res.data.thumbnailUrl,
                            shortDescription: res.data.shortDescription,
                            longDescription: res.data.longDescription,
                            status: res.data.status,
                            authors: res.data.authors.join(", "),
                            categories: res.data.categories
                            
                        })
                    }
                    else
                    {
                        this.setState({
                            _id: res.data._id,
                            price: res.data.price,
                            title: res.data.title,
                            isbn: res.data.isbn,
                            pageCount: res.data.pageCount,
                            publishedDate: '2000-03-12',
                            thumbnailUrl: res.data.thumbnailUrl,
                            shortDescription: res.data.shortDescription,
                            longDescription: res.data.longDescription,
                            status: res.data.status,
                            authors: res.data.authors.join(", "),
                            categories: res.data.categories
                            
                        })
                    }

                    

                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })

        axios.get(`${SERVER_HOST}/stock/${this.props.match.params.id}`).then(stock_res => {   
          console.log(stock_res.data)
            if(stock_res.data){
              this.setState({
                stock : stock_res.data.stock
              })
            }

        })

    }
  
    render() 
    {   
        return (           
            <div className="form-container">
   

<Navbar></Navbar>
   
<br></br><br></br><br></br>

            <div class="row">
                <div class="col-md-auto">
                    <img src = {this.state.thumbnailUrl} alt="Thumbnail not found" class="rounded mx-auto d-block"></img>
                </div>
                <div class="col">
                    <h1>{this.state.title}</h1>
                    <p>Authors: {this.state.authors}</p>
                    <br></br>
                    <p>Buy now for {this.state.price} €</p>
                    {this.state.stock != 0 ? <BuyBook price={this.state.price} id={this.state._id}/>: <button type="button" class="btn btn-info disabled">Currently unavaiable</button>}
                    
                </div>
                <div class="col">
                    <p>Categories: {this.state.categories}</p>
                    <p>ISBN: {this.state.isbn}</p>
                    <p>Page count: {this.state.pageCount}</p>
                    <p>Publish date: {this.state.publishedDate}</p>
                    <p>In stock: {this.state.stock}</p>
                  
                </div>
            </div>

            

<br></br><br></br>
<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Short description
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
      {this.state.shortDescription}
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Long description
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
      {this.state.longDescription}
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col">
    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link class="btn btn-outline-info" to={"/EditBook/" + this.state._id} style={{margin:"5px"}}>Edit</Link> : null}

    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link class="btn btn-outline-danger" to={"/DeleteBook/" + this.state._id} style={{margin:"5px"}}>Delete</Link> : null} 
    </div>
  </div>
</div>

 

            </div> 
        )
    }
}