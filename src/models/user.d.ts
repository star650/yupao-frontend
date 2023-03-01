
//定义数据类型
/**
 * 用户类别,记得导出一下（export）,profile表示用户简介
 */
export type UserType = {

    id:number;
    username:string;
    userAccount:string;
    avatarUrl?:string;
    //个人介绍
    profile?: string;
    gender:number;
    phone:string;
    email:string;
    userStatus:number;
    userRole:number;
    planetCode:string;
    tags:string[];
    createTime:Date;
};