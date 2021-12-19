import React, { useState } from 'react'
import './StudentDashboard.css'
import ResultView from './ResultView'
import StudentProfile from './StudentProfile'
import Header from './Header'
import './Header.css'
export default function StudentDashBoard({ username }) {

  const [currentTab, setcurrentTab] = useState(0);
  const [admin, setadmin] = useState(username)
  const Array = [<Header />, <StudentProfile username={admin} adminChange = {adminChange} />, <ResultView username={username} />]


  const tabChange = (e) => {
    const target = e.target;
    console.log(target.id);
    setcurrentTab(+target.id)
  }

  function adminChange(newAdmin){

    setadmin(newAdmin);
  }

  return (
    <div class="studentDashBoardDatas">

      <span><i class="fas fa-user">{admin}</i></span>
      <div className="cards">

        <div id='0' onClick={tabChange} className="card">
          <h2>Header</h2>
          <h2> </h2>
        </div>

        <div id='1' onClick={tabChange} className="card">
          <h2>Profile View</h2>
          <h2> </h2>
        </div>
        <div id='2' onClick={tabChange} className="card">
          <h2>Result View</h2>
          <h2></h2>
        </div>

      </div>
      <div className="main">
        {Array[currentTab]}
      </div>

    </div>


  )
}
