import React, { Component } from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class ResetPassword extends Component {
    state={
        email:''
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    formSubmit=(e)=>{
        e.preventDefault()
        axios.post('/password_reset',this.state)
        .then(data=>{
            alert(data.data.data)
            console.log(data.data.data)
        })           
    }
    render() {
    return (
    <div>
      <Navbar/>
      <section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form">
        <form onSubmit={this.formSubmit}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Customer Reset Password Form</h2>
            <p style={{paddingLeft:'20px',paddingRight:'20px'}}>Please enter email address that you use on the time of registration on this website</p>
            </div>
            <div class="form-group">
                <input type="email" class="form-control item" name="email" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>    
            <div class="form-group">
            <button class="btn btn-block create-account">Reset Now</button>
            </div>
            <p className="text-center"> Already have an account? <Link to="/login">Log in Now</Link></p>
           <p className="text-center"> Not have an account yet? <Link to="/signup">Create an account</Link></p>
        </form>
    </div>
    </section>
</div>
    )
    }
}
