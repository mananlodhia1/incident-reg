const errorHandler = (err, req, res, next) => {
    console.error("Error Handler:", err);
  
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Something went wrong.",
      errorType: err.constructor.name, 
    });
  };
  
  export default errorHandler;
  