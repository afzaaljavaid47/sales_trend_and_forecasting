import React, { Component } from 'react'
import axios from 'axios'
import Menubar from './Menubar'
import Footer from './Footer'
import {Modal,Button} from 'react-bootstrap'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class User_Predictions extends Component {
    state={
        records:[],
        redirect:null
    }
    componentDidMount()
    {
        this.getdata();
    }
    getdata()
    {
        axios.get('/all_admins_info')
        .then(responce=>{
            this.setState({records:responce.data});
        })
    }
    render() {
        if(!Cookies.get('adtoken'))
        {
            this.setState({redirect:'/admin'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="/admin"/>
        }
return (
<body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name='PRED'/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <div className="container" style={{marginBottom:'30px'}}>

        <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>All Predictions Information</h2>
          <p>The E-commerce industry is in dire need of intelligent forecasting model of sales trends
              with highest possible level of accuracy. There is a need to develop a tool which predict sales and
              do the comparative analysis of sales prediction using data mining techniques. So we are introducing a system that will fill this market gap with following services.</p>
        </div>
        <div class="row" style={{marginTop:30}}>
        <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-microchip"></i></div>
              <h4><a href="#">Data Preprocessing</a></h4>
              <p style={{textAlign:"justify"}}>
               Data Preprocessing is the process of ata cleaning, data integration, data reduction, and data transformation. We will clean data to increase the accuracy of our prediction model.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="bx bxs-analyse"></i></div>
              <h4><a href="#">Sales Forecasting</a></h4>
              <p style={{textAlign:"justify"}}>
              Sales forecasting is the process of estimating future sales. Accurate sales forecasts enable companies to make informed business decisions and predict short-term and long-term performance.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-basket"></i></div>
              <h4><a href="#">Market Basket</a></h4>
              <p style={{textAlign:"justify"}}>
              Market Basket Analysis is one of the key techniques used by large retailers to uncover associations between items. It works by looking for combinations of items that occur together frequently in transactions.
              </p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-chart"></i></div>
              <h4><a href="#">Data Visualization</a></h4>
              <p style={{textAlign:"justify"}}>
              Data visualization is an interdisciplinary field that deals with the graphic representation of data. It is a particularly efficient way of communicating when the data is numerous as for example a Time Series.           </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    
                
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
