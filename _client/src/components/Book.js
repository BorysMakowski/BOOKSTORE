import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import BookTable from "./BookTable"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


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
                        authors: res.data.authors,
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
   

             <p>{this.state.price}</p>
             <p>{this.state.title}</p>
             <p>{this.state.isbn}</p>
             <p>{this.state.pageCount}</p>
             <p>{this.state.publishedDate}</p>
             <img src = {this.state.thumbnailUrl} alt="Thumbnail not found"></img>
             <p>{this.state.shortDescription}</p>
             <p>{this.state.longDescription}</p>
             <p>{this.state.shortDescription}</p>
             <p>{this.state.status}</p>
             <p>{this.state.authors}</p>
             <p>{this.state.categories}</p>

            </div> 
        )
    }
}