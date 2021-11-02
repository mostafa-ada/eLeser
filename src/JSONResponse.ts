class JSONResponse {

    //
    constructor() {}

    //
    static success(req: any, res: any, message: any, data: any )
    {
        res.status(200).json({
            code: 200,
            message: message || 'success',
            data: data
        })

    }
    //
    static serverError(req: any, res: any, message: any, data: any)
    {
        res.status(500).json({
            code: 500,
            message: message || 'Internal server error',
            error: data
        })


    }

}

// export
export default JSONResponse;


// rowdata = fs.read()
// data = JSON.parse(rowdata.oString());