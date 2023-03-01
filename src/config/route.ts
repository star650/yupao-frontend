// 2. 定义一些路由 每个路由都需要映射到一个组件。
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue"
import  TeamUpdatePage from "../pages/TeamUpdatePage.vue"
import  UserUpdatePage from "../pages/UserUpdatePage.vue"
import  UserTeamJoinPage from "../pages/UserTeamJoinPage.vue"
import  UserTeamCreatePage from "../pages/UserTeamCreatePage.vue"

const routes = [
    { path: '/', component: Index },
    { path: '/team',title:'找队伍', component: Team },
    {path: '/user',title:'个人信息',component: User},
    {path: '/search',title:'找伙伴',component: SearchPage},
    {path: '/user/list',title:'用户列表',component: SearchResultPage},
    {path: '/user/edit',title:'编辑信息',component: UserEditPage},
    {path: '/user/login',title:'登录',component: UserLoginPage},
    {path: '/team/add',title:'创建队伍',component: TeamAddPage},
    {path: '/team/update',title:'更新信息',component: TeamUpdatePage},
    {path: '/user/update',title:'更新当前用户信息',component: UserUpdatePage},
    {path: '/user/team/join',title:'我加入的队伍', component: UserTeamJoinPage},
    {path: '/user/team/create',title:'我创建的队伍',component: UserTeamCreatePage},

]

export default routes;