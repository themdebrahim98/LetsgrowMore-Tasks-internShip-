import React, { useState } from 'react'
import axios from 'axios';

export default function ClassAdd(props) {
    const [inputDatas, setinputDatas] = useState({});
    const [isCassAdd, setisCassAdd] = useState(false);

    // const [isClassAdded, setisClassAdded] = useState(false);


    const classAdd = () => {
        setisCassAdd((prev) => !prev)
    }


    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setinputDatas({ ...inputDatas, [name]: value })
    }

    const submitDataToDb = async () => {
        const url = 'http://localhost:5000/api/admin/classadd';
        const response = await axios.post(url, inputDatas);
        console.log(response, 'response');
        setisCassAdd(false);
        alert("successfully added to database")

        // setisSubmittedDataToDb(true);
        // setcurrentEditData({});
        // setCurrentEditId({})
    }



    return (
        <div className='classadd'>
            <>
                <button onClick={classAdd}>Class Add</button>
                {
                    isCassAdd ?


                        <table style={{ width: "100%" }}>

                            <tr>

                                <th>classHoster</th>
                                <th>userName</th>
                                <th>year</th>
                                <th>dept</th>
                                <th>classDate</th>
                                <th>subjectCode</th>
                            </tr>
                            <tr>
                                <td><input onChange={handleChange} value={null} type="text" name="classHoster" id="classHoster" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="userName" id="userName" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="year" id="year" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="dept" id="dept" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="classDate" id="classDate" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="subjectCode" id="subjectCode" /></td>

                                <td><button onClick={submitDataToDb}>submit</button></td>
                            </tr>

                        </table>
                        : null
                }
            </>

        </div>
    )
}
