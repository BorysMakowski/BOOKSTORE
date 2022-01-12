import React, {Component} from "react"
import PaypalButton from 'react-paypal-express-checkout'
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, SANDBOX_CLIENT_ID} from "../config/global_constants"


export default class BuyBook extends Component 
{
    onSuccess = paymentData =>
    {      
        console.log("PayPal payment was successful:", paymentData) 
    }
    
    
    onError = errorData => 
    {
        console.log("PayPal error:", errorData)       
    }
    
    
    onCancel = cancelData => 
    {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        console.log("Payment cancelled by user:", cancelData)    
    }
    
    
    render() 
    {            
        const environment = "sandbox"  // must be either "sandbox" or "production"
        
        const client_id = {sandbox: SANDBOX_CLIENT_ID}

                
        return (                        
            <PaypalButton 
                env = {environment}
                client = {client_id}
                disabled = {this.props.disabled}
                currency = "EUR"
                total = {this.props.price}
                
                onSuccess = {this.onSuccess}
                onError = {this.onError}               
                onCancel = {this.onCancel}                   
            
                style={{size: "small", color: "blue"}}
            />
        )
    }
}	