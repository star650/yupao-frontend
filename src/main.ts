import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import  { Button,NavBar,Icon,Tabbar,TabbarItem,Toast } from 'vant';
import { Search,Divider,Tag } from 'vant';
import * as VueRouter from 'vue-router';

import Vant from 'vant';
import 'vant/lib/index.css';
import "./global.css";
import routes from "./config/route";




const app = createApp(App);

app.use(Vant);


// app.use(Toast);
// app.use(Button);
// app.use(NavBar);
// app.use(Icon);
// app.use(Tabbar);
// app.use(TabbarItem);
// app.use(Search);
// app.use(Divider);
// app.use(Tag);

// 3. 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes
})

//整个应用支持路由。
app.use(router);

app.mount('#app');

