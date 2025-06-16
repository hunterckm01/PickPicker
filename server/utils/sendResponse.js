export function sendResponse(res, statusCode, success, message, options = {}){
    return res.status(statusCode).json({
        success,
        message,
       ...options                                  
    })
}


// Check sending error respnse from wherever you're using this
export function sendErrorResponse(res, statusCode, message, options = {}){
    return res.status(statusCode).json({
        success: false,
        message: message,
        ...options
    })
}

export function sendSuccessResponse(res, statusCode, message, options = {}){
    return res.status(statusCode).json({
        success: true,
        message: message,
        ...options
    })
}