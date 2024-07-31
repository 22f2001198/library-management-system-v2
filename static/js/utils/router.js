import Home from "../pages/home.js";
import Login from "../pages/login.js";
import Register from "../pages/register.js";
import Admin from "../pages/admin.js";
import User from "../pages/user.js";
import EditProfile from "../pages/editProfile.js";
import adminSection from "../component/adminSection.js";
import addSection from "../pages/addSection.js";
import editSection from "../pages/editSection.js";
import deleteSection from "../pages/deleteSection.js";

const routes=[
    {path:"/", component:Home},
    {path:"/login", component:Login},
    {path:"/register", component:Register},
    {path:"/admin", component:Admin, children:[
        {path:"/admin/sections", component:adminSection},
    ]},
    {path:"/user", component:User},
    {path:"/edit/profile",component:EditProfile},
    {path:"/add/section",component:addSection},
    {path:"/edit/section/:id",component:editSection},
    {path:"/delete/section/:id",component:deleteSection}
]

const router = new VueRouter({
    routes,
});

export default router;