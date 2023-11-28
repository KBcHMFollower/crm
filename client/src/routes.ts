import { ClientPage } from "./pages/ClientPage/ClientPage";
import { ClientsPage } from "./pages/ClientsPage/ClientsPage";
import { LeadsPage } from "./pages/LeadsPage/LeadsPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { RolesPage } from "./pages/RolesPage/RolesPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import { WorkersPage } from "./pages/WorkersPage/WorkersPage";
import { CLIENTS_ROUTE, CLIENT_PROFILE_ROUTE, HOME_ROUTE, LEADS_ROUTE, LOGIN_ROUTE, ROLES_ROUTE, WORKERS_ROUTE, WORKER_PROFILE_ROUTE } from "./utils/consts";

export const adminRoutes = [
    {
        path: ROLES_ROUTE,
        element: RolesPage
    }
]

export const managerRoutes = [
    {
        path: LEADS_ROUTE,
        element: LeadsPage
    }
]

export const anyBodyRoutes = [
    {
        path: LOGIN_ROUTE,
        element: SignInPage
    },
    {
        path: WORKERS_ROUTE,
        element: WorkersPage
    },
    {
        path: WORKER_PROFILE_ROUTE,
        element: ProfilePage
    },
    {
        path: CLIENTS_ROUTE,
        element: ClientsPage
    },
    {
        path: CLIENT_PROFILE_ROUTE,
        element: ClientPage
    },
    {
        path: HOME_ROUTE,
        element: ProfilePage
    }
]