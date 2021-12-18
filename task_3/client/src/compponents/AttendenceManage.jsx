
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './AttendenceManage.css'
import AttendenceAdd from './AttendenceAdd';


export default function AttendenceManage() {

    const [fetchDatas, setfetchDatas] = useState([]);
    const [currentEditData, setcurrentEditData] = useState({});
    const [currentEditId, setCurrentEditId] = useState({})
    const [isSubmittedDataToDb, setisSubmittedDataToDb] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isRefresh, setisRefresh] = useState(false);
    const [filetrInputData, setFilterInputData] = useState({});




    const filter = () => {
        const filterData = fetchDatas.filter((elm) => {
            return elm.userName === filetrInputData.userName;
        });
        setfetchDatas(filterData)
        console.log(filterData)
    }

    const handleChange2 = (e) => {
        setFilterInputData({ ...filetrInputData, [e.target.name]: e.target.value });

    }

    const handleChange = (e) => {
        console.log('object', e.target.parentNode);
        setcurrentEditData({ ...currentEditData, [e.target.name]: e.target.value })
    }

    const submitDataToDb = async () => {

        const url = 'http://localhost:5000/api/admin/attendenceupdate';
        const response = await axios.post(url, currentEditData);
        console.log(response, 'response');
        setisSubmittedDataToDb(true);
        setcurrentEditData({});
        setCurrentEditId({});
        alert("successfully changed..")
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
            const url = 'http://localhost:5000/api/admin/attendencedelete';
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
        const url = "http://localhost:5000/api/admin/allattendenceview";
        const response = await axios.get(url);
        const result = response.data;
        setisSubmittedDataToDb(false)
        console.log(result);
        setfetchDatas(result)
        console.log('count')

    }, [isSubmittedDataToDb, isRefresh]);


    return (
        <div className='AttendenceManage'>

            <AttendenceAdd />

            <h1>Student manage</h1>

            <table style={{ width: "100%", height: "50%" }}>

                <tr>
                    <td><input placeholder='class hoster' onChange={handleChange2} value={null} type="text" name="userName" id="userName" /></td>

                    <td><button onClick={filter}>filter</button></td>

                </tr>
            </table>
            <table style={{ width: "100%" }}>

                <tr>
                    <th>uuid</th>
                    <th>name</th>
                    <th>userName</th>
                    <th>email</th>
                    <th>attendenceStatus</th>
                    <th>classes_uuid</th>
                    <th>class hoster</th>
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
                                    <td><input title='not editable from here,you can edit from student manage' disabled onChange={handleChange} name='name' type="text"
                                        value={elm.uuid === currentEditId.currentId ? currentEditData.name : elm.name} /></td>

                                    <td><input title='not editable from here,you can edit from student manage' disabled onChange={handleChange} name='userName' type="text"
                                        value={elm.uuid === currentEditId.currentId ? currentEditData.userName : elm.userName} /></td>

                                    <td><input title='not editable from here,you can edit from student manage' disabled onChange={handleChange} name='email' type="text"
                                        value={elm.uuid === currentEditId.currentId ? currentEditData.email : elm.email} /></td>

                                    <td><input disabled={isDisabled} onChange={handleChange} name="attendenceStatus" type="text"
                                        value={elm.uuid === currentEditId.currentId ? currentEditData.attendenceStatus : elm.attendenceStatus} /></td>

                                    <td><input disabled onChange={handleChange} name='classes_uuid' type="text"
                                        value={elm.uuid === currentEditId.currentId ? currentEditData.classes_uuid : elm.classes_uuid} /></td>

                                    <td><input disabled onChange={handleChange} name='classHoster' type="text"
                                        value={elm.uuid === currentEditId.currentId ? currentEditData.classHoster : elm.classHoster} /></td>


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
