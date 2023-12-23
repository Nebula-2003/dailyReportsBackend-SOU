const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const invalidFields = {};
        error.details.forEach((detail) => {
            const fieldName = detail.path.join(".");
            const givenType = typeof detail.context.value;
            const expectedType = detail.type;
            invalidFields[fieldName] = { givenType, expectedType };
        });
        res.status(400).json({ error: "Validation error", invalidFields });
    } else {
        next();
    }
};

export { validateBody };
