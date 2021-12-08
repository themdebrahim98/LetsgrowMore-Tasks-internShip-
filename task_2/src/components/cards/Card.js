import React from 'react'
import './Card.css'

export default function Card({userData}) {
    return (
        <React.Fragment>
            <div className="wrapper">
                <div className="card">
                    <div className="cardData">
                        <img src={userData.avatar} alt="" />
                        <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
                        <p>{userData.email}</p>
                    </div>
                    
                </div>
            </div>

        </React.Fragment>
    )
}
