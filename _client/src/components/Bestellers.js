import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import BestsellerTable from './BestsellerTable'
import Navbar from './Navbar'

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
            books:[],
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
                        for(let i=0; i<10; i++){
                            result.push({
                                "_id":res.data[i]._id,
                                "title":res.data[i].title,
                                "price":res.data[i].price,
                                "thumbnailUrl":res.data[i].thumbnailUrl,
                                "authors":res.data[i].authors,
                                "timesSold":stock_res.data[i].times_sold
                            })
                        }
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
   

   <Navbar></Navbar>
                
                <div>
                    <BestsellerTable books={this.state.books}/> 
                   
                </div>
            </div> 
        )
    }
}