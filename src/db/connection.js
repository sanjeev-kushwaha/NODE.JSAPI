const mongoose = require('mongoose');

// HERE THE DATABASE NAME IS (UserMessage)

mongoose.connect("mongodb+srv://sanjeevkush06:<db_password>@dbs24.uqlvy.mongodb.net/?retryWrites=true&w=majority&appName=dbs24",{
    useUnifiedTopology:true,
    useNewUrlParser:true
  }).then(() => {
    console.log("Connection Connect Successfully");
}).catch((e)=>{
    console.log("Connection Connect Failed");
    
})
