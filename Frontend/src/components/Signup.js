import React,{useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import './Nav.css';
const Signup = (props) => {
  const [info, setinfo] = useState({username:'',password:'',email:''})
  return (
    <>
           <form onSubmit={e => props.handle_signup(e, info)}>
         <div className='form-inner'>
         <FaTimes style={{color:'red' , cursor:'pointer',float:'right'}} onClick={()=>props.display_form('')}/>
         <h2 style={{color:"black",fontFamily:"Times New Roman"}} align="center"><b><u>Sign  Up</u></b></h2>
         <div className='form-group'>
         <label htmlFor="username" style={{color:"black",fontFamily:"Times New Roman",fontSize:"3vh"}}><b>Username</b></label>
         <input
          type="text"
          name="username"
          value={info.username}
          onChange={(e)=>setinfo({...info,username:e.target.value})}
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
        <div className='form-group'>
        <label htmlFor="email" style={{color:"black",fontFamily:"Times New Roman",fontSize:"3vh"}}><b>E-mail</b></label>
        <input
          type="email"
          name="email"
          value={info.email}
          onChange={(e)=>setinfo({...info,email:e.target.value})}
          required
        />
        </div>
        <input type="submit" />
        </div>
      </form>
      
    </>
  )
}

export default Signup
