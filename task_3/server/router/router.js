const router = require("express").Router();
const db = require("../connection");
const { v4: uuidv4 } = require("uuid");

router.post("/admin/signup", adminPermission, async (req, res) => {
  const data = req.body;
  data.uuid = uuidv4();
  const sql = "INSERT INTO admins SET ?";
  delete data.adminPermissionCode;
  console.log(data, "data");
  const sql2 = `SELECT userName FROM admins WHERE userName = '${data.userName}'`;
  const isRegistered = await promisedQuery(sql2);
  console.log(isRegistered);
  if (isRegistered.length <= 0) {
    try {
      const result = await promisedQuery(sql, data);
      res.status(200).json({ message: " user registered successfully" });
    } catch (err) {
      res.json({ message: "please filled all input" });
      console.log(err);
    }
  } else {
    res.json({ message: "user already registerd" });
  }
});

function adminPermission(req, res, next) {
  const data = req.body;
  console.log(req.body);
  let keyCode = 12345678;
  if (keyCode === Number(data.adminPermissionCode)) {
    console.log("matched");
    next();
  } else {
    res.json({ message: " adminPermissionCode not matched" });
    return 1;
  }
}
router.post("/student/signup", async (req, res) => {
  // const data = req.body;
  // data.uuid = uuidv4();
  // const sql = "INSERT INTO students SET ?";
  // db.query(sql, data, (err, result, filed) => {
  //   if (!err) {
  //     console.log("inserted");
  //     res.send(data);
  //   } else {
  //     console.log(err);
  //   }
  // });
  const data = req.body;
  data.uuid = uuidv4();
  const sql = "INSERT INTO students SET ?";
  // delete data.adminPermissionCode;
  console.log(data, "data");
  const sql2 = `SELECT userName FROM students WHERE userName = '${data.userName}'`;
  const isRegistered = await promisedQuery(sql2);
  console.log(isRegistered);
  if (isRegistered.length <= 0) {
    try {
      const result = await promisedQuery(sql, data);
      res.status(200).json({ message: " user registered successfully" });
    } catch (err) {
      res.json({ message: "please filled all input" });
      console.log(err);
    }
  } else {
    res.json({ message: "user already registerd" });
  }
});

router.post("/student/login", studentAuth, (req, res) => {
  res.json({ loginStatus: true });
});

router.post("/admin/login/:id", adminAuth, (req, res) => {
  res.json({ loginStatus: true });
});

router.post("/adminprofile", async (req, res) => {
  try {
    const data = req.body;
    console.log(data,'profile')
    const sql = `SELECT * FROM admins WHERE userName = '${data.username}'`;
    const result = await promisedQuery(sql);
    res.send(result);
    console.log(result,'profile')
  } catch (error) {
    res.send("user not found");
  }
});

router.post("/adminprofileupdate", async (req, res) => {
  const data = req.body;
  console.log(data, "data");
  const sql1 = `UPDATE admins SET ? WHERE uuid = '${data.uuid}'; `;
  try {
    const reslult = await promisedQuery(sql1, data);
    res.send(reslult);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something error in database" });
  }
});

function adminAuth(req, res, next) {
  const data = req.body;
  console.log(req.params.id, "id");
  console.log(data);
  const sql = `select userName,password from admins where userName = '${data.userName}' and password = '${data.password}'`;
  db.query(sql, (err, result, filed) => {
    try {
      console.log(result);
      if (err) throw err;
      if (result.length > 0) {
        next();
      } else {
        console.log("invalid userName and Password");
        res.json({ loginStatus: false });
      }
    } catch (err) {
      console.log(err);
    }
  });
}

function studentAuth(req, res, next) {
  const data = req.body;
  console.log(data);
  const sql = `select userName,password from students where userName = '${data.userName}' and password = '${data.password}'`;
  db.query(sql, (err, result, filed) => {
    try {
      console.log(result);
      if (err) throw err;
      if (result.length > 0) {
        next();
      } else {
        console.log("invalid userName and Password");
        res.json({ loginStatus: false });
      }
    } catch (err) {
      console.log(err);
    }
  });
}


