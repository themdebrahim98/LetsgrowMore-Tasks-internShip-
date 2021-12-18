import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './ClassManage.css'
import ClassAdd from './ClassAdd';


export default function ClassManage() {

  const [fetchDatas, setfetchDatas] = useState([]);
  const [currentEditData, setcurrentEditData] = useState({});
  const [currentEditId, setCurrentEditId] = useState({})
  const [isSubmittedDataToDb, setisSubmittedDataToDb] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRefresh, setisRefresh] = useState(false);
  const [inputDatas, setinputDatas] = useState({});




  const filter = async() => {
    const url = 'http://localhost:5000/api/admin/classview';
    const response = await axios.post(url, inputDatas);
    console.log(response.data, 'response');
    setfetchDatas(response.data)

   
  }


  const handleChange2 = (e) => {
    setinputDatas({ ...inputDatas, [e.target.name]: e.target.value })
  }


  const handleChange = (e) => {
    console.log('object', e.target.parentNode);
    setcurrentEditData({ ...currentEditData, [e.target.name]: e.target.value })
  }

  const submitDataToDb = async () => {
    const url = 'http://localhost:5000/api/admin/classupdate';
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
      const url = 'http://localhost:5000/api/admin/classdelete';
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
    const url = "http://localhost:5000/api/admin/allclassview";
    const response = await axios.get(url);

    const result1 = response.data;
    const result2 = result1.map((elm) => {

      // const newClassDate = date.getFullYear() + "/" + date.getDay() + "/" + date.getMonth();
      // console.log(newClassDate, 'date')
      // console.log(result,'response',elm)
      var dateParts = elm.classDate.split("-");
      var jsDate = dateParts[0] + "/" + dateParts[1] + "/" + (+dateParts[2].substr(0, 2) + 1)
      console.log('jsDate', jsDate);
      setisSubmittedDataToDb(false);

      // setisRefresh(false)
      return { ...elm, classDate: jsDate };

    })
    console.log(result2);
    setfetchDatas(result2)
    console.log('count')

  }, [isSubmittedDataToDb, isRefresh]);


  return (
    <div className='classManage'>

      <ClassAdd />


      <h1>class manage</h1>
      <table style={{ width: "100%", height: "50%" }}>


        <tr>
          <td><input placeholder='class hoster' onChange={handleChange2} value={null} type="text" name="classHoster" id="classHoster" /></td>
          <td><input placeholder='user name' onChange={handleChange2} value={null} type="text" name="userName" id="userName" /></td>
          <td><input placeholder='year' onChange={handleChange2} value={null} type="text" name="year" id="year" /></td>
          <td><input placeholder='dept' onChange={handleChange2} value={null} type="text" name="dept" id="dept" /></td>
          <td><input placeholder='class date' onChange={handleChange2} value={null} type="text" name="classDate" id="classDate" /></td>
          <td><input placeholder='subject code' onChange={handleChange2} value={null} type="text" name="subjectCode" id="subjectCode" /></td>

          <td><button onClick={filter}>filter</button></td>

        </tr>
      </table>
      <table style={{ width: "100%" }}>



        <tr>
          <th>uuid</th>
          <th>classHoster</th>
          <th>userName</th>
          <th>year</th>
          <th>dept</th>
          <th>classDate</th>
          <th>subjectCode</th>
          <th className='refresh'><i onClick={refresh} class="fas fa-sync-alt"></i></th>
          <th><p>view all data</p></th>
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
                  <td><input disabled={isDisabled} onChange={handleChange} name='classHoster' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.classHoster : elm.classHoster} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='userName' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.userName : elm.userName} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='year' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.year : elm.year} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name="dept" type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.dept : elm.dept} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='classDate' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.classDate : elm.classDate} /></td>

                  <td><input disabled={isDisabled} onChange={handleChange} name='subjectCode' type="text"
                    value={elm.uuid === currentEditId.currentId ? currentEditData.subjectCode : elm.subjectCode} /></td>

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
    </div >
  )
}
