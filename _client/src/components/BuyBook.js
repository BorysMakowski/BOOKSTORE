import React, {Component} from "react"
import PaypalButton from 'react-paypal-express-checkout'
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, SANDBOX_CLIENT_ID} from "../config/global_constants"
import axios from "axios"
import PayPalMessage from "./PayPalMessage"
import {Redirect} from "react-router-dom"


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

        /* NIE ROBIE NIC Z SERWEREM BO NIE WIEM JESZCZE JAK, NIŻEJ TYLKO OBSŁUGUJE MESYDŻ
        axios.post(`${SERVER_HOST}/sales/${paymentData.paymentID}/${this.props._id}/${this.props.price}/${paymentData.address.recipient_name}/${paymentData.email}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        .then(res => 
        {                   
            this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
                           payPalPaymentID:paymentData.paymentID, 
                           redirectToPayPalMessage:true}) 
        })
        .catch(errorData =>
        {
            console.log("PayPal payment unsuccessful error:", errorData)            
            this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
                           redirectToPayPalMessage:true}) 
        })
*/
this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
    payPalPaymentID:paymentData.paymentID, 
    redirectToPayPalMessage:true}) 

        console.log("PayPal payment was successful:", paymentData) 

/* TUTAJ TBH TO NIE WIEM CO JEST
        axios.get(`${SERVER_HOST}/stock/${this.props.match._id}`)
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
        
        console.log("STOCK: " + this.state.stock)
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
         */ 
    }
    
 
    onError = errorData => 
    {
        console.log("PayPal error:", errorData)
        this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
                       redirectToPayPalMessage:true})         
    }
    
    
    onCancel = cancelData => 
    {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        console.log("Payment cancelled by user:", cancelData)
        this.setState({payPalMessageType:PayPalMessage.messageType.CANCEL, 
                       redirectToPayPalMessage:true})       
    }
    
    render() 
    {            
        const environment = "sandbox"  // must be either "sandbox" or "production"
        
        const client_id = {sandbox: SANDBOX_CLIENT_ID}

        const redirect = `/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalPaymentID}`
                
        return (
            <div>
                {this.state.redirectToPayPalMessage ? <Redirect to= {redirect}/> : null}                        
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
            </div>
        )
    }
}	