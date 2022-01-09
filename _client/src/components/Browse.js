import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import BookTable from "./BookTable"
import CheckboxList from "./CheckboxList"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class Browse extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            books:[],
            categories:[],
        }
    }
    
    
    componentDidMount() 
    {
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.get(`${SERVER_HOST}/books`)
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
                    console.log("Records read")   
                    console.log(res.data)
                    this.setState({books: res.data}) 
                    let categories = this.state.books.map(book => book.categories)
                    let uniqueCategories = new Set()

                    categories.forEach(categoryArray =>{
                        categoryArray.forEach(category =>[
                            uniqueCategories.add(category)
                        ])
                    })
                    uniqueCategories = Array.from(uniqueCategories)
              
                    this.setState({categories: uniqueCategories})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }


    applyCategoryFilter = (filter) =>{
        let array = [...this.state.books]
        let result = []
   
            console.log("filter: " + filter)
            for(let i=0; i<array.length; i++){
  /*              let authors = array[i].authors

                for(let j=0; j<authors.length; j++){
                    console.log("author: " + authors[j] + j)
                    if(authors[j] == filter){
                        result.push(array[i])
                    }
                }*/
                let categories = array[i].categories
                for(let j=0; j<categories.length; j++){
                    if(categories[j] == filter)
                    result.push(array[i])
                }
            
            }
        console.log(array)
        this.setState({books: result}) 
        
    }

    handleCategoryFilterButton = () =>{
        let cat = document.getElementById("select_cat")
        cat = cat.value
        this.applyCategoryFilter(cat)
    }

    handlePriceFilterButton = () =>{
        let price = document.getElementById("select_price")
        price = price.value
        let array = [...this.state.books]

        if(price == "ascending"){
            array.sort((a, b) => (a.price > b.price ? 1 : -1))
        }
        else if(price=="descending"){
            array.sort((a, b) => (a.price > b.price ? -1 : 1))
        }
        this.setState({books: array})
    }
    handleTitleFilterButton = () =>{
        let title = document.getElementById("select_title")
        title = title.value
        let array = [...this.state.books]

        if(title=="ascending"){ 
             array.sort((a, b) => (a.title > b.title ? 1 : -1))
        } else if(title=="descending"){
            array.sort((a, b) => (a.title > b.title ? -1 : 1))
        }

        this.setState({books: array})
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
   
                
                <div className="table-container">
                    
                    <div style={{backgroundColor:'#b0b0b0', padding:'3%', borderRadius:20, textAlign:'right'}}> 
                    <h5 style={{textAlign:'left'}}>Filters</h5>
                    Category: <CheckboxList id={"select_cat"}data={this.state.categories} /> <button type="button" class="btn btn-light" onClick={this.handleCategoryFilterButton}>Apply</button><br/>
                    Price: <select style={{width:'20%'}} id="select_price">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="ascending">Ascending</option>
                            <option  value="descending">Descending</option>
                    </select>   <button type="button" class="btn btn-light" onClick={this.handlePriceFilterButton}>Apply</button> <br/>
                    Title: <select style={{width:'20%'}} id="select_title">
                    <option value="" selected disabled hidden>Choose here</option>
                            <option  value="ascending">A-Z</option>
                            <option  value="descending">Z-A</option>
                    </select>
                    <button type="button" class="btn btn-light" onClick={this.handleTitleFilterButton}>Apply</button>
                    <br/>

                    </div>
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