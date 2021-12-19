import React,{useState} from 'react'
import './Adminregister.css';
import axios from 'axios';
import StudentLogin from './StudentLogin';
import { Link } from 'react-router-dom';

export default function AdminRegister() {

   const [inputDatas, setInputDatas] = useState({
    
   });
   const [responseMessage, setresponseMessage] = useState(null)


  const handlechange = (e)=>{
    const target = e.target;
    const {name,value} = target;
    setInputDatas({...inputDatas,[name]:value})

  }

  const dataSubmit = async (e) => {
    console.log(inputDatas)
    e.preventDefault();
    console.log('sub');
    const url = "http://localhost:5000/api/admin/signup";
    const response = await axios.post(url,inputDatas
    );

    const result =  response.data;
    console.log(result);
    setresponseMessage(result);
    
     
   
 
    // console.log(res)
  }

  return (
    <>
     <h1 className='responsesMessage'>{responseMessage!=null? responseMessage.message:null}</h1>
 
    <div className="admin_register">
     
     

      <div className="card">
      <h1>Admin Register..</h1>
        <form action="" onSubmit={dataSubmit}>
          <div className="data">
            <label For="name">name</label>
            <input required value={inputDatas.name} onChange={handlechange} type="text" name="name" id="name" />
          </div>
          <div className="data">
            <label For="userName">userName</label>
            <input required={true} value={inputDatas.userName} onChange={handlechange} type="text" name="userName" id="userName" />
          </div>

          <div className="data">
            <label For="email">Email</label>
            <input required={true} value={inputDatas.email} onChange={handlechange} type="email" name="email" id="email" />
          </div>
          <div className="data">
            <label htmlFor="password">PAssword</label>
            <input required={true} value={inputDatas.password} onChange={handlechange} type="text" name="password" id="password" />
          </div>
          <div className="data">
            <label htmlFor="adminPermissionCode">adminPermissionCode</label>
            <input required={true} value={inputDatas.adminPermissionCode} onChange={handlechange} type="text" name="adminPermissionCode" id="adminPermissionCode" />
          </div>
          <button type="submit">Register</button>
          <button type="submit"><Link to='/admin/login' style={{textDecoration:"none"}}>Clcik to login</Link></button>


        </form>


      </div>
      
     
     
    </div>
    </>
  )
}
