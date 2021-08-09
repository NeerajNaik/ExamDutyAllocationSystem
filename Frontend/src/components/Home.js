import React,{useState} from 'react'
import Page2 from './Page2'
import history from './History';
const Home = (props) => {
    const [info, setinfo] = useState({name_of_exam:'',description_of_exam:''})
    const [page1, setpage1] = useState(false)
    const handleSubmit = (e,info)=>{
        e.preventDefault();
        console.log(info);
        
        fetch('http://localhost:8000/exam/', {
            
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
        })
        
          .then(res => (res.status==201)? (res.json()):(console.log('notokexam')))
          .then(json =>
            {json['exam_id']&& localStorage.setItem('idls',json['exam_id']);
            })
          .then(history.push('/page2'));
    }
    return (
        <div className='pages'>
        {/* <h1>Hello, {props.username}</h1> */}
        <form onSubmit={(e)=>handleSubmit(e,info)}> 
        <h1>Fill Details:</h1>
        <fieldset>
    
            {/* <label htmlFor="exam_id">Enter Exam ID: </label>
                <input type="text" id="exam_id" name="exam_id" value={info.exam_id} onChange={(e)=>setinfo({...info,exam_id:e.target.value})} required/><br/><br/> */}
            <label htmlFor="name_of_exam">Enter Exam Name: </label>
                <input type="text" id="name_of_exam" name="name_of_exam" value={info.name_of_exam} onChange={(e)=>setinfo({...info,name_of_exam:e.target.value})} required/><br/><br/>
            <label htmlFor="description_of_exam">Enter description of exam: </label>
                <input type="text" id="description_of_exam" name="description_of_exam" value={info.description_of_exam} onChange={(e)=>setinfo({...info,description_of_exam:e.target.value})} required/><br/><br/>
            <input className="submit" type="submit" value="Submit"/>    
        </fieldset>
        </form>
        {/* {page1 && <Page2 />} */}
        </div>
    )
}

export default Home
