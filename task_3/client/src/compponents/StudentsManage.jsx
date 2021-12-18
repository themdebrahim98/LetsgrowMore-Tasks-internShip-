
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './StudentsManage.css'
import StuDentAdd from './StudentAdd';


export default function StudentsManage() {

  const [fetchDatas, setfetchDatas] = useState([]);
  const [currentEditData, setcurrentEditData] = useState({});
  const [currentEditId, setCurrentEditId] = useState({})
  const [isSubmittedDataToDb, setisSubmittedDataToDb] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRefresh, setisRefresh] = useState(false);






  const handleChange = (e) => {
    console.log('object', e.target.parentNode);
    setcurrentEditData({ ...currentEditData, [e.target.name]: e.target.value })
  }

  const submitDataToDb = async () => {
    const url = 'http://localhost:5000/api/admin/studentupdate';
    const response = await axios.post(url, currentEditData);
    console.log(response, 'response');
    setisSubmittedDataToDb(true);
    setcurrentEditData({});
    setCurrentEditId({});
    alert("successfully added")
  }

  const rowEdit = (id) => {
    console.log(id);
    const result = fetchDatas.filter((elm) => {
      return elm.uuid === id;
    })
    console.log(result, 'result');
    setcurrentEditData({ ...result[0] });
    setCurrentEditId({ currentId: result[0].uuid });

  }

  const deleteClassfromDb = async (id) => {
    const isdelete = window.confirm(id + 'will be deleted');
    if (isdelete) {
      const url = 'http://localhost:5000/api/admin/studentdelete';
      const response = await axios.post(url, { "uuid": id });
      console.log(response, 'response');
      console.log('deleted');
      alert("successfully deleted data from database")

    } else {
      console.log('not deleted')
    }
  }


  const refresh = () => {
    setisRefresh((prev) => !prev);
    console.log('refresh')

  }

  useEffect(async () => {
    const url = "http://localhost:5000/api/admin/allstudents";
    const response = await axios.get(url);

    const result = response.data;
   setisSubmittedDataToDb(false)
    console.log(result);
    setfetchDatas(result)
    console.log('count')

  }, [isSubmittedDataToDb, isRefresh]);


  return (
    <div className='studentsmanage'>

      <StuDentAdd />


      <h1>Student manage</h1>
      <table style={{ width: "100%" }}>

        <tr>
          <th>uuid</th>
          <th>name</th>
          <th>userName</th>
          <th>email</th>
          <th>password</th>
          <th>year</th>
          <th>dept</th>
          <th>phone</th>
          <th className='refresh'><i onClick={refresh} class="fas fa-sync-alt"></i></th>
        </tr>
        {
          fetchDatas.length > 0
            ?

            fetchDatas.map((elm, idx) => {
              const isDisabled = elm.uuid === currentEditId.currentId ? false : true;
              const isSubmitButtonShow = elm.uuid === currentEditId.currentId ? true : false;
              return (


                <tr id={elm.uuid}>

                  <td>{elm.uuid}</td>
                  <td><input disabled={isDisabled} onChange={handleChange} name='name' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.name : elm.name} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='userName' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.userName : elm.userName} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='email' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.email : elm.email} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name="password" type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.password : elm.password} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='year' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.year : elm.year} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='dept' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.dept : elm.dept} /></td>

                     <td><input disabled={isDisabled} onChange={handleChange} name='phone' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.phone : elm.phone} /></td>

                  <td>
                    {isSubmitButtonShow ? <button onClick={submitDataToDb}>submit</button> : <i onClick={() => { rowEdit(elm.uuid) }} className="fas fa-edit"></i>}</td>
                  <td><i onClick={() => deleteClassfromDb(elm.uuid)} class="fas fa-trash-alt"></i></td>


                </tr>

              )
            })

            : null
        }

      </table>


      {/* <input type="text"  value={45}/> */}
    </div>
  )
}
