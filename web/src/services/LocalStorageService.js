//local storage functions for JWT authentication
function setToken(token){
    localStorage.setItem("ACCESS_TOKEN", token);
}

function getToken(){
    return localStorage.getItem("ACCESS_TOKEN");
}

function removeToken(){
    localStorage.removeItem("ACCESS_TOKEN");
}

function getRole(){
    if(getToken()){
        return "user";
    }
    return "guest";
}

//local storage functions for local user infomation
function getUser(){
    return localStorage.getItem("user");
}

export default{
    setToken,
    getToken,
    removeToken,
    getRole,
    getUser,
};