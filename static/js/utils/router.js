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
import adminBooks from "../component/adminBooks.js";
import addBook from "../pages/addBook.js";
import readBook from "../pages/readBook.js";
import editBook from "../pages/editBook.js";
import deleteBook from "../pages/deleteBook.js";
import searchFormA from "../pages/searhFormA.js";
import searchFormU from "../pages/searchFormU.js";
import userBook from "../component/userBook.js";
import userSection from "../component/userSection.js";
import browseSection from "../pages/browseSection.js";
import rateBook from "../pages/rateBook.js";
import requestBook from "../pages/requestBook.js";
import adminRequests from "../component/adminRequests.js";

const routes=[
    {path:"/", component:Home},
    {path:"/login", component:Login},
    {path:"/register", component:Register},
    {path:"/admin", component:Admin, children:[
        {path:"/admin/sections", component:adminSection},
        {path:"/admin/books", component:adminBooks},
        {path:"/admin/requests",component:adminRequests}
    ]},
    {path:"/user", component:User, children:[
        {path:"/user/sections", component:userSection},
        {path:"/user/books", component:userBook}
    ]},
    {path:"/edit/profile",component:EditProfile},
    {path:"/add/section",component:addSection},
    {path:"/edit/section/:id",component:editSection},
    {path:"/delete/section/:id",component:deleteSection},
    {path:"/add/book", component:addBook},
    {path:"/read/book/:bookid",component:readBook},
    {path:"/edit/book/:bookid",component:editBook},
    {path:"/delete/book/:bookid",component:deleteBook},
    {path:"/search/book",component:searchFormA},
    {path:"/search/user/book",component:searchFormU},
    {path:"/browse/section",component:browseSection},
    {path:"/rate/book/:bookid",component:rateBook},
    {path:"/request/book/:bookid",component:requestBook}
]

const router = new VueRouter({
    routes,
});

export default router;