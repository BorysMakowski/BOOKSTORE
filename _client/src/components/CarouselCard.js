import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class CarouselCard extends Component 
{
    render() 
    {
        
        return (  


            
                <div class= {this.props.i === 0 ? "carousel-item active" : "carousel-item"}>
                    <Link to={"/Book/" + this.props.book._id}>
                  <img style={{margin:"auto"}} class="d-block w-10" src={this.props.book.thumbnailUrl} alt={this.props.book.title}></img>
                  </Link>
                  <div class="carousel-caption d-none d-md-block" style={{position:"relative", left:"auto", right:"auto"}}>
                      
                      <h5 style={{color:"#666666"}}>{this.props.book.title}</h5>
                      <p style={{color:"#666666"}}>{this.props.book.authors.join(", ")}</p>
                      
                    </div>
                </div>

        )
    }
}
