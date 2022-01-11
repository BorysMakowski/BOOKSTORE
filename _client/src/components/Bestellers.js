import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import BookTable from "./BookTable"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

function mapOrder (array, order, key) {
  
    array.sort( function (a, b) {
      var A = a[key], B = b[key];
      
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
      
    });
    
    return array;
  };

export default class Bestsellers extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            books:[]
        }
    }
    
    
    componentDidMount() 
    {
        let result = []
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.get(`${SERVER_HOST}/stock/bestsellers`).then( stock_res => {   
            console.log(stock_res.data)
            axios.get(`${SERVER_HOST}/books`).then(res=>{
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)    
                    }
                    else
                    {           
                        result = res.data
                        mapOrder(result, stock_res.data, '_id')
                        console.log("RESULT: ")
                        console.log(result)
                        this.setState({books: result}) 
                    }   
                }
                else
                {
                    console.log("Record not found")
                }}
                )
        })}
    

  
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
   
                
                <div>
                    <BookTable books={this.state.books} /> 
                        
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                        <div className="add-new-car">
                            <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
                        </div>
                    :
                        null
                    }
                </div>
            </div> 
        )
    }
}