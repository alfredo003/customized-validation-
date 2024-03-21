import express from "express";
import { validate } from "./validation";
const app = express();
app.use(express.json());
const schemaUser = {
    username:{
        required:'Username é Obrigatório'
    },
    password:{
        min:10,
        max:20
    },
    email:{
        type:'email',
        required:'emial is mandatory'
    }
}
app.post("/users",validate(schemaUser),(request,response)=>{
    return response.status(200).json(request.body)
})

app.listen(3000,()=> console.log("server is running"))