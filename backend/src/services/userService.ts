import userRepositary from "../repositaries/userRepositary.js";
import userType from "../types/userType.js";

async function createUser(body:any) {
    const {name, email, password, role} = body;
       
        const obj={
            name, email, password, role
        }
        await userRepositary.createUser(obj as userType);
}

async function deleteUser(userId:string){
    await userRepositary.deleteUser(userId as string);
}
async function updateRole(userId:string, role:string){
     await userRepositary.updateRole(userId as string,role as string);
}
async function updateStatus(userId:string, status:string){
    await userRepositary.updateStatus(userId as string, status as string);
}
const userService={
    createUser:createUser,
    deleteUser:deleteUser,
    updateRole:updateRole,
    updateStatus:updateStatus
}

export default userService;