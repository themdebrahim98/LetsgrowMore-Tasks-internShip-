import React, { useState } from 'react'
import './DashBoard.css'
import DashBoardDatas from './DashBoardDatas'
import ClassManage from './ClassManage'
import StudentsManage from './StudentsManage'
import AttendenceManage from './AttendenceManage'
import ResultsManage from './ResultsManage'
export default function DashBoard(props) {

    const [currentTab, setcurrentTab] = useState(0);
    const componentsArray = [<DashBoardDatas />, <StudentsManage />, <ClassManage />,<AttendenceManage/>,<ResultsManage/>]

    const tabChange = (e)=>{
        const target = e.target;
        console.log(target.id);
        setcurrentTab(+target.id)
    }


    return (
        <div className="dashboard">

            <div class="sidenav">
                <h1 style={{ color: 'red' }}>DashBoard</h1>
                <button id='0' onClick={tabChange} href="#services">Dashboard Datas</button>
                <button id='1' onClick={tabChange} href="#clients">Student Manage</button>
                <button id='2' onClick={tabChange} href="#contact">Class Manage</button>
                <button id='3' onClick={tabChange} href="#contact">Attendence Manage</button>
                <button id='4' onClick={tabChange} href="#contact">Results Manage</button>
            </div>
            {/* <DashBoardDatas/> */}
            <div className="main">
                <div className="login" style={{display:'flex',justifyContent:'end'}}>
                    <p>  {props.username}</p>
                    {
                        console.log(props,'props')
                    }
                </div>
              {componentsArray[currentTab]}


            </div>


        </div>
    )
}
