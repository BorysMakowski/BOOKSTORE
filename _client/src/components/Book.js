import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import BookTable from "./BookTable"
import Logout from "./Logout"
import BuyBook from "./BuyBook"

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
            categories: ``
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
                    console.log(res.data)
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
    }
  
    render() 
    {   
        return (           
            <div className="form-container">
   

        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{borderRadius:"7px", margin:"10px"}}>
        <Link class="navbar-brand" to={"/DisplayAllBooks"}>BooBook</Link> 
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMenu">
            <ul class="navbar-nav">
            <li class="nav-item">
                    <Link class="nav-link" to={"/Bestsellers"}>Bestsellers</Link> 
            </li>
            <li class="nav-item">
                    <Link class="nav-link" to={"/Browse"}>Browse</Link>
            </li>
            </ul>

            <ul class="nav navbar-nav mx-auto">
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"></input>
                <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
            <br></br>
            </form>
            </ul>

            <ul class="nav navbar-nav navbar-right ml-auto" >
           
                            {sessionStorage.accessLevel ==  ACCESS_LEVEL_GUEST ? 
                                 <li class="nav-link active">Hello, guest!</li>
                            :
                                <li class="nav-link active" >Hello, {sessionStorage.name}!</li> 
                            }   
                            {sessionStorage.accessLevel ==  ACCESS_LEVEL_GUEST ? 
                                 <li class="nav-item" ><Link class="nav-link" to={"/Login"}>Login</Link></li>
                            :
                                <li class="nav-item" ><Link class="nav-link" to={"/Account"}>Account</Link></li>
                            }
                            {sessionStorage.accessLevel ==  ACCESS_LEVEL_GUEST ? 
                                 <li class="nav-item" > <Link class="nav-link" to={"/Register"}>Register</Link></li> 
                            :
                            <li class="nav-item" ><Link class="nav-link" to={"/Logout"}>Logout</Link> </li>
                            }
                            </ul>
        </div>
        </nav>
   
<br></br><br></br><br></br>

            <div class="row">
                <div class="col">
                    <img src = {this.state.thumbnailUrl} alt="Thumbnail not found" class="rounded mx-auto d-block"></img>
                </div>
                <div class="col">
                    <h1>{this.state.title}</h1>
                    <p>Authors: {this.state.authors}</p>
                    <br></br>
                    <h>Buy now for {this.state.price} €</h>
                    <BuyBook price={this.state.price}/>
                </div>
                <div class="col">
                    <p>Categories: {this.state.categories}</p>
                    <p>ISBN: {this.state.isbn}</p>
                    <p>Page count: {this.state.pageCount}</p>
                    <p>Publish date: {this.state.publishedDate}</p>
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
            </div> 
        )
    }
}