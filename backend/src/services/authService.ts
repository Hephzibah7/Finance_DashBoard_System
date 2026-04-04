import authRepositary from "../repositaries/authRepositary.js";

async function login(body:any){
     const {email, password}= body;
        var data={
            email,
            password
        }
        const userCredentials=await authRepositary.loginUser(data);
        return userCredentials;
}

const authService={
    login:login
}


export default authService;