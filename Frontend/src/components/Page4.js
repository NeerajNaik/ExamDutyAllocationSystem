import React,{useState,useMemo} from 'react'
import styled from 'styled-components'
import load from "../loading2.gif";
import save from "../s1.gif";
import Table from "./Table";
import history from './History';
import './Nav.css'
import { instanceOf } from 'prop-types';
// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `
const Page4 = () => {
    // var idpage4 =(history.location.state)
    // console.log(idpage4)
    let ls = localStorage.getItem('idls')
    // var safeid4 = idpage4['id']
    const [saveandcheck,setsaveandcheck] = useState({exam_id:parseInt(ls),save:true,checked:false})
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [saveloading, setsaveloading] = useState(false)
    const [savedata, setsavedata] = useState('')
    console.log(saveandcheck)
    function generate(){
        fetch('http://localhost:8000/getfinaltable/', {
          method: 'GET',
        })
          .then(res => (res.ok)? (res.json()):(console.log('notokexamdata')))
          .then(json => {
            setloading(true)  
            setdata(json)
            // console.log(json)
            // console.log(json[0])
          });
    }
    function finalcheck(e,saveandcheck){
        // e.preventDefault();
        
        // setsaveandcheck({...saveandcheck,save:true})
        setsaveloading(true)
        console.log(saveandcheck)
        // if(saveandcheck.save){
            console.log('In fn')
        fetch('http://localhost:8000/saveandcheck/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(saveandcheck)
        })

        .then(res => (res.ok)? (res.json()):(console.log('notokexamdata')))
        .then(json =>
          {
              setsaveloading(false)
              setsavedata('* Save Successful')
              console.log(json) 
          });

    // }
}

    // 
    if(document.querySelector('#table')){
        document.getElementById("table").innerHTML= '';
    }
    Object.entries(data).forEach(([k,v]) => {
        
        // console.log("The key: ",k)
        // console.log("The value: ",v)
        var table = document.createElement('table');
        // var tr = document.createElement('tr');
        // tr.setAttribute("class", "myId");
        var th = document.createElement('th'); // create a td node
        th.innerHTML = k; // fill the td now with a piece of the data array
        table.appendChild(th);
        Object.entries(v).forEach(([k1,v1]) => {
            var tr = document.createElement('tr');
            var th = document.createElement('th'); // create a td node
            th.innerHTML = k1; // fill the td now with a piece of the data array
            tr.appendChild(th);
            table.appendChild(tr);
            Object.entries(v1).forEach(([k2,v2]) => {
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                 // create a td node
                td.innerHTML = k2; 
                // td1.innerHTML = JSON.stringify(v2[3]);
                tr.appendChild(td);
                if(v2[3].length==0)
                {
                    var empty = document.createElement('td'); 
                    empty.innerHTML = 'Empty';
                    tr.appendChild(empty)
                }
                v2[3].forEach(function(e, index) {
                    var td1 = document.createElement('td'); 
                    // console.log(e);
                    // var x=JSON.stringify(e)
                    td1.innerHTML="Id:"+e.uid+","+"Category:"+e.categ+","+"Faculty_Department:"+e.fac_dept+" ";
                    // td1.style.color="white";
                    // td1.style.backgroundColor="black";
                    // td1.style.width="1000px";
                    
                    // console.log(td1.innerHTML)
                    tr.appendChild(td1);
                    // tr.style.backgroundColor="black"
                    //  tr.style.width="100%"
                  });
                  
                 // fill the td now with a piece of the data array
                
                // tr.appendChild(td1);
                table.appendChild(tr);
                // console.log(k2);
            })
        })
        
        document.getElementById("table").appendChild(table);
        // document.getElementsByClassName("myId").bgColor = 'yellow';
        
        // document.getElementById("table").bgColor = '#fff';
    })

    // const columns = useMemo(() => [
    //     {
    //       Header: "Branch",
    //       accessor: "branch",
    //     },
    //     {
    //       Header: "Date",
    //       accessor: "date",
    //     },
    //     {
    //       Header: "Shift",
    //       accessor: "shift",
    //     },
    //     {
    //         Header: "Duty",
    //         accessor: "duty",
    //     },
    //   ]);

    return (
        <div>
        <div className="p4">
        <button className="p4btn ml-2" type="button" onClick={() => generate()} >
        Generate
        </button>
        <br/>
        <br/>
        
        <input type="checkbox"
        defaultChecked={saveandcheck.checked}
        onChange={(e) => setsaveandcheck({...saveandcheck,checked:!saveandcheck.checked})}
      />
      <label className="checkboxEmail">E-mail notifications</label>
      <br/>
      <br/>
        <button className="p4btn ml-2" type="button"  onClick={(e) => finalcheck(e,saveandcheck)} >
        Save
        </button>
        {saveloading ?<img className="loadingimage" src={save}></img> : <h3 style={{color:'green',float:'right',marginLeft:'10px'}}>{savedata}</h3> }
        <br></br>
        </div>

        {loading && <div className='table' id="table">
        </div>} 

        {/* <table className='tbl-qa'>
        <thead>
            <tr className='branch' id = 'branch'></tr>
            <tr className='date' id = 'date'></tr> 
        </thead>
        <tbody id='table-body'> */}
        {/* <td className='date' id = 'date'></td>   */}
        {/* <tr className='shift' id = 'shift'></tr> 
        </tbody>
        </table> */}
        {/* {loading ?
        <div className='center'>
        <img
        src={load} />
        </div>
        :
        console.log('hi')
        // <Styles>
        // <Table columns={columns} data={data} />
        // </Styles>
        } */}
        </div>
    )
}

export default Page4
