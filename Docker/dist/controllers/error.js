const error_handling = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
};
export default error_handling;
