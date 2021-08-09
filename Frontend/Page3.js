import React,{useState} from 'react'

const Page3 = () => {
    const [info, setinfo] = useState({name_of_department:''})
    const [files,setfiles] = useState([])
    // const changeHandler = (e)=>{
    //     setfiles(e.target.files)
    //     console.log(files)
    // }
    const handleSubmit = (e,info,files)=>{
        e.preventDefault();
        console.log(info)
        console.log(files)
        var formData = new FormData();
        const name = info['name_of_department']
        console.log(name)
        formData.append('name_of_department', name);
        console.log(formData.has('name_of_department'))
        files.map((file, index) => {
          formData.append(`file${index}`, file);
        });
        console.log(formData)
        console.log(formData.has('file0'))
        fetch('http://localhost:8000/uploadcsv/', {
            
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(json => {
              console.log(json)
            })
            .catch(error => console.log(error)
          );
    }
    return (
        <div>
        
        <form onSubmit={(e)=>handleSubmit(e,info,files)}> 
        <fieldset style={{backgroundColor:'#eeeeee'}}>
            <label htmlFor="name_of_department">Name of departments: </label>
                <input type="text" id="name_of_department" name="name_of_department" value={info.name_of_department} onChange={(e)=>setinfo({...info,name_of_department:e.target.value})} required/><br/><br/>
            <label htmlFor="exam_timetable_csv_location">Exam Time-Table CSV: </label>
                <input type="file" name="file" onChange={(e)=>setfiles([...files,e.target.files[0]])} required/><br/><br/>
            <label htmlFor="duty_csv_location">Faculty's Duty CSV: </label>
                <input type="file" name="file" onChange={(e)=>setfiles([...files,e.target.files[0]])} required/><br/><br/>
            <label htmlFor="availability_csv_location">Faculty's Availability CSV: </label>
                <input type="file" name="file" onChange={(e)=>setfiles([...files,e.target.files[0]])} required/><br/><br/>
            <label htmlFor="proofORlecture_csv_location">ProofReader Or Lecturer CSV: </label>
                <input type="file" name="file" onChange={(e)=>setfiles([...files,e.target.files[0]])} required/><br/><br/>        
            <input type="submit" value="Submit"/>    
        </fieldset>
        </form>
        
        </div>
    )
}

export default Page3
