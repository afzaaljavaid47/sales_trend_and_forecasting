import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Menubar extends Component {
    logOut=()=>{
        Cookies.remove('adtoken')
        this.setState({redirect:'/admin'})
    }
    state={
        redirect:null,
        records:[]
    }
    componentDidMount()
    {
        axios.get('/get_admin_info',{headers:{token:Cookies.get('adtoken')}})
        .then(responce=>{
            console.log(responce.data.data);
            this.setState({records:responce.data.data})
        })
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to="admin"/>
        }
        return (
            <div>
        <header class="header">
            <div class="page-brand">
                <a class="link" href="/admin_panel">
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
                    <li>
                        {/* <form class="navbar-search" action="javascript:;">
                            <div class="rel">
                                <span class="search-icon"><i class="ti-search"></i></span>
                                <input class="form-control" placeholder="Search here..."/>
                            </div>
                        </form> */}
                    </li>
                </ul>
                <ul class="nav navbar-toolbar ">
                    {/* <li class="dropdown dropdown-inbox">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown"><i class="fa fa-envelope-o"></i>
                            <span class="badge badge-primary envelope-badge">9</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right dropdown-menu-media">
                            <li class="dropdown-menu-header">
                                <div>
                                    <span><strong>9 New</strong> Messages</span>
                                    <Link class="pull-right" to="/messages">view all</Link>
                                </div>
                            </li>
                            <li class="list-group list-group-divider scroller" data-height="80px" data-color="#71808f">
                                <div>
                                    <a class="list-group-item">
                                        <div class="media">
                                            <div class="media-body">
                                                <div class="font-strong"> </div>Jeanne Gonzalez<small class="text-muted float-right">Just now</small>
                                                <div class="font-13">Your proposal interested me.</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown dropdown-notification">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell-o rel"><span class="notify-signal"></span></i></a>
                        <ul class="dropdown-menu dropdown-menu-right dropdown-menu-media">
                            <li class="dropdown-menu-header">
                                <div>
                                    <span><strong>5 New</strong> Notifications</span>
                                    <Link class="pull-right" to="/notifications">view all</Link>
                                </div>
                            </li>
                            <li class="list-group list-group-divider scroller" data-height="80px" data-color="#71808f">
                                <div>
                                    <a class="list-group-item">
                                        <div class="media">
                                            <div class="media-img">
                                                <span class="badge badge-success badge-big"><i class="fa fa-check"></i></span>
                                            </div>
                                            <div class="media-body">
                                                <div class="font-13">4 task compiled</div><small class="text-muted">22 mins</small></div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </li> */}
                    <li class="dropdown dropdown-user">
                        <a class="nav-link dropdown-toggle link" data-toggle="dropdown">
                            <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} />
                    <span></span>{this.state.records.uname}<i class="fa fa-angle-down m-l-5"></i></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="admin_profile"><i class="fa fa-user"></i>Profile</a>
                            <li class="dropdown-divider"></li>
                            <Link class="dropdown-item" to="admin" onClick={this.logOut}><i class="fa fa-power-off"></i>Logout</Link>
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
                    <div class="font-strong">{this.state.records.uname}</div><small>Administrator</small></div>
                </div>
                <ul class="side-menu metismenu">
                    <li>
                        <a class="active" href="/admin_panel"><i class="sidebar-item-icon fa fa-th-large"></i>
                            <span class="nav-label">Dashboard</span>
                        </a>
                    </li>
                    <li class="heading">FEATURES</li>
                    
                    {/* <li>
                        <a href="javascript:;"><i class="sidebar-item-icon fa fa-bookmark"></i>
                            <span class="nav-label">Basic UI</span><i class="fa fa-angle-left arrow"></i></a>
                        <ul class="nav-2-level collapse">
                            <li>
                                <a href="colors.html">Colors</a>
                            </li>
                        </ul>
                    </li> */}
                    <li>    
                        <a class={this.props.name==='MUS'?'active':''} href="manage_customers"><i class="sidebar-item-icon fa fa-users"></i>
                            <span class="nav-label">Manage Customers</span></a>
                    </li>
                    <li>    
                        <a class={this.props.name==='AD'?'active':''} href="total_admins"><i class="sidebar-item-icon fa fa-users"></i>
                            <span class="nav-label">Admins Information</span></a>
                    </li>
                    <li>    
                        <a class={this.props.name==='TP'?'active':''} href="total_predictions"><i class="sidebar-item-icon fa fa-cubes"></i>
                            <span class="nav-label">Total Predictions</span></a>
                    </li>
                   {/* <li>
                        <Link to="/messages">
                        <i class="sidebar-item-icon fa fa-envelope-o"></i>
                        <span class="nav-label">Manage Messages<span class="badge badge-light envelope-badge" style={{color:'black'}}>9</span></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notifications">
                        <i class="sidebar-item-icon fa fa-bell-o rel"></i>
                        <span class="nav-label">Manage Notifications<span class="badge badge-light envelope-badge" style={{color:'black'}}>5</span></span>
                        </Link>
                    </li> */}
                     <li>
                        <a class={this.props.name==='ADMIN'?'active':''} href="/add_new_admin">
                        <i class="sidebar-item-icon fa fa-plus"></i>
                        <span class="nav-label">Add New Admin</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='PRO'?'active':''} href="/admin_profile">
                        <i class="sidebar-item-icon fa fa-user-o"></i>
                        <span class="nav-label">My Profile</span>
                        </a>
                    </li>
                    <li>
                        <Link to='/admin' onClick={this.logOut}>
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