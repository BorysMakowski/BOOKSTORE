import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Navbar from "./Navbar"

export default class PayPalMessage extends Component
{      
    static messageType = {SUCCESS:"success", 
                          ERROR:"error", 
                          CANCEL:"cancel"}
    
    constructor(props)
    {
        super(props)
        
        this.state = {redirectToDisplayAllBooks:false,
                      buttonClass:"btn btn-outline-danger btn-lg"}
    }          
    
    
    componentDidMount() 
    {     
        if(this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS)
        {
            this.setState({heading:"PayPal Transaction Confirmation",
                           message:"Your PayPal transaction was successful.", 
                           buttonClass:"btn btn-outline-success btn-lg"})
        }
        else if(this.props.match.params.messageType === PayPalMessage.messageType.CANCEL)
        {
            this.setState({heading:"PayPal Transaction Cancelled",
                           message:"You cancelled your PayPal transaction. Therefore, the transaction was not completed."})            
        }
        else if(this.props.match.params.messageType === PayPalMessage.messageType.ERROR)
        {
            this.setState({heading:"PayPal Transaction Error",
                           message:"An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again."})     
        }
        else
        {
            console.log("The 'messageType' prop that was passed into the PayPalMessage component is invalid. It must be one of the following: PayPalMessage.messageType.SUCCESS, PayPalMessage.messageType.CANCEL or PayPalMessage.messageType.ERROR") 
        }
    }
    
    
    render()
    {                 
        return (



<div className="form-container">
<Navbar></Navbar>
<br></br>

<div class="jumbotron bg-light">
<div class="container">
<h1 class="display-4">{this.state.heading}</h1>
<p class="lead">{this.props.match.params.message}</p>
<hr class="my-4"></hr>
<p>{this.state.message}</p>
{this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS ? <p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p> : null}
                
<p class="lead">

<p id="payPalPaymentIDButton"><Link class={this.state.buttonClass} to={"/DisplayAllBooks"}>Continue</Link></p>


</p>
</div>
</div>




    </div> 
        )
    }
}