function validation(schema){
    return async (req, res, next) => {
        try {
            const validatedData = await schema.validate(req.body, {abortEarly: false});
            req.body = validatedData;
            next();
        } catch (err) {
            res.status(400).json(err);
        }
    }
} 

export default validation;