# Customized Validation

## Description
This is a middleware function designed to validate request body parameters based on a provided schema. It checks for required fields, minimum and maximum lengths, and formats using regular expressions.


## Usage
To use this validation middleware in your Express application, follow these steps:

1. Import the `validate` function from the module into your Express application.
2. Define a schema object specifying the validation rules for each parameter you want to validate.
3. Apply the `validate` middleware function to your Express routes, passing in the schema object.

### Example
```javascript
import express, { Request, Response } from 'express';
import { validate } from './path/to/validateMiddleware';

const app = express();

// Define schema for request validation
const schema = {
  email: {
    required: true,
    regex: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
    min: 5,
    max: 50
  }
};

// Apply validation middleware to route
app.post('/example', validate(schema), (req: Request, res: Response) => {
  // Route logic here
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Schema Object
The schema object defines the validation rules for each parameter. Each key in the schema object corresponds to a parameter in the request body. The value associated with each key is an object containing the following properties:

- `required` (optional): Boolean indicating whether the parameter is required. Defaults to `false`.
- `min` (optional): Minimum length allowed for the parameter value.
- `max` (optional): Maximum length allowed for the parameter value.
- `regex` (optional): Regular expression pattern for validating the parameter format.

## Validation Process
1. The middleware extracts the request body from the incoming request.
2. It iterates over each parameter specified in the schema.
3. For each parameter, it checks if it's required and if it exists in the request body.
4. If the parameter exists and has a min/max length, it validates the length.
5. If the parameter has a regex pattern, it validates the format.
6. If any validation errors occur, it returns a 400 Bad Request response with an array of error messages.
7. If no errors occur, it calls the next middleware function.

 