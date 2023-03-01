import {UserType} from "../models/user";
//主要目的是：定义一个变量用于缓存当前登录的用户
let currentUserState : UserType;

const setCurrentUserState = (user:UserType) =>{
    currentUserState = user;
}

const getCurrentUserState = ():UserType =>{
    return currentUserState;
}

export {
    getCurrentUserState,
    setCurrentUserState,
}

