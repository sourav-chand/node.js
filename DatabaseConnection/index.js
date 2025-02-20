
let express = require('express');
const {dbConnection} = require('./DbConnection');
const app = express();
app.use(express.json());

app.get('/student-read',(req,res)=>{
    res.send('students view api');
});

app.post('/student-insert', async(req,res)=>{
    console.log("hello");
    let mydb = await dbConnection();
    let studentCollection = mydb.collection('students');
    console.log("hello");
    obj = {
        sName: req.body.sName,
        sEmail: req.body.sEmail
    }
    console.log(obj);
    // let {sName,sEmail} = req.body;
    // let obj = {sName,sEmail};
    let insertres = await studentCollection.insertOne(obj);
    // res.json(insertres);
    let resobj = {
        status: 'success',
        message: 'Data inserted successfully',
        // insertedId: insertres.insertedId,
        // insertres
    }
    res.send(resobj);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
