import React, { Component } from 'react';
import styles from '../../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Menubar from '../Menubar'
import Footer from '../Footer'
import Setting_Menu from '../Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../../images/buffering.gif';
import {Line,Pie} from 'react-chartjs-2'
import Skeleton from 'react-loading-skeleton';

class Sales_Forecasting extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:null,
        is_sales_forecasting_run:false,
        is_future_sales_forecasting_run:false,
        all_trending_products_file:null,
        all_trending_products_by_sales_file:null,
        result:'',
        checked:false,
        forecast_checked:false,
        all_trending_products:null,
        all_trending_products_by_sales:null,
        future_sales:null,
        future_sales_file:null,
        chartsData:{ 
          labels:[],
            datasets:[
                {
                  label:'Sales Price',
                  data:[],
                  fill: false,
                  borderColor: '#2196f3', // Add custom color border (Line)
                  backgroundColor: '#2196f3', //
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
        forecastData:{ 
          labels:[],
            datasets:[
                {
                  label:'Forecast Price',
                  data:[],
                  fill: false,
                  borderColor: '#2196f3', // Add custom color border (Line)
                  backgroundColor: 'rgba(184, 31, 46)', //
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
        chartData:{ 
          labels:[],
            datasets:[
                {
                  label:'Sales Quantity',
                  data:[],
                  fill: true,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(222, 20, 192)",
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
        trend_by_sales:{ 
          labels:[],
            datasets:[
                {
                  label:'Sales Price',
                  data:[],
                  fill: true,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "green",
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
    }
}

handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked })
forecast_handleCheckboxChange = event =>
    this.setState({ forecast_checked: event.target.checked })

get_all_forecast_sales_price(){
      axios.get('/prediction/sales_forecasting/future_sales_data',{headers: {token: Cookies.get('token')}})
      .then(response => {
         this.setState({future_sales:response.data.data,future_sales_file:response.data.file})
        });
    }

future_sales_forecasting_plot_graph() {
      axios.get('/prediction/sales_forecasting/future_sales_forecasting_plot_graph',{headers: {token: Cookies.get('token')}})
          .then(response => {
              this.state.forecastData.labels=response.data.val.labels;
              let fill=response.data.val.datasets;
              const d=[]
              fill.map(n=>{
                  d.push(n)
              })
              var forecastData = {...this.state.forecastData}
              forecastData.datasets[0].data = d;
              this.setState({
                forecastData,
                  is_future_sales_forecasting_run:true
              }) 
              this.get_all_forecast_sales_price();
              });
  }


sales_forecasting_plot_graph() {
        axios.get('/prediction/sales_forecasting/sales_forecasting_plot_graph',{headers: {token: Cookies.get('token')}})
            .then(response => {
                this.state.chartsData.labels=response.data.val.labels;
                let fill=response.data.val.datasets;
                const d=[]
                fill.map(n=>{
                    d.push(n)
                })
                var chartsData = {...this.state.chartsData}
                chartsData.datasets[0].data = d;
                this.setState({
                    chartsData,
                    is_sales_forecasting_run:true
                }) 
              this.future_sales_forecasting_plot_graph()  
              });
    }

get_all_trending_products_by_sales_price(){
      axios.get('/prediction/sales_forecasting/all_products_by_sales_price',{headers: {token: Cookies.get('token')}})
      .then(response => {
         this.setState({all_trending_products_by_sales:response.data.data,all_trending_products_by_sales_file:response.data.file})
         this.sales_forecasting_plot_graph();
        });
    }
    
get_trending_products_by_sales(){
  axios.get('/prediction/sales_forecasting/plot-graph_trend_by_sale',{headers: {token: Cookies.get('token')}})
  .then(response => {
  
    this.state.trend_by_sales.labels=response.data.val.labels;
    let fill=response.data.val.datasets;
    const d=[]
    fill.map(n=>{
        d.push(n)
    })
    console.log(d)
    console.log(this.state.trend_by_sales.labels)
    var chartsData = {...this.state.trend_by_sales}
    chartsData.datasets[0].data = d;
    this.setState({
      trend_by_sales:chartsData
    }) 
    this.get_all_trending_products_by_sales_price()

    });
}

get_all_trending_products(){
  axios.get('/prediction/sales_forecasting/all_products',{headers: {token: Cookies.get('token')}})
  .then(response => {
     this.setState({all_trending_products:response.data.data,all_trending_products_file:response.data.file})
     this.get_trending_products_by_sales()

    });
}

get_trending_products(){
  axios.get('/prediction/sales_forecasting/plot-graph',{headers: {token: Cookies.get('token')}})
  .then(response => {
    this.state.chartData.labels=response.data.val.labels;
    let fill=response.data.val.datasets;
    const d=[]
    fill.map(n=>{
        d.push(n)
    })
    console.log(d)
    console.log(this.state.chartData.labels)
    var chartData = {...this.state.chartData}
    chartData.datasets[0].data = d;
    this.setState({
        chartData
    }) 
    
    this.get_all_trending_products()
    });
}

getdata(){
  axios.get('/prediction/sales_forecasting',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        this.setState({
        result:response.data.data3,
        file:response.data.file,
        buffering:false    
        }); 
        this.get_trending_products();  
      });
    
}
componentDidMount(){
  this.setState({buffering:true})
    axios.get('/check_is_upload',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response)
        this.setState({
            uploaded: response.data.data,
            file:response.data.file
        });    
        this.getdata()
      });
   
}
  render() 
  {
    if(!Cookies.get('token'))
    {
        this.setState({redirect:'/login'})
    }
    if(this.state.redirect)
    {
        return <Redirect to="/login"/>
    }
    return(
  <body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="sales"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h1 style={{textAlign:'center'}}><u>Sales Forecasting</u></h1>
        {this.state.uploaded?
        <>
        {
        this.state.buffering?
        <>  
        <div style={{textAlign:'center',marginTop:20}}>
        <h3 class="text-danger" style={{textAlign:'center',marginTop:15}}>Sales Forecasting Running Please Wait..... </h3>
        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/><br></br>
        <Skeleton count={10} height={30}/>
        <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150} /></span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <br/>
          <br/>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
        </div>
        </div>
        </>
        :null
        }
        </>
        :
        <>
        <div style={{textAlign:'center',marginTop:50,marginBottom:30}}>
        <hr></hr>
        <h3 style={{marginTop:30}} class="text-center text-danger">Please upload your data first to preview data</h3>
        <a class="text-center btn btn-primary" href="/upload_data">Upload Data Now</a>
        </div>
        <hr></hr>
        </>
        }
      {this.state.result?
      <>
        <div style={{textAlign:'center',marginBottom:20}}>
        <h2 class={this.state.file?"text-success":"text-danger"} style={{textAlign:'center',marginTop:20}}>
        {this.state.result}</h2>
        {this.state.file? <a href={this.state.future_sales_file} class={'btn btn-primary btn-sm'}>Download Predicted File</a>:''}
        </div>

{this.state.is_sales_forecasting_run?
<div>
 <div className="container" style={{overflowX:'scroll'}}>
        <div class="row" style={this.state.checked?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Uploaded Data Statistics</h3>
                                        <div>Your uploaded data per day sales price graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.chartsData} />
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                 <div class="text-right text-primary m-r-10" >
                 <input type="checkbox" 
                 checked={this.state.checked}
                 onChange={this.handleCheckboxChange}/>&nbsp;&nbsp;
                 <span style={{marginRight:20}}>Best Fit</span> 
                 </div>
                 </div>
: 
<div style={{textAlign:'center',marginTop:20}}>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
</div>
}
<br></br><br></br>
      <div class="row">
                    <div class="col-lg-7">
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Overall Statistics</h3>
                                        <div>Your top 5 trending products by their sales quantity graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.chartData} />
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">Top trending products list by their sales quantity</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'268px'}}>
                                <table class="table table-striped table-bordered table-responsive" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Quantity</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>

                                        {this.state.all_trending_products?
                                        <>
                                        {this.state.all_trending_products.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          </tr>
                                        ))}
                                        </>:
                                         <div style={{textAlign:'center',marginTop:20}}>
                                        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
                                       </div>
                                      }
                                      
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Quantity</b></td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                    </div>
                                </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.all_trending_products_file}>Export to CSV</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-7" style={{overflowX:'scroll'}}>
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Overall Statistics</h3>
                                        <div>Your top 5 trending products by their sales price graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.trend_by_sales} />                            
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">Top trending products list by their sales price</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'268px'}}>
                                <table class="table table-striped table-bordered table-responsive" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Sales</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.all_trending_products_by_sales?
                                        <>
                                        {this.state.all_trending_products_by_sales.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          </tr>
                                        ))}
                                        </>
                                        : 
                                        <div style={{textAlign:'center',marginTop:20}}>
                                          <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
                                        </div>
                                      }
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Sales</b></td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                    </div>
                                </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.all_trending_products_by_sales_file}>Export to CSV</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
{this.state.is_future_sales_forecasting_run?
<div>
 <div className="container" style={{overflowX:'scroll'}}>
        <div class="row" style={this.state.forecast_checked?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Future Forecasting Sales Data Statistics</h3>
                                        <div>Your Forecasting(future) sales data sales price graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.forecastData} />
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                 <div class="text-right text-primary m-r-10" >
                 <input type="checkbox" 
                 checked={this.state.forecast_checked}
                 onChange={this.forecast_handleCheckboxChange}/>&nbsp;&nbsp;
                 <span style={{marginRight:20}}>Best Fit</span> 
                 </div>
                 </div>
: 
<div style={{textAlign:'center',marginTop:20}}>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
</div>
}
<br></br><br></br>
{this.state.future_sales?
<div>
 <div className="container">
        <div class="row">
                  <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">Future Forecasting Sales Data</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'450px'}}>
                                <table class="table table-striped table-bordered" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Date</b></td>
                                          <td><b>Sales Price</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.future_sales?
                                        <>
                                        {this.state.future_sales.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[0]}</td>
                                          <td>{data[1]}</td>
                                          </tr>
                                        ))}
                                        </>
                                        : 
                                        <div style={{textAlign:'center',marginTop:20}}>
                                          <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
                                        </div>
                                      }
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Date</b></td>
                                          <td><b>Sales Price</b></td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                    </div>
                                </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.future_sales_file}>Export to CSV</a>
                                    </div>
                            </div>
                        </div>
                    </div>            
                </div>
                </div>
                </div>
: 
<div style={{textAlign:'center',marginTop:20}}>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
</div>
}
<br></br><br></br>

      </>:''}
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
    );
  };
}

export default Sales_Forecasting;