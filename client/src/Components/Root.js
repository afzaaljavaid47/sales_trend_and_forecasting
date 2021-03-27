import React, { Component } from 'react'
import MainPage from './Users/MainPage'
import Login from './Users/Login'
import Admin from './Admin/AdminLogin'
import Signup from './Users/Signup'
import ResetPassword from './Users/ResetPassword'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ResetAdminPassword from './Admin/ResetAdminPassword'
import Dashboard from './Users/Dashboard'
import Admin_Profile from './Admin/Admin_Profile'
import Add_New_Admin from './Admin/Add_New_Admin'
import Admin_Panel from './Admin/Admin_Panel'
import Manage_Customers from './Admin/Manage_Customers'
import User_Panel from './Users/User_Panel'
import User_Profile from './Users/User_Profile'
import Upload_Data from './Users/Upload_Data'
import Sales_Forecasting from './Users/Predictions/Sales_Forecasting'
import Market_Basket from './Users/Predictions/Market_Basket'
import Change_Password from './Users/Change_Password'
import Preview_Data from './Users/Preview_Data'
import Admin_Change_Password from './Admin/Admin_Change_Password'
import Total_Admins from './Admin/Total_Admins'
import Total_Predictions from './Admin/Total_Predictions'
import Guide from './Users/Guide'
import User_Predictions from './Users/User_Predictions'

export default class Root extends Component {
    render() {
        return (
            <>
            <Router>
                <Switch>
                    {/* For Users Routes */}
                    
                    <Route path="/" exact><MainPage/></Route>
                    <Route path="/login" exact><Login/></Route>
                    <Route path="/signup" exact><Signup/></Route>
                    <Route path="/reset_password" exact><ResetPassword/></Route>
                    <Route path="/reset_admin_password" exact><ResetAdminPassword/></Route>
                    <Route path="/dashboard" exact><Dashboard/></Route>
                    <Route path="/user_panel" exact><User_Panel/></Route>
                    <Route path="/user_profile" exact><User_Profile/></Route>
                    <Route path="/upload_data" exact><Upload_Data/></Route>
                    <Route path="/sales_forecasting" exact><Sales_Forecasting/> </Route>
                    <Route path="/market_basket_analysis" exact><Market_Basket/></Route>
                    <Route exact path="/change_password/:id" 
                        render={({ match }) => (
                            <Change_Password match={match} />
                        )} 
                    />
                    <Route path="/preview_data" exact><Preview_Data/></Route>
                    <Route path="/guide" exact><Guide/></Route>
                    <Route path="/user_predictions" exact><User_Predictions/></Route>
                    
                    {/* For Admin Routes */}
                    
                    <Route path="/total_admins" exact><Total_Admins/></Route>
                    <Route path="/total_predictions" exact><Total_Predictions/></Route>
                    <Route path="/admin" exact><Admin/></Route>
                    <Route path="/add_new_admin" exact><Add_New_Admin/></Route>
                    <Route path="/admin_panel" exact><Admin_Panel/></Route>
                    <Route path="/admin_profile" exact><Admin_Profile/></Route>
                    <Route path="/manage_customers" exact><Manage_Customers/></Route>
                    <Route exact path="/admin_change_password/:id" 
                        render={({ match }) => (
                            <Admin_Change_Password match={match} />
                        )} 
                    />

                </Switch>
            </Router>  
            </>
        )
    }
}
