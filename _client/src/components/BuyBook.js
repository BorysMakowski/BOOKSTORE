import React, {Component} from "react"
import PaypalButton from 'react-paypal-express-checkout'
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, SANDBOX_CLIENT_ID} from "../config/global_constants"
import axios from "axios"


export default class BuyBook extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            stock : ''
        }
    }
    onSuccess = paymentData =>
    {      
        console.log("PayPal payment was successful:", paymentData) 


        axios.get(`${SERVER_HOST}/stock/${this.props.match.params.id}`)
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
                    this.setState({
                        stock: res.data.stock,
                        
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })

        const stockObject = {
            stock: this.state.stock - 1
        }

        axios.put(`${SERVER_HOST}/stock/${this.props.match.params.id}`, stockObject)
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
                    console.log(`Record updated`)
                    this.setState({redirectToDisplayAllBooks:true})
                }
            }
            else
            {
                console.log(`Record not updated`)
            }
        })
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