import React, { Component } from 'react'
import axios from 'axios'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Link,Redirect} from 'react-router-dom'

export default class Admin_Profile extends Component {
    state={
        fname:'',
        lname:'',
        uname:'',
        email:'',
        phone:'',
        password:'',
        redirect:null
    }
    formSubmit=(e)=>{
        e.preventDefault();
        fetch('/update_customer_profile',{
             method:'post',
             body:JSON.stringify(this.state),
             headers:{
                 'Content-Type':'application/json',
                 token:Cookies.get('token')
               }
         })
         .then(response=>{
             console.log(response.data)
         })
         this.getInfo();
         alert('Customer Record Updated Successfully!')
   }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount()
    {
       this.getInfo()
    }
    getInfo()
    {
        axios.get('/profile_info',{headers:{token:Cookies.get('token')}})
        .then(response=>{
            console.log(response.data.profile)
            this.setState({
                fname:response.data.profile.fname,
                lname:response.data.profile.lname,
                uname:response.data.profile.uname,
                email:response.data.profile.email,
                phone:response.data.profile.phone,
                password:response.data.profile.password
            })
        })
    }
    render() {
        if(!Cookies.get('token'))
        {
            this.setState({redirect:'/login'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="/login"/>
        }
    return (
        <body class="fixed-navbar">
        <div class="page-wrapper">
        <Menubar name="MYP"/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <div class="registration-form">
        <div className="container">
        <form onSubmit={this.formSubmit}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
        <h2 style={{padding:"0px"}} class="text-center">Customer Information Form</h2>
            </div>
            <div class="form-group">
                <label class="form-label">First Name</label>
                <input type="text" value={this.state.fname} pattern='^[a-zA-Z1-9]+$' class="form-control item" name="fname" minLength="6" title="Username Name Should be at least six characters long and not contain ant space" placeholder="User Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <label class="form-label">Last Name</label>
                <input type="text" value={this.state.lname} pattern='^[a-zA-Z1-9]+$' class="form-control item" name="lname" minLength="6" title="Username Name Should be at least six characters long and not contain ant space" placeholder="User Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <label class="form-label">User Name</label>
                <input type="text" value={this.state.uname} pattern='^[a-zA-Z1-9]+$' class="form-control item" name="uname" minLength="6" title="Username Name Should be at least six characters long and not contain ant space" placeholder="User Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label class="form-label">E-Mail</label>
                <input type="email" value={this.state.email} class="form-control item" name="email" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label class="form-label">Phone No.</label>
                <input type="text" value={this.state.phone} pattern='^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$' title="Phone Number should be +92-349-7462877 in this format" class="form-control item" name="phone" placeholder="Phone Number" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label class="form-label">Password</label>
                <input type="text" value={this.state.password} minlength="8" title="Minimum Length should be 8" class="form-control item" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>   
            <div class="form-group">
            <button class="btn btn-block btn-outline-primary">Update Record</button>
        </div>    
     </form>
     </div>
     </div>
    </div>
    <Footer/>
    </div>
    </div>
    <Setting_Menu/>
</body>
        )
    }
}
