const mongoose = require("mongoose");
require("dotenv").config();
let enqueryModel = require("./models/enquiry.model");
let express = require("express");
let app = express();
app.use(express.json());

app.post("/api/enquery-insert", (req, res) => {
  console.log("Request came");
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let enquery = new enqueryModel({
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  });
  console.log(sName, sEmail, sPhone, sMessage);
  enquery
    .save()
    .then(() => {
      res.send({ status: 1, message: "query save sucessfully" });
    })
    .catch((err) => {
      res.send({
        status: 1,
        message: "error while saving enquiry",
        error: err,
      });
    });
});

app.get("/api/enqurey-list", async (req, res) => {
  let enquery = await enqueryModel.find();
  obj = {
    status: 1,
    message: "list of data is here",
    data: enquery,
  };
  res.send(obj);
});

app.delete("/api/enquery-delete/:id", async (req, res) => {
  let id = req.params.id;
  let enquery = await enqueryModel.deleteOne({ _id: id });
  res.send({ status: 1, message: "deleted successfully", data: enquery });
});

app.put("/api/enquery-update/:id", async (req, res) => {
  let id = req.params.id;
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let enquery = await enqueryModel.updateOne(
    { _id: id },
    {
      name: sName,
      email: sEmail,
      phone: sPhone,
      message: sMessage,
    }
  );
  res.send({ status: 1, message: "updated successfully", data: enquery });
});

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Database connected");
  app.listen(process.env.PORT);
});
