import React,{useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import './Nav.css';

const Login = (props) => {
  const [info, setinfo] = useState({email:'',password:''})
  return (
    <div>
           <form onSubmit={e => props.handle_login(e, info)}>
         <div className='form-inner'>
         <FaTimes style={{color:'red' , cursor:'pointer',float:'right'}} onClick={()=>props.display_form('')}/>
         <h2 style={{color:"black",fontFamily:"Times New Roman"}} align="center"><b><u>Log In</u></b></h2>
         <div className='form-group'>
        <label htmlFor="email" style={{color:"black",fontFamily:"Times New Roman",fontSize:"3vh"}}><b>Email</b></label>
         <input
          type="text"
          name="email"
          value={info.email}
          onChange={(e)=>setinfo({...info,email:e.target.value})}
          required
        />
        </div>
        <div className='form-group'>
        <label htmlFor="password" style={{color:"black",fontFamily:"Times New Roman",fontSize:"3vh"}}><b>Password</b></label>
        <input
          type="password"
          name="password"
          value={info.password}
          onChange={(e)=>setinfo({...info,password:e.target.value})}
          required
        />
        </div>
        <input type="submit" align="center"/>
        </div>
      </form>
    </div>
  )
}

export default Login
