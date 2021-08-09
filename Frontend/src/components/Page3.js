import React,{useState} from 'react'
import history from './History';
const Page3 = () => {
    
    // var idpage3 =(history.location.state)
    // console.log(idpage3)
    // localStorage.setItem('tod',idpage3['tot_departments'])
    let ls = localStorage.getItem('idls')
    let tod = localStorage.getItem('tod')

    console.log('****',ls)
    // console.log('****',ls)
    const arrData = [];

    const [files,setfiles] = useState([{exam_id: null, name_of_department: null,file1:null, file2:null,file3:null}])
    const [realfiles,setrealfiles]= useState([])
    const[alert,setalert] = useState('')

    function handleNameChange(i,e){

        // console.log('sajdhgjag')
        const values = [...files];
        values[i].name_of_department = e.target.value;
        values[i].exam_id = parseInt(ls)
        setfiles(values);


    }

    function handleChangefile1(i, e) {

        const values = [...files];

        values[i].file1 = e.target.files[0]
        setfiles(values);
  
      }
      function handleChangefile2(i, e) {

        const values = [...files];

        values[i].file2 = e.target.files[0]
        setfiles(values);

      }
      function handleChangefile3(i, e) {

        const values = [...files];

        values[i].file3 = e.target.files[0]
        setfiles(values);

      }
      // function handleChangefile4(i, e) {

      //   const values = [...files];

      //   values[i].file4 = e.target.files[0]
      //   setfiles(values);

      // }  
      
      function handleAdd() {
        if(files.length< parseInt(tod)){
        const values = [...files];
        values.push({exam_id: null, name_of_department: null,file1:null, file2:null,file3:null});
        setfiles(values);
       
        }
      }
      console.log(files.length)
    
    
      function handleRemove(i) {
        if(files.length>1){
        const values = [...files];
        values.splice(i, 1);
        setfiles(values);
        }
      }
      console.log(files)
      console.log('Hi',files[0]['file1'])

    const handleSubmit = (e,files)=>{
        e.preventDefault();

        console.log(files)
        // if(files.length == parseInt(idpage3['tot_departments']))
        // {
        var formData = new FormData();
        for(var i=0;i<files.length;i++){
          formData.append(`file${i}1`,files[i]['file1']);
          formData.append(`file${i}2`,files[i]['file2']);
          formData.append(`file${i}3`,files[i]['file3']);
          // formData.append(`file${i}4`,files[i]['file4']);
          formData.append(`exam_id${i}`,files[i]['exam_id']);
          formData.append(`name_of_department${i}`,files[i]['name_of_department']);

        }
          formData.append(`count`,files.length)


        fetch('http://localhost:8000/uploadcsv/', {
            
            method: 'POST',

            body: formData
          })
            // .then(response => response.json())
            // .then(json => {
            //   console.log(json)
            // })
            .then(res => (res.ok)? (res.json()):(console.log('notokexamdata')))
            .then(json =>
              {json && history.push('/page4');
              })
            .catch(error => console.log(error)
          );
        // }
        // else{
        //   setalert('* Add '+parseInt(idpage3['tot_departments'])+' departments as specified in previous page:')
        // }
    }


    return (
      <div className="pagesize">
        <h3 style={{color:'red'}}>{alert}</h3>
        <div className="pages" >

      <form  onSubmit={(e)=>handleSubmit(e,files)}>  
      <h1 align="center">Fill Details:</h1>
      {files.map((file, idx) => {
        return (
            
          <div key={`${file}-${idx}`}>
        
        <fieldset>
            <label htmlFor="name_of_department">Name of departments: </label>
                <input type="text" id="name_of_department" name="name_of_department" value={file.name_of_department || ''} onChange={e => handleNameChange(idx, e)} required/><br/><br/>
            <label htmlFor="exam_timetable_csv_location">Exam Time-Table CSV: </label>
                <input type="file" name="file" onChange={e => handleChangefile1(idx, e)} required/><br/><br/>
            <label htmlFor="duty_csv_location">Faculty's Duty CSV: </label>
                <input type="file" name="file" onChange={e => handleChangefile2(idx, e)} required/><br/><br/>
            <label htmlFor="availability_csv_location">Faculty's Availability CSV: </label>
                <input type="file" name="file" onChange={e => handleChangefile3(idx, e)} required/><br/><br/>
            {/* <label htmlFor="proofORlecture_csv_location" >ProofReader Or Lecturer CSV: </label>
                <input type="file" name="file" onChange={e => handleChangefile4(idx, e) } required/><br/><br/>         */}
              
        </fieldset>
        <div align="center">
        <button className="p3btn" style={{marginBottom:'10px'}} type="button" onClick={() => handleAdd()} >
        Add
        </button>
        
        <br></br>
        <button className="p3btn" style={{marginBottom:'10px'}} type="button" onClick={() => handleRemove(idx)}>
              Remove
            </button>          
          </div>
          </div>
        );
      })}
      <div align="center">
      <input type="submit" value="Submit" /> 
      </div>
      </form>
        </div>
        </div>
    )
}

export default Page3
