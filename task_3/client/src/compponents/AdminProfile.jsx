import React, { useState, useEffect } from 'react'
import './AdminProfile.css';
import axios from 'axios';
import StudentLogin from './StudentLogin';
import avatar from '../image/img_avatar.png'

export default function AdminProfile({ username,adminChange }) {

  const [inputDatas, setInputDatas] = useState({});
  const [responseMessage, setresponseMessage] = useState(null)
  const [fetchDatas, setfetchDatas] = useState([]);
  const [currentEditData, setcurrentEditData] = useState({});
  const [currentEditId, setCurrentEditId] = useState({})
  const [isSubmittedDataToDb, setisSubmittedDataToDb] = useState(false);
  const [isRefresh, setisRefresh] = useState(false);
  const [admin, setadmin] = useState({ username: username });


  // let userData = { username: username };
  console.log(admin, 'admin');


  const handlechange = (e) => {
    console.log('object', e.target.parentNode);
    setcurrentEditData({ ...currentEditData, [e.target.name]: e.target.value })
  }

  const edit = (id) => {
    console.log(id);
    const result = fetchDatas.filter((elm) => {
      return elm.uuid === id;
    })
    console.log(result, 'result');
    setcurrentEditData({ ...result[0] });
    setCurrentEditId({ currentId: result[0].uuid });

  }

  if(Object.keys(currentEditData).length>0){
    adminChange(currentEditData.userName);
  }

  const submitDataToDb = async () => {
   setadmin({username:currentEditData.userName})
    const url = 'http://localhost:5000/api//adminprofileupdate';
    const response = await axios.post(url, currentEditData);
    console.log(response, 'response');
    setisSubmittedDataToDb(true);
    // setcurrentEditData({});
    setCurrentEditId({});
    alert("successfully added")
  }

  // const dataSubmit = async (e) => {
  //   console.log(inputDatas)
  //   e.preventDefault();
  //   console.log('sub');
  //   const url = "http://localhost:5000/api/admin/signup";
  //   const response = await axios.post(url, inputDatas
  //   );

  //   const result = response.data;
  //   console.log(result);
  //   setresponseMessage(result);

  //   // console.log(res)
  // }


  useEffect(async () => {
    const url = "http://localhost:5000/api/adminprofile";
    const response = await axios.post(url, admin);
    const result = response.data;
    setisSubmittedDataToDb(false)
    console.log(response, "profile");
    setfetchDatas(result)

  }, [isSubmittedDataToDb]);

  return (
    <>

      {console.log(username, 'props')}
      <div className="adminProfile">

        <div className="card">
          <div className="avatar">
            <img src={avatar} alt="scsc" />

          </div>


          {
            fetchDatas.map((elm, idx) => {
              const isDisabled = elm.uuid === currentEditId.currentId ? false : true;
              const isSubmitButtonShow = elm.uuid === currentEditId.currentId ? true : false;

              return (
                <div>
                  <form action="" >
                    <div className="data">
                      <label For="name">name</label>
                      <input required disabled={isDisabled} value={elm.uuid === currentEditId.currentId ? currentEditData.name : elm.name} onChange={handlechange} type="text" name="name" id="name" />
                    </div>
                    <div className="data">
                      <label For="userName">userName</label>
                      <input disabled={isDisabled} required={true} value={elm.uuid === currentEditId.currentId ? currentEditData.userName : elm.userName} onChange={handlechange} type="text" name="userName" id="userName" />
                    </div>

                    <div className="data">
                      <label For="email">Email</label>
                      <input disabled={isDisabled} required={true} value={elm.uuid === currentEditId.currentId ? currentEditData.email : elm.email} onChange={handlechange} type="email" name="email" id="email" />
                    </div>
                    <div className="data">
                      <label htmlFor="password">Password</label>
                      <input disabled={isDisabled} required={true} value={elm.uuid === currentEditId.currentId ? currentEditData.password : elm.password} onChange={handlechange} type="text" name="password" id="password" />
                    </div>


                  </form>
                  {

                    isSubmitButtonShow ? <button onClick={submitDataToDb} type="submit">save</button> : <button onClick={() => edit(elm.uuid)} type="submit">change</button>
                  }







                </div>
              )
            })
          }



        </div>










      </div>
    </>
  )
}
