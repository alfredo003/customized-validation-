import { Request,Response,NextFunction } from "express"

function validate(schema:any)
{
    const validation = (request:Request,response:Response,next:NextFunction)=>{
        const {body} = request;
        const erros:string[] = [];

        Object.keys(schema).forEach(itemSchema=>{
          console.log(body[itemSchema]) 
        })

        return next();
    }

    return validation
}
export {validate}