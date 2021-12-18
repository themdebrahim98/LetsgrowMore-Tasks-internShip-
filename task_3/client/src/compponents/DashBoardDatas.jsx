import axios from 'axios';
import React, { useEffect,useState } from 'react'
import './DashBoardDatas.css'

export default function DashBoardDatas() {

    const [fetchDatas, setfetchDatas] = useState([]);

    useEffect(async () => {
        const url = "http://localhost:5000/api/admin/dashboarddatas";
        const response = await axios.get(url);
        const result = response.data;
        console.log(result);
        setfetchDatas(result)

    }, [])




    return (
        <div class="dashBoardDatas">
            <div className="cards">

                <div className="card">
                    <h2>Total Admin</h2>
                    <h2>{fetchDatas.length>0? fetchDatas[0].adminsCount:null}</h2>
                </div>

                <div className="card">
                    <h2>Total Studens</h2>
                    <h2>{fetchDatas.length>0? fetchDatas[2].studentsCount:null}</h2>
                </div>
                <div className="card">
                    <h2>Total Classes</h2>
                    <h2> {fetchDatas.length> 0? fetchDatas[1].classesCount:null}</h2>
                </div>
                <div className="card">
                    <h2>Total Attendence</h2>
                    <h2> {fetchDatas.length> 0? fetchDatas[1].classesCount:null}</h2>
                </div>
                <div className="card">
                    <h2>Total Result</h2>
                    <h2> {fetchDatas.length> 0? fetchDatas[1].classesCount:null}</h2>
                </div>
                <div className="card">
                    <h2>Total Result</h2>
                    <h2> {fetchDatas.length> 0? fetchDatas[1].classesCount:null}</h2>
                </div>

            </div>

        </div>
    )
}
