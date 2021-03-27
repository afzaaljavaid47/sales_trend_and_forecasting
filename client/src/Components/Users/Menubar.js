import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Menubar extends Component {
    logOut=()=>{
        Cookies.remove('token')
        this.setState({redirect:'/login'})
    }
    state={
        redirect:null,
        records:[]
    }
    get_Profile_info()
    {
        axios.get('/profile_info',{headers:{token:Cookies.get('token')}})
        .then(responce=>{
            this.setState({records:responce.data.profile})
        })
    }
    componentDidMount()
    {
       this.get_Profile_info()
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to="/login"/>
        }
        return (
    <div>
        <header class="header">
            <div class="page-brand">
                <a class="link" href="/user_panel">
                    <span class="brand">Sales 
                        <span class="brand-tip">&nbsp;Forecasting</span>
                    </span>
                </a>
            </div>
            <div class="flexbox flex-1">
                <ul class="nav navbar-toolbar">
                    <li>
                        <a class="nav-link sidebar-toggler js-sidebar-toggler"><i class="ti-menu"></i></a>
                    </li>
                </ul>
                <ul class="nav navbar-toolbar ">
                    <li class="dropdown dropdown-user">
                        <a class="nav-link dropdown-toggle link" data-toggle="dropdown">
                            <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} />
                    <span></span>{this.state.records.uname}<i class="fa fa-angle-down m-l-5"></i></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="user_profile"><i class="fa fa-user"></i>Profile</a>
                            <li class="dropdown-divider"></li>
                            <Link class="dropdown-item" to="/login" onClick={this.logOut}><i class="fa fa-power-off"></i>Logout</Link>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
        <nav class="page-sidebar fixed" id="sidebar">
            <div id="sidebar-collapse">
                <div class="admin-block d-flex">
                    <div>
                    <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} width="45px"/>
                    </div>                    
                    <div class="admin-info">
                    <div class="font-strong">{this.state.records.uname}</div><small>User Panel</small></div>
                </div>
                <ul class="side-menu metismenu">
                    <li>
                        <a class="active" href="/user_panel"><i class="sidebar-item-icon fa fa-th-large"></i>
                            <span class="nav-label">Dashboard</span>
                        </a>
                    </li>
                    <li class="heading">FEATURES</li>
                    <li>
                        <a class={this.props.name==='GM'?'active':''} href="/guide">
                            <i class="sidebar-item-icon fa fa-book"></i>
                            <span class="nav-label">Guide Manual</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='PRED'?'active':''} href="/user_predictions">
                            <i class="sidebar-item-icon fa fa-cube"></i>
                            <span class="nav-label">Total Predictions</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='UD'?'active':''} href="/upload_data"><i class="sidebar-item-icon fa fa-upload"></i>
                            <span class="nav-label">Upload Data</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='PRE'?'active':''} href="/preview_data"><i class="sidebar-item-icon fa fa-eye"></i>
                            <span class="nav-label">Preview Data</span>
                        </a>
                    </li>
                    <li class="heading"><span style={{textTransform:'uppercase'}}>{this.state.records.category}</span> PREDICTIONS</li>
                    <li>
                        <a class={this.props.name=='sales'?'active':''} href="/sales_forecasting"><i class="sidebar-item-icon fa fa-fighter-jet"></i>
                            <span class="nav-label">Sales Forecasting</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='AFZ'?'active':''} href="/market_basket_analysis"><i class="sidebar-item-icon fa fa-shopping-basket"></i>
                            <span class="nav-label">Market Basket Analysis</span>
                        </a>
                    </li>
                <li class="heading">SETTINGS</li>
                    <li>
                        <a class={this.props.name==='MYP'?'active':''} href='/user_profile'>
                        <i class="sidebar-item-icon fa fa-user"></i>
                        <span class="nav-label">My Profile</span>
                        </a>
                    </li>
                    <li>
                        <Link to='/login' onClick={this.logOut}>
                        <i class="sidebar-item-icon fa fa-sign-out"></i>
                        <span class="nav-label">Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
            </div>
        )
    }
}