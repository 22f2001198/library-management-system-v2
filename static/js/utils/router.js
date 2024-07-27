import Home from "../pages/home.js";
import Login from "../pages/login.js";
import Register from "../pages/register.js";
import Admin from "../pages/admin.js";
import User from "../pages/user.js";
import EditProfile from "../pages/editProfile.js";

const routes=[
    {path:"/", component:Home},
    {path:"/login", component:Login},
    {path:"/register", component:Register},
    {path:"/admin", component:Admin},
    {path:"/user", component:User},
    {path:"/edit/profile",component:EditProfile}
]

const router = new VueRouter({
    routes,
});

export default router;