import { Request } from "express"

interface requestType extends Request{
    user:string
}

export default requestType;