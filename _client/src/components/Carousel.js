import React, {Component} from "react"
import CarouselCard from "./CarouselCard"


export default class Carousel extends Component 
{
    render() 
    {
        return (  
            <div id="carouselControlls" class="carousel slide" data-ride="carousel" data-interval="4000">
              <div class="carousel-inner" style={{borderRadius:"7px", margin:"10px", height:"30vh", align:"center"}}>
                
                {this.props.books.map((book, i) => <CarouselCard key={book._id} book={book} i={i}/>)}





              </div>
              <a class="carousel-control-prev" href="#carouselControlls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselControlls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
        )
    }
}