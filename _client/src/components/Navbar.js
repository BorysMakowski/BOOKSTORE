import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class Navbar extends Component 
{
    render() 
    {
        return (
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
                            
            {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?    
                             <li class="nav-item" ><Link className="nav-link" to={"/AddBook"}>Add book</Link></li>
                    :
                        null
            }
            {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?    
                             <li class="nav-item" ><Link className="nav-link" to={"/ManageUsers"}>Manage users</Link></li>
                    :
                        null
            }
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
        )
    }
}