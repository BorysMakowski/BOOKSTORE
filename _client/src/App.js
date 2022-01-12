import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

//import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';


import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddBook from "./components/AddBook"
import EditBook from "./components/EditBook"
import DeleteBook from "./components/DeleteBook"
import DisplayAllCars from "./components/DisplayAllCars"
import DisplayAllBooks from "./components/DisplayAllBooks"
import LoggedInRoute from "./components/LoggedInRoute"
import Bestsellers from "./components/Bestellers"
import Browse from "./components/Browse"
import DeleteUser from "./components/DeleteUser";
import ManageUsers from "./components/ManageUsers";
import {ACCESS_LEVEL_GUEST} from "./config/global_constants"
import Account from "./components/Account"
import Book from "./components/Book"

if (typeof sessionStorage.accessLevel === "undefined")
{
    sessionStorage.name = "GUEST"
    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayAllBooks} />
                    <Route exact path="/Login" component={Login} />
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddBook" component={AddBook} />
                    <LoggedInRoute exact path="/EditBook/:id" component={EditBook} />
                    <Route exact path="/Book/:id" component={Book} />  
                    <LoggedInRoute exact path="/DeleteBook/:id" component={DeleteBook} />
                    <LoggedInRoute exact path="/DeleteUser/:id" component={DeleteUser} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    <Route exact path="/Bestsellers" component={Bestsellers}/> 
                    <Route exact path="/Browse" component={Browse}/> 
                    <Route exact path="/ManageUsers" component={ManageUsers}/> 
                    <Route exact path="/DisplayAllBooks" component={DisplayAllBooks}/>  
                    <Route exact path="/Account" component={Account}/>  
                    <Route path="*" component={DisplayAllBooks}/>                          
                </Switch>
            </BrowserRouter>
        )
    }
}