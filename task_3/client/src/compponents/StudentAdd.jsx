import React, { useState } from 'react'
import axios from 'axios';

export default function StudentAdd(props) {
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
        const url = 'http://localhost:5000/api/student/signup';
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
                <button onClick={classAdd}>Student Add</button>
                {
                    isCassAdd ?


                        <table style={{ width: "100%" }}>

                            <tr>

                                <th>name</th>
                                <th>userName</th>
                                <th>email</th>
                                <th>password</th>
                               
                                <th>year</th>
                                <th>dept</th>
                                <th>phone</th>
                            </tr>
                            <tr>
                                <td><input onChange={handleChange} value={null} type="text" name="name" id="name" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="userName" id="userName" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="email" id="email" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="password" id="password" /></td>
                     
                                <td><input onChange={handleChange} value={null} type="text" name="year" id="year" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="dept" id="dept" /></td>
                                <td><input onChange={handleChange} value={null} type="text" name="phone" id="phone" /></td>


                                <td><button onClick={submitDataToDb}>submit</button></td>
                            </tr>

                        </table>
                        : null
                }
            </>

        </div>
    )
}
