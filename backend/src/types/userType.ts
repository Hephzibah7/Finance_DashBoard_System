
import roleType from './roleType.js'
interface userType{
    name:string,
    email:string,
    password:string,
    status:string|null,
    role:roleType|null
}

export default userType