let express = require("express");
const { dbConnection } = require("./DbConnection");
const { ObjectId } = require("mongodb");
const app = express();
app.use(express.json());

app.post("/student-read", async (req, res) => {
  let mydb = await dbConnection();
  // let studentCollection = mydb.collection('students');
  let data = await studentCollection.find().toArray();
  let resobj = {
    status: "success",
    message: "Data read successfully",
    data,
  };

  res.send(resobj);
});

app.post("/student-insert", async (req, res) => {
  let mydb = await dbConnection();
  let studentCollection = mydb.collection("students");
  //   obj = {
  //     sName: req.body.sName,
  //     sEmail: req.body.sEmail,
  //   };
  let obj = ({ sName, sEmail } = req.body);

  let check = await studentCollection.findOne({ sEmail });
  if (check) {
    let resobj = {
      status: "error",
      message: "Email already exist",
    };
    res.send(resobj);
    return;
  }

  let insertres = await studentCollection.insertOne(obj);
  // res.json(insertres);
  let resobj = {
    status: "success",
    message: "Data inserted successfully",
    insertedId: insertres.insertedId,
    insertres,
  };
  res.send(resobj);
});

app.delete("/student-delete/:id", async (req, res) => {
  console.log("hello");

  let id = req.params;
  let mydb = await dbConnection();
  let studentCollection = mydb.collection("students");
  let delres = await studentCollection.deleteOne({ _id: new ObjectId(id) });
  let resobj = {
    status: "success",
    message: "Data delete successfully",
    delres,
  };

  res.send(resobj);
});

app.put("/student-update/:id", async (req, res) => {
  console.log("hello");

  let id = req.params;
  let mydb = await dbConnection();
  let studentCollection = mydb.collection("students");
  let { sName, sEmail } = req.body;
  obj = {};
  if (sName !== undefined && sName !== null && sName !== "") {
    obj.sName = sName;
  }
  if (sName !== undefined && sName !== null && sName !== "") {
    obj.sEmail = sEmail;
  }
  let upres = await studentCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: obj }
  );
  let resobj = {
    status: "success",
    message: "update successfully",
    upres,
  };

  res.send(resobj);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