router.post("/studentprofile/", async (req, res) => {
  const data = req.body;
  //classHosterUserName, classDate, dept, year, subjectCode
  const sql1 = `SELECT * FROM students  WHERE userName = '${data.userName}' `;
  try {
    const result = await promisedQuery(sql1);
    if (result.length > 0) {
      res.json(result);
      console.log(result, "result");
    } else {
      console.log("dtudent not found");
      res.json([]);
    }
  } catch (error) {}
});

router.post("/studentprofileupdate", async (req, res) => {
  const data = req.body;
  console.log(data, "data");
  const sql1 = `UPDATE students SET ? WHERE uuid = '${data.uuid}'; `;
  try {
    const reslult = await promisedQuery(sql1, data);
    res.send(reslult);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something error in database" });
  }
});

router.get("/admin/allstudents/", async (req, res) => {
  const data = req.body;
  //classHosterUserName, classDate, dept, year, subjectCode
  const sql1 = `SELECT * FROM students  `;
  try {
    const result = await promisedQuery(sql1);
    if (result.length > 0) {
      res.json(result);
      console.log(result, "result");
    } else {
      console.log("class not found");
      res.json([]);
    }
  } catch (error) {}
});

router.post("/admin/studentupdate", async (req, res) => {
  const data = req.body;
  console.log(data, "data");
  const sql1 = `UPDATE students SET ? WHERE uuid = '${data.uuid}'; `;
  try {
    const reslult = await promisedQuery(sql1, data);
    res.send(reslult);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something error in database" });
  }
});

router.post("/admin/studentdelete", async (req, res) => {
  const data = req.body;
  const sql1 = `DELETE FROM students WHERE uuid = '${data.uuid}'`;
  try {
    const result = await promisedQuery(sql1);
    res.send("deleted successfully");
  } catch (err) {
    res.send("not deleted");
  }
});

// result

router.post("/admin/resultadd/", async (req, res) => {
  const data = req.body;
  data.uuid = uuidv4();
  let getUSerID;
  try {
    // const sql2 = `SELECT uuid from students WHERE userName = '${data.students_uuid}' `;
    // const getUseruuid = await promisedQuery(sql2);

    const sql1 = `SELECT uuid from students WHERE userName = '${data.students_uuid}' `;
    const result1 = await promisedQuery(sql1);
    getUSerID = result1[0].uuid;
    data.students_uuid = getUSerID;
  } catch (err) {
    res.send("user Name not exist");
    console.log(err);
  }

  try {
    const sql3 = `SELECT uuid from results WHERE students_uuid = '${getUSerID}' ;`;
    const result3 = await promisedQuery(sql3);
    console.log(result3, "result3");
    const sql2 = "INSERT INTO results SET ?";
    if (result3.length > 0) {
      res.send("user result already exist");
    } else {
      const result2 = await promisedQuery(sql2, data);
      res.send("inserted result");
    }
  } catch (error) {
    res.send("reault not inserted");
    console.log(error);
  }
});

router.post("/resultview/", async (req, res) => {
  const data = req.body;
  const sql = `SELECT students.name,students.userName, results.math,results.dbms,
    results.eng, results.signalSystem,results.algo,results.dsa, sum(math + dbms + algo + dsa + 
    signalSystem + eng) as total
    from students
    INNER JOIN results on students.uuid = results.students_uuid  WHERE userName  = '${data.userName}';`;
  try {
    
    const result = await promisedQuery(sql);
    if(result[0].userName === null){
      res.send([]);
    }else{

      res.send(result);
    }
  } catch (error) {
    res.send("result not found");
  }
});

router.get("/admin/allresultview/", async (req, res) => {
  //classHosterUserName, classDate, dept, year, subjectCode

  const sql1 = `SELECT results.uuid, students.name,students.userName, results.math,results.dbms,
  results.eng, results.signalSystem,results.algo,results.dsa, (results.math + results.dbms +
  results.eng+ results.signalSystem+results.algo+results.dsa) as total
  from students
  INNER JOIN results on students.uuid = results.students_uuid;;`;

  try {
    const result = await promisedQuery(sql1);
    if (result.length > 0) {
      res.json(result);
      console.log(result, "result");
    } else {
      console.log("class not found");
      res.json([]);
    }
  } catch (error) {}
});

router.post("/admin/resultupdate", async (req, res) => {
  const { uuid, math, dsa, algo, eng, dbms, signalSystem, userName } = req.body;
  const data = {
    uuid,
    math,
    dsa,
    algo,
    eng,
    dbms,
    signalSystem,
    userName,
  };
  const sql2 = `SELECT uuid from students WHERE userName = '${userName}'`;
  const getUSerID = await promisedQuery(sql2);
  data.students_uuid = getUSerID[0].uuid;
  delete data.userName;
  console.log(data, "rrr", getUSerID);
  const sql1 = `UPDATE results SET ? WHERE uuid = '${data.uuid}'; `;
  try {
    const reslult = await promisedQuery(sql1, data);
    res.send(reslult);
    console.log(data);
  } catch (err) {
    res.json({ message: "something error in database" });
    console.log(err);
  }
});

router.post("/admin/resultdelete", async (req, res) => {
  const data = req.body;
  const sql1 = `DELETE FROM results WHERE uuid = '${data.uuid}'`;
  try {
    const result = await promisedQuery(sql1);
    res.send("deleted successfully");
  } catch (err) {
    res.send("not deleted");
  }
});

router.post("/admin/classadd/", async (req, res) => {
  const data = req.body;
  data.uuid = uuidv4();
  const sql1 = "INSERT INTO classes SET ?";

  try {
    const result2 = await promisedQuery(sql1, data);
    res.send("inderted class");
  } catch (err) {
    console.log("error", err);
  }
});

router.post("/admin/classview/", async (req, res) => {
  const data = req.body;
  //classHosterUserName, classDate, dept, year, subjectCode
  const sql1 = `SELECT * FROM classes WHERE 
      classHoster = '${data.classHoster}' and classDate = '${data.classDate}' and dept = '${data.dept}' and year = '${data.year}'
      and subjectCode = '${data.subjectCode}'
      
      `;
  try {
    const result = await promisedQuery(sql1);
    if (result.length > 0) {
      res.json(result);
      console.log(result, "result");
    } else {
      console.log("class not found");
      res.send([]);
    }
  } catch (error) {}
});

router.post("/admin/classupdate", async (req, res) => {
  const data = req.body;
  const sql1 = `UPDATE classes SET ? WHERE uuid = '${data.uuid}'; `;
  try {
    const reslult = await promisedQuery(sql1, data);
    res.send(reslult);
    console.log(data);
  } catch (err) {
    res.json({ message: "something error in database" });
  }
});

router.get("/admin/allclassview/", async (req, res) => {
  const data = req.body;
  //classHosterUserName, classDate, dept, year, subjectCode
  const sql1 = `SELECT * FROM classes  `;
  try {
    const result = await promisedQuery(sql1);
    if (result.length > 0) {
      res.json(result);
      console.log(result, "result");
    } else {
      console.log("class not found");
      res.json([]);
    }
  } catch (error) {}
});

router.post("/admin/classdelete", async (req, res) => {
  const data = req.body;
  const sql1 = `DELETE FROM classes WHERE uuid = '${data.uuid}'`;
  try {
    const result = await promisedQuery(sql1);
    res.send("deleted successfully");
  } catch (err) {
    res.send("not deleted");
  }
});

// attendence

router.post("/admin/attendencess/", async (req, res) => {
  try {
    const data = req.body;
    // data.uuid = uuidv4();

    const sql1 = `SELECT uuid from students WHERE userName = '${data.userName}' `;

    const getUseruuid = await promisedQuery(sql1);

    console.log(getUseruuid, "getuserid");

    // const sql3 = "INSERT INTO classes SET ?";
    const sql2 = `SELECT uuid from classes WHERE classHoster = '${data.classHoster}' and year =  '${data.year}' and dept = '${data.dept}' 
		  and classDate = '${data.classDate}' and subjectCode = '${data.subjectCode}'
		  
		  `;

    const getClassuuid = await promisedQuery(sql2);
    console.log(getClassuuid, "getclassid");

    const sql3 = "INSERT INTO attendencess SET ?";
    data.uuid = uuidv4();

    const attendencessData = {};
    attendencessData.uuid = uuidv4();
    attendencessData.students_uuid = getUseruuid[0].uuid;
    attendencessData.attendenceStatus = data.attendenceStatus;
    attendencessData.classes_uuid = getClassuuid[0].uuid;

    // attendence check(duplicacy)
    const sql4 = `SELECT classes_uuid,students_uuid FROM attendencess WHERE classes_uuid = '${getClassuuid[0].uuid}' && students_uuid = '${getUseruuid[0].uuid}'`;
    const isAttendenced = await promisedQuery(sql4);
    console.log(isAttendenced, "is");
    // console.log(  attendencessData.classes_uuid, attendencessData.students_uuid)

    try {
      if (isAttendenced.length > 0) {
        res.send("user attendence already exists");
      } else {
        if (getClassuuid.length > 0 && getClassuuid.length > 0) {
          const reslut = await promisedQuery(sql3, attendencessData);
          console.log(reslut, "result");
          res.send(reslut);
        }
      }
    } catch (err) {
      console.log("username does not exist in students table");
    }
    console.log(attendencessData, "atten");
  } catch (error) {
    console.log(error);
    res.send("either user or class does not exist");
  }
});

router.post("/admin/attendencessview", async (req, res) => {
  try {
    const data = req.body;
    const sql1 = `SELECT uuid from students WHERE userName = '${data.userName}' `;
    const getUseruuid = await promisedQuery(sql1);

    const sql2 = `SELECT  classes.classHoster,classes.classDate,classes.subjectCode,
      attendencess.students_uuid,attendencess.attendenceStatus FROM attendencess INNER JOIN classes
      ON classes.uuid = attendencess.classes_uuid  WHERE attendencess.students_uuid = '${getUseruuid[0].uuid}';
      `;

    const attendenceResult = await promisedQuery(sql2);
    console.log(attendenceResult);
    res.send(attendenceResult);
  } catch (error) {
    res.send("something error");
  }
});

router.get("/admin/allattendenceview/", async (req, res) => {
  const data = req.body;
  //classHosterUserName, classDate, dept, year, subjectCode
  const sql1 = ` SELECT attendencess.uuid,students.name,students.userName,students.email,attendencess.attendenceStatus,attendencess.classes_uuid
  ,classes.classHoster
  FROM ((students
  INNER JOIN attendencess ON students.uuid = attendencess.students_uuid )
  INNER JOIN classes ON   attendencess.classes_uuid = classes.uuid); `;
  try {
    const result = await promisedQuery(sql1);
    if (result.length > 0) {
      res.json(result);
      console.log(result, "result");
    } else {
      console.log("attendence not found");
      res.json([]);
    }
  } catch (error) {}
});

router.post("/admin/attendencedelete", async (req, res) => {
  const data = req.body;
  console.log(data);
  const sql1 = `DELETE FROM attendencess WHERE uuid = '${data.uuid}'`;
  try {
    const result = await promisedQuery(sql1);
    res.send("deleted successfully");
  } catch (err) {
    res.send("not deleted");
  }
});

router.post("/admin/attendenceupdate", async (req, res) => {
  const data = req.body; // incomming data

  const newData = {};
  newData.uuid = data.uuid;
  newData.attendenceStatus = data.attendenceStatus;
  newData.classes_uuid = data.classes_uuid;

  // incomming data change
  console.log(newData, "body");
  const sql1 = `UPDATE attendencess SET ? WHERE uuid = '${data.uuid}'; `;
  try {
    const reslult = await promisedQuery(sql1, newData);
    res.send(reslult);
  } catch (err) {
    console.log(err);
    res.json({ message: "something error in database" });
  }
});

router.get("/admin/dashboarddatas", async (req, res) => {
  let arr = [];

  const sql1 = `SELECT count(uuid) as adminsCount FROM admins;`;
  const result1 = await promisedQuery(sql1);
  const sql2 = `SELECT count(uuid) as classesCount  FROM classes;`;
  const result2 = await promisedQuery(sql2);
  const sql3 = `SELECT count(uuid) as studentsCount  FROM students;`;
  const result3 = await promisedQuery(sql3);
  const sql4 = `SELECT count(uuid) as results  FROM results;`;
  const result4 = await promisedQuery(sql4);
  const sql5 = `SELECT count(uuid) as attendencess  FROM attendencess;`;
  const result5 = await promisedQuery(sql5);

  console.log(result1, result2, result3, result4, result5);

  arr = [...arr, result1[0], result2[0], result3[0], result4[0], result5[0]];
  console.log(arr[0].adminsCount);
  res.send(arr);
});

function promisedQuery(sql, data = null) {
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = router;
