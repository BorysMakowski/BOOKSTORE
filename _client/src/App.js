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
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import DisplayAllBooks from "./components/DisplayAllBooks"
import LoggedInRoute from "./components/LoggedInRoute"
import Bestsellers from "./components/Bestellers"
import Browse from "./components/Browse"
import {ACCESS_LEVEL_GUEST} from "./config/global_constants"

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
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <Route exact path="/Book/:id" component={Book} />  
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    <Route exact path="/Bestsellers" component={Bestsellers}/> 
                    <Route exact path="/Browse" component={Browse}/> 
                    <Route exact path="/DisplayAllBooks" component={DisplayAllBooks}/>  
                    <Route path="*" component={DisplayAllBooks}/>                          
                </Switch>
            </BrowserRouter>
        )
    }
}