const mongoose = require('mongoose');

// HERE THE DATABASE NAME IS (UserMessage)

mongoose.connect("mongodb://localhost:27017/RegistrationDetails",{
    useUnifiedTopology:true,
    useNewUrlParser:true
  }).then(() => {
    console.log("Connection Connect Successfully");
}).catch((e)=>{
    console.log("Connection Connect Failed");
    
})