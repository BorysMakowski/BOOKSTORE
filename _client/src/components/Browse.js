import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import BookTable from "./BookTable"
import CheckboxList from "./CheckboxList"
import Navbar from './Navbar'

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
   

   <Navbar></Navbar>
   
                
                <div>
<div class="accordion" id="accordionExample" style={{borderRadius:"7px", margin:"10px", textAlign:'left'}}>
  <div class="card" style={{background: "#dadada", borderColor: "#dadada"}}>
    <div class="card-header" id="headingOne" style={{background: "#dadada", borderColor: "#dadada"}}>
      <h2 class="mb-0">
        <button class="btn" type="button" class="btn btn-outline-secondary" data-toggle="collapse" data-target="#collapseOne" 
        aria-expanded="true" aria-controls="collapseOne" style={{margin:"5px"}}>
          Filters
        </button>
        <button class="btn" type="button" class="btn btn-outline-secondary" style={{margin:"5px"}}>
          Clear Filters
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
      Category: <CheckboxList id={"select_cat"}data={this.state.categories} /> 
      <button type="button" style={{margin:"5px"}} class="btn btn-outline-secondary" onClick={this.handleCategoryFilterButton}>Apply</button><br/>
      </div>
    </div>
  </div>
  <div class="card" style={{background: "#dadada", borderColor: "#dadada"}}>
    <div class="card-header" id="headingTwo" style={{background: "#dadada", borderColor: "#dadada"}}>
      <h2 class="mb-0">
        <button class="btn" type="button" class="btn btn-outline-secondary" data-toggle="collapse" data-target="#collapseTwo" 
        aria-expanded="false" aria-controls="collapseTwo" style={{margin:"5px"}}>
        Sort by
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
      Price: <select style={{width:'20%'}} id="select_price">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="ascending">Ascending</option>
                            <option  value="descending">Descending</option>
                    </select>   <button style={{margin:"5px"}} type="button" class="btn btn-outline-secondary" onClick={this.handlePriceFilterButton}>Apply</button> <br/>
                    Title: <select style={{width:'20%'}} id="select_title">
                    <option value="" selected disabled hidden>Choose here</option>
                            <option  value="ascending">A-Z</option>
                            <option  value="descending">Z-A</option>
                    </select>
                    <button style={{margin:"5px"}} type="button" class="btn btn-outline-secondary" onClick={this.handleTitleFilterButton}>Apply</button>
      </div>
    </div>
  </div>
</div>
                    

                    <BookTable books={this.state.books} /> 
                            

                </div>
            </div> 
        )
    }
}