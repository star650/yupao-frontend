
//声明当前用户
import {onMounted, ref} from "vue";
import myAxios from "../plugin/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";

/**
 * 获取当前登录用户方法的抽取
 */


//如果变量缓存中不存在当前用户，向后端获取当前登录用户信息,
export const getCurrentUser = async () =>{

    // const currentUser = getCurrentUserState();
    // if (currentUser){
    //     return currentUser;
    // }

    //如果不存在，则从后端获取
    const res = await myAxios.get('/user/current');
    if (res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}