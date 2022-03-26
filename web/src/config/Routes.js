import LoginPage from '../components/pages/Login'
import ProfilePage from '../components/pages/Profile'
import RegisterPage from '../components/pages/Register'
import ListItemPage from '../components/pages/ListItem'
import ViewItemPage from '../components/pages/ViewItem'
import FilterItemPage from '../components/pages/FilterItem'
import ViewUserPage from '../components/pages/ViewUser'
import ViewHistoryPage from '../components/pages/ViewHistory'

const components = {
    home: {
        url: "/",
        component: LoginPage
    },
    login: {
        url: "/login",
        component: LoginPage
    },
    profile: {
        url: "/profile",
        component: ProfilePage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
    listItem: {
        url: "/list_item",
        component: ListItemPage
    },
    viewItem: {
        url: "/view_item",
        component: ViewItemPage
    },
    filterItem: {
        url: "/filter_item",
        component: FilterItemPage
    },
    viewUser: {
        url: "/view_user",
        component: ViewUserPage
    },
    viewHistory: {
        url: "/view_history",
        component: ViewHistoryPage
    },
};

// Which role can access which pages?
// If they access other routes, redirect them
export default {
    guest: {
        allowedRoutes: [
            components.home,
            components.login,
            components.register,
        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.home,
            components.profile,
            components.viewItem,
            components.listItem,
            components.filterItem,
            components.viewUser,
            components.viewHistory,
        ],
        redirectRoutes: "/profile"
    },
}

