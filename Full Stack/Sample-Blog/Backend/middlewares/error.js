const error_handling = (err, req, res, next) => {
  console.error('Error:', err.stack); // Log the error stack for debugging
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message // Provide the error message
  });
};

module.exports = error_handling;
