import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import Carousel from "./Carousel"
import Navbar from "./Navbar"

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

export default class DisplayAllBooks extends Component 
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
        let stock_ = []
        let sorted_array = []
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
                        
                        sorted_array = mapOrder(res.data, stock_res.data, '_id')
                        for(let i=0; i<5; i++){
                            result.push(res.data[i])
                        }
                        console.log("RESULT: ")
                        console.log(result)
                        this.setState({books: result}) 
                        console.log(this.state.books[0].thumbnailUrl)
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
        <Navbar></Navbar>
<br></br>

<div class="jumbotron bg-light">
  <div class="container">
  <h1 class="display-4">Welcome to BooBook!</h1>
  <p class="lead">We are proud to present you a wide selection of books on various computer science related topics, since 2022. </p>
  <hr class="my-4"></hr>
  <p><i>Best book store I've ever seen!</i> ~ my mom</p>
  <p><i>This site looks so good on my phone!</i> ~ a guy I met on a bus stop</p>
  <p><i>I don't like this, where are my books, I need them on this site ASAP!</i> ~ Stephen King, allegedly</p>
  <p class="lead">
    <a class="btn btn-outline-secondary btn-lg" href="#" role="button">Browse our books!</a>
  </p>
</div>
</div>
        <Carousel books={this.state.books}/>
   


            </div> 
        )
    }
}