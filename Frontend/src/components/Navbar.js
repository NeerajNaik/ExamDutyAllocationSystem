import React, {useState} from 'react'
import Modal from 'react-awesome-modal';
import Login from './Login';
// import Modal from 'react-modal';
import './Nav.css'
import PropTypes from 'prop-types';
import Signup from './Signup';
import Sidebar from './Sidebar';
import { SidebarData } from './SidebarData';



const Navbar = (props) => {

  const logged_out_nav = (
    
    <div>
      <Sidebar k={props.k}/>
      {/* <SidebarData/> */}
      <br></br>
      {/* <nav class="navbar navbar-custom">
    <a className="headeralign" >Exam Supervision Duty Allocation System</a>
    </nav> */}
    <div className="alignment">
      <button className='btn btn-outline-dark space' onClick={() => props.display_form('login')}><b>Login</b></button>
      <button className='btn btn-outline-dark space' onClick={() => props.display_form('signup')}><b>SignUp</b></button>
        </div>
        
    </div>
  );

  const logged_in_nav = (
    <div>
      <Sidebar handle_logout={props.handle_logout} email={props.email} k={props.k}/>
      
      <br></br>
    {/* <nav class="navbar navbar-custom">
    <a className="headeralign" >Exam Supervision Duty Allocation System</a>
    </nav>  */}
    <br></br> 
      {/* <button className='btn btn-danger headerlogout' onClick={props.handle_logout} ><b>Logout</b></button> */}
    </div>  
   

    
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}


export default Navbar;


Navbar.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};