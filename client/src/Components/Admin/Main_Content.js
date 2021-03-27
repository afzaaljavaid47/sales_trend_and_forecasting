import React, { Component } from 'react'
import Videos from './Video.mp4'

export default class Main_Content extends Component {
render() {
  return (
    <div>
    <section id="services" class="services section-bg" style={{marginTop:-55}}>
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Main Features</h2>
          <p>Please click on View Info button to manage these features or click on left vertical buttons to manage it.</p>
         </div>
        <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-success color-white widget-stat">
                            <div class="ibox-body">
                                <h2 class="m-b-5 font-strong">{this.props.atotal}</h2>
                                <div class="m-b-5">TOTAL CUSTOMERS</div><i class="ti-user widget-stat-icon"></i>
                                <div><a href="manage_customers" style={{color:'white'}}><i class="fa fa-question-circle m-r-5"></i><small>View Info</small></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-warning color-white widget-stat">
                            <div class="ibox-body">
                                <h2 class="m-b-5 font-strong">2</h2>
                                <div class="m-b-5">TOTAL PREDICTIONS</div><i class="ti-stats-up widget-stat-icon"></i>
                                <div><a href="/total_predictions" style={{color:'white'}}><i class="fa fa-question-circle m-r-5"></i><small>View Info</small></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-info color-white widget-stat">
                            <div class="ibox-body">
                                <h2 class="m-b-5 font-strong">{this.props.adtotal}</h2>
                                <div class="m-b-5">TOTAL ADMINS</div><i class="ti-user widget-stat-icon"></i>
                                <div><a href="/total_admins" style={{color:'white'}}><i class="fa fa-info-circle m-r-5"></i><small>View All</small></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-danger color-white widget-stat">
                            <div class="ibox-body">
        <h2 class="m-b-5 font-strong">1</h2>
        <div class="m-b-5">MY PROFILE</div><i class="ti-info widget-stat-icon"></i>
            <div><a href="/admin_profile" style={{color:'white'}}><i class="fa fa-info-circle m-r-5"></i><small>View Info</small></a></div>
        </div>
        </div>
        </div>
            </div>
        </div>
    </section>

    <section id="services" class="services section-bg" style={{marginTop:-90}}>
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Admin Guide Video</h2>
          <p style={{marginBottom:20}}>Watch video to know how it works</p>

          {/* <video controls width="900">
            <source src={Videos} type="video/mp4"/>
            </video> */}

        <iframe width="900" height="500" src="https://www.youtube.com/embed/EZapT2sXCAc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div>
        </div>
    </section>

    </div>
        )
    }
}
