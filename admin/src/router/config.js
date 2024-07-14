import Center from "@/views/center/Center.vue";
import Home from "@/views/home/Home.vue";
import UserAdd from '../views/user_manage/UserAdd.vue'
import UserList from '../views/user_manage/UserList.vue'
import NewsAdd from "../views/news_manage/NewsAdd.vue";
import NewsList from "../views/news_manage/NewsList.vue";
import NewsPub from "@/views/news_manage/NewsPub.vue";
import NewsEdit from "@/views/news_manage/NewsEdit.vue";
import ProductAdd from "@/views/product_manage/ProductAdd.vue";
import ProductList from "@/views/product_manage/ProductList.vue";
import ProductEdit from "@/views/product_manage/ProductEdit.vue";
import NotFound from "../views/notfound/NotFound.vue";

// 动态添加路由的配置文件
const routes = [
    {
        path: '/index',
        component: Home
    },
    {
        path: '/center',
        component: Center
    },
    {
        path: '/user_manage/adduser',
        component: UserAdd
    },
    {
        path: '/user_manage/userList',
        component: UserList
    },
    {
        path: '/news_manage/addnews',
        component: NewsAdd
    },
    {
        path: '/news_manage/newslist',
        component: NewsList
    },
    {
        path: '/news_manage/newspub',
        component: NewsPub
    },
    {
        path: '/news_manage/editnews/:id',
        component: NewsEdit
    },
    {
        path: '/product_manage/addproduct',
        component: ProductAdd
    },
    {
        path: '/product_manage/productlist',
        component: ProductList
    }, 
    {
        path: '/product_manage/editproduct/:id',
        component: ProductEdit
    },
    {
        path: '/',
        redirect: '/index'
    }, {
        path: '/:pathMatch(.*)*',// 匹配所有路径(包括 404未定义的路径)
        name: 'NotFound',
        component: NotFound
    }
]

export default routes;