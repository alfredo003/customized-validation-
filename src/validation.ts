import { Request,Response,NextFunction } from "express"

const validationRegex: any = {
  email: {
    regex: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
  }
}

function validate(schema:any)
{
    const validation = (request:Request,response:Response,next:NextFunction)=>
    {
        const {body} = request;
        const errors:string[] = [];

        Object.keys(schema).forEach(item=>{
            const itemSchema = schema[item];
            if(itemSchema.required && !body[item])
            {
              errors.push(`Campo - ${itemSchema.required}`)
            }
            if(itemSchema.min && (body[item].length < itemSchema.min))
            {
                errors.push(`Campo ${item} - O tamanha minimo is ${itemSchema.min}`)
            }
            if(itemSchema.max && (body[item].length > itemSchema.max))
            {
              errors.push(`Campo ${item} - O tamanha max is ${itemSchema.max}`)
            }
            const regexItem:any = validationRegex[item];

            if (regexItem && (!new RegExp(regexItem.regex).test(body[item])))
            {
              errors.push(`Campo ${item} está no formato incorreto!`)
            }
        });
        if(errors.length > 0) return response.status(400).json(errors)
        return next();
    }

    return validation
}
export {validate}