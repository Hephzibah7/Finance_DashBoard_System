import { Request } from "express"

interface RequestType extends Request{
    user:string
}

export default RequestType;