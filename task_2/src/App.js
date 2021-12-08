import React, { useState } from 'react';

import './App.css';
import Spinner from 'react-bootstrap/Spinner'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/cards/Card';
function App() {

	const [users, setUsers] = useState([]);
	const [loading, setloading] = useState(false);

	const getUser = () => {
		console.log('before');
		setloading(true)
		const time = setTimeout(async () => {
			const resPonse = await fetch('https://reqres.in/api/users?page=1');
			const jsonResponse = await resPonse.json();
			console.log(jsonResponse);
			setloading(false);
			setUsers(jsonResponse.data)

		}, 3000);
		console.log('sfter');
		return ()=>clearTimeout(time)

	}



	return (

		<div className="App">
		

			<div className="nav">
				<div className="logo">
					Logo
				</div>
				<div className="fetchButton">
					<button onClick={getUser}>Get Users</button>
				</div>
			</div>

			{
				users.length > 0 ?

					(<div className="row">
						{
							users.map((user, idx) => {
								const userData = user;
								return (
									<div className="col">
										<Card userData={userData} />
									</div>
								)
							})
						}

					</div>)
					: null
			}

			{
				loading ? (<div class="loader"></div>) : null
			}












		</div>
	);
}

export default App;
