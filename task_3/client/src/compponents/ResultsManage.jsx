
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './StudentsManage.css'
import ResultsAdd from './ResultsAdd';


export default function ResultsManage() {

	const [fetchDatas, setfetchDatas] = useState([]);
	const [currentEditData, setcurrentEditData] = useState({});
	const [currentEditId, setCurrentEditId] = useState({})
	const [isSubmittedDataToDb, setisSubmittedDataToDb] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [isRefresh, setisRefresh] = useState(false);






	const handleChange = (e) => {
		console.log('object', e.target.parentNode);
		setcurrentEditData({ ...currentEditData, [e.target.name]: e.target.value })
	}

	const submitDataToDb = async () => {
		const url = 'http://localhost:5000/api/admin/resultupdate';
		const response = await axios.post(url, currentEditData);
		console.log(response, 'response');
		setisSubmittedDataToDb(true);
		setcurrentEditData({});
		setCurrentEditId({});
		alert("successfully added")
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
			const url = 'http://localhost:5000/api/admin/resultdelete';
			const response = await axios.post(url, { "uuid": id });
			console.log(response, 'response');
			console.log('deleted');
			alert(response.data)

		}
	}


	const refresh = () => {
		setisRefresh((prev) => !prev);
		console.log('refresh')

	}

	useEffect(async () => {
		const url = "http://localhost:5000/api/admin/allresultview";
		const response = await axios.get(url);

		const result = response.data;
		setisSubmittedDataToDb(false)
		console.log(result);
		setfetchDatas(result)
		console.log('count')

	}, [isSubmittedDataToDb, isRefresh]);


	return (
		<div className='studentsmanage'>

			<ResultsAdd />


			<h1>Result manage</h1>
			<table style={{ width: "100%" }}>

				<tr>
					<th>uuid</th>
					<th>name</th>
					<th>userName</th>
					<th>math</th>
					<th>dbms</th>
					<th>eng</th>
					<th>signalSystem</th>
					<th>algo</th>
					<th>dsa</th>
					<th>total</th>
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
									<td><input disabled={isDisabled} onChange={handleChange} name='name' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.name : elm.name} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='userName' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.userName : elm.userName} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='math' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.math : elm.math} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name="dbms" type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.dbms : elm.dbms} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='eng' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.eng : elm.eng} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='signalSystem' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.signalSystem : elm.signalSystem} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='algo' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.algo : elm.algo} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='dsa' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.dsa : elm.dsa} /></td>

									<td><input disabled={isDisabled} onChange={handleChange} name='total' type="text"
										value={elm.uuid === currentEditId.currentId ? currentEditData.total : elm.total} /></td>


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
