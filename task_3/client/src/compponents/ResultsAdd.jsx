import React, { useState } from 'react'
import axios from 'axios';

export default function ResultsAdd(props) {
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
    const url = 'http://localhost:5000/api/admin/resultadd/';
    const response = await axios.post(url, inputDatas);
    console.log(response, 'response');
    setisCassAdd(false);
    alert(response.data)

    // setisSubmittedDataToDb(true);
    // setcurrentEditData({});
    // setCurrentEditId({})
  }



  return (
    <div className='classadd'>
      <>
        <button onClick={classAdd}>Result Add</button>
        {
          isCassAdd ?


            <table style={{ width: "100%" }}>

              <tr>

                <th>username</th>
                <th>math</th>
                <th>dbms</th>
                <th>eng</th>
                <th>signalSystem</th>
                <th>algo</th>
                <th>dsa</th>
              </tr>
              <tr>
                <td><input onChange={handleChange} value={null} type="text" name="students_uuid" id="students_uuid" /></td>
                <td><input onChange={handleChange} value={null} type="text" name="math" id="math" /></td>
                <td><input onChange={handleChange} value={null} type="text" name="dbms" id="dbms" /></td>
                <td><input onChange={handleChange} value={null} type="text" name="eng" id="eng" /></td>
                <td><input onChange={handleChange} value={null} type="text" name="signalSystem" id="signalSystem" /></td>
                <td><input onChange={handleChange} value={null} type="text" name="algo" id="algo" /></td>
                <td><input onChange={handleChange} value={null} type="text" name="dsa" id="dsa" /></td>

                <td><button onClick={submitDataToDb}>submit</button></td>
              </tr>

            </table>
            : null
        }
      </>

    </div>
  )
}
