import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './StudentLogin.css';

import { state, setState, getstate } from '../state';

export default function StudentLogin() {


    const [inputDatas, setInputDatas] = useState({
        userName: null,
        password: null
    });
    const [isLoggedIn, setisLoggedIn] = useState(null)
    const history = useHistory();


    const handlechange = (e) => {
        const target = e.target;
        const { name, value } = target;
        setInputDatas({ ...inputDatas, [name]: value })

    }


    const dataSubmit = async (e) => {
        console.log(inputDatas)
        e.preventDefault();
        console.log('sub');
        const url = "http://localhost:5000/api/student/login/777";
        const response = await axios.post(url, inputDatas
        );

        const result = response.data;
        setisLoggedIn(result.loginStatus);
        console.log(result)
        //  localStorage.setItem("islogin",true);




        // console.log(res)
    }

    useEffect(() => {
        if (isLoggedIn) {
            state.login = true
            console.log(isLoggedIn, "last")
            history.push('/admin/dashboard')
        } else {
            state.login = false


        }

        // isLoggedIn?history.push('/admin/dashboard'):null;

    })


    return (
        <>
            {/* {
          !isLoggedIn?<h1>user not exist</h1>:null
        } */}

            <div className="admin_login">

                <div className="card">
                    <h1>Admin Login..</h1>
                    <form action="" onSubmit={dataSubmit}>

                        <div className="data">
                            <label For="userName">userName</label>
                            <input required={true} value={inputDatas.userName} onChange={handlechange} type="text" name="userName" id="userName" />
                        </div>

                        <div className="data">
                            <label htmlFor="password">PAssword</label>
                            <input required={true} value={inputDatas.password} onChange={handlechange} type="text" name="password" id="password" />
                        </div>
                       
                        <button type="submit">Submit</button>

                    </form>


                </div>



            </div>
        </>
    )
}
