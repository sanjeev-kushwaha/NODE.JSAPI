const express = require("express");
require("../src/db/connection");

const UsersDetail = require("./models/table");
const bcryptjs = require("bcryptjs");
const config = require("./config/config");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.port || 5000;


//================ ===> All Authentication  code like user Registration and User Login with JWT Token are Start  👇👇👇/////////////

const createToken = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, config.secret_jwt);
    return token;
  } catch (error) {
    resp.status(400).send(error.message);
  }
};
//==========> END TOKEN <==============//
//==========> Hashing Password start 👇👇👇
app.use(express.json());
const securePassword = async (Password) => {
  try {
    const PasswordHash = await bcryptjs.hash(Password, 10);
    return PasswordHash;
  } catch (error) {}
};
// Hashing Password END  ⛔⛔⛔

//=============> MAIN CODE START FOR REGISTER USER 👇👇👇<=============/
app.post("/Insert", async (req, resp) => {
  try {
    const spassword = await securePassword(req.body.Password);
    const addUsersDetail = new UsersDetail({
      FullName: req.body.FullName,
      EmailAddress: req.body.EmailAddress,
      Password: spassword,
      PhoneNumber: req.body.PhoneNumber,
      Gender: req.body.Gender,
      DOB: req.body.DOB,
    });
    const insertdetail = await addUsersDetail.save();
    resp.status(201).send(insertdetail);
  } catch (e) {
    resp.status(404).send(e);
  }
});
// ===========> REGISTER USER END ⛔⛔⛔ <=================

///// /////////Handle USER LOGIN (POST METHOD)👇👇👇///////////////

app.post("/login", async (req, resp) => {
  try {
    const EmailAddress = req.body.EmailAddress;
    const Password = req.body.Password;
    const userdata = await UsersDetail.findOne({ EmailAddress: EmailAddress });
    if (userdata) {
      const passwordmatch = await bcryptjs.compare(Password, userdata.Password);
      if (passwordmatch) {
        const tokendata = await createToken(userdata._id);
        const userresult = {
          _id: userdata._id,
          FullName: userdata.FullName,
          EmailAddress: userdata.EmailAddress,
          Password: userdata.Password,
          PhoneNumber: userdata.PhoneNumber,
          Gender: userdata.Gender,
          DOB: userdata.DOB,
          token: tokendata,
        };
        const response = {
          success: true,
          msg: "User Details",
          data: userresult,
        };
        resp.status(200).send(response);
      } else {
        resp
          .status(200)
          .send({ success: false, msg: "Incorrect Email & Password" });
      }
    } else {
      resp
        .status(200)
        .send({ success: false, msg: "Incorrect Email & Password" });
    };
  } catch (e) {
    resp.status(400).send(e);
  }
});

//////////////////////// End Auth code /////////////////////////


/////////////////////// DB Connection Return Message ////////////
app.get("/", async (req, resp) => {
  resp.send("hello from the sanjeev");
});
app.listen(port, () => {
  console.log(`connection is live at port no. ${port}`);
});
/////////////////////// END //////////////////////

  // const userdata = await user.findOne({
    //   EmailAddress: req.body.EmailAddress,
    // });

    // if (userdata) {
    //   resp
    //     .status(201)
    //     .send({ success: false, msg: "This Email is Already Exists" });
    // } else {
    //   const user_data = await user.save();
    //   resp.status(201).send({ success: true, data: user_data });
    // }

    // console.log(addUsersDetail);