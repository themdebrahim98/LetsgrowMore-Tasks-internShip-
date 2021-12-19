import React, { useEffect, useState,useRef } from 'react'
import './ResultView.css'
import axios from 'axios'
export default function ResultView({ username }) {

  const resultviewRef = useRef();


  function print() {
    const result = resultviewRef.current.innerHTML;
    let a = window.open();
    console.log(a)
    a.document.write('<html>');
    a.document.write(result);
    a.document.write('</body></html>');
    a.document.close();
    a.print();



  }

  const [fetchDatas, setfetchDatas] = useState([])

  useEffect(async () => {
    const url = "http://localhost:5000/api/resultview";
    const response = await axios.post(url, { userName: username });
    const result = response.data;
    console.log(result);
    setfetchDatas(result)
    console.log('count')

  }, []);



  return (
    <>

    <div ref={resultviewRef} id='resultView' className='resultView'>
      <h1>Result view</h1>
      {
        fetchDatas.length > 0
          ? (<table style={{ width: "100%" }}>
            <h2>name:{fetchDatas[0].name}</h2>
            <h2>user Name : {fetchDatas[0].userName}</h2>
            {/* <h2>dept : {fetchDatas[0].dept}</h2>
            <h2>uyear : {fetchDatas[0].year}</h2> */}
            <tr>
              <th>subject</th>
              <th>mark</th>
              <th>out of</th>

            </tr>
            <tr>
              <th><input disabled value='algo' type="text" /></th>
              <th><input disabled value={fetchDatas[0].algo} type="text" /></th>
              <th><input disabled value={100} type="text" /></th>

            </tr>
            <tr>
              <th><input disabled value='dbms' type="text" /></th>
              <th><input disabled value={fetchDatas[0].dbms} type="text" /></th>
              <th><input disabled value={100} type="text" /></th>

            </tr>
            <tr>
              <th><input disabled value='eng' type="text" /></th>
              <th><input disabled value={fetchDatas[0].eng} type="text" /></th>
              <th><input disabled value={100} type="text" /></th>

            </tr>
            <tr>
              <th><input disabled value='dsa' type="text" /></th>
              <th><input disabled value={fetchDatas[0].dsa} type="text" /></th>
              <th><input disabled value={100} type="text" /></th>

            </tr>
            <tr>
              <th><input disabled value='math' type="text" /></th>
              <th><input disabled value={fetchDatas[0].math} type="text" /></th>
              <th><input disabled value={100} type="text" /></th>

            </tr>
            <tr>
              <th><input disabled value='signalSystem' type="text" /></th>
              <th><input disabled value={fetchDatas[0].signalSystem} type="text" /></th>
              <th><input disabled value={100} type="text" /></th>

            </tr>

          </table>)
          : null
      }
     


    </div>
    <button onClick={print} style={{backgroundColor:"green",marginBottom:"78px",cursor:"pointer",borderRadius:"15px",textAlign:"center"}}>print</button>
    </>
  )
}
