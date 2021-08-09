import React,{useState} from 'react'
import history from './History';

const Page2 = () => {
    // var idpage2 =(history.location.state)
    // console.log(idpage2['id'])
    // localStorage.setItem('idls',idpage2['id'])
    // localStorage.setItem('idls',idpage2['id'])
    var ls = localStorage.getItem('idls')
    // console.log(typeof(ls))
    console.log('sdaudsoaufouaso',parseInt(ls))
    const [info, setinfo] = useState({exam_id:null,tot_departments:'',reliever_duty:'',InterorIntra:'inter'})
    const handleSubmit = (e,info)=>{
        e.preventDefault();
        // setinfo({exam_id:parseInt(ls)})
        console.log(info);
        
        
        fetch('http://localhost:8000/examdata/', {
            
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
        })
        
          .then(res => (res.status==201)? (res.json()):(console.log('notokexamdata')))
          .then(json =>
            {json && localStorage.setItem('tod',info['tot_departments']);
            })
          .then(history.push('/page3'));
            
    }
    
    return (
        <div className='pages'>
        
        <form onSubmit={(e)=>handleSubmit(e,info)}> 
        <h1>Fill Details:</h1>
        <fieldset>
            {/* <label htmlFor="exam_id">Enter Exam ID: </label>
                <input type="text" id="exam_id" name="exam_id" value={info.exam_id} onChange={(e)=>setinfo({...info,exam_id:e.target.value})} required/><br/><br/> */}
            {/* <label htmlFor="tot_blocks">Total no of blocks: </label>
                <input type="number" id="tot_blocks" name="tot_blocks" value={info.tot_blocks} onChange={(e)=>setinfo({...info,tot_blocks:e.target.value})} required/><br/><br/> */}
            <label htmlFor="tot_departments">Total no of departments: </label>
                <input type="number" id="tot_departments" name="tot_departments" value={info.tot_departments} onChange={(e)=>setinfo({...info,tot_departments:e.target.value,exam_id:parseInt(ls)})} required/><br/><br/>
            <label htmlFor="reliever_duty">Reliver duty(percentage): </label>
                <input type="text" id="reliever_duty" name="reliever_duty" value={info.reliever_duty} onChange={(e)=>setinfo({...info,reliever_duty:e.target.value,exam_id:parseInt(ls)})} required/><br/><br/>
            {/* <label htmlFor="extra_blocks">Add Extra Blocks(if reqd else put 0): </label>
                <input type="number" id="extra_blocks" name="extra_blocks" value={info.extra_blocks} onChange={(e)=>setinfo({...info,extra_blocks:e.target.value})} required/><br/><br/> */}
                <p>Choose:</p>
            <input type="radio" id="Inter-department" name="choice" checked={info.InterorIntra === 'inter'} value="inter" onChange={(e)=>setinfo({...info,InterorIntra:e.target.value,exam_id:parseInt(ls)})} required/>
            <label htmlFor="Inter-department">Inter-department</label><br/>
            <input type="radio" id="Intra-department" name="choice" checked={info.InterorIntra === 'intra'} value="intra" onChange={(e)=>setinfo({...info,InterorIntra:e.target.value,exam_id:parseInt(ls)})} required/>
            <label htmlFor="Intra-department">Intra-department</label><br/>
            <input type="submit" value="Submit"/>    
        </fieldset>
        </form>
        {/* {page1 && <Page2 />} */}
        </div>
    )
}

export default Page2
