import { Navigate, useRoutes } from "react-router-dom"
import Dashboard from "../pages/admin/Dashboard.page"
import DashboardLayout from "../components/layouts/Dashboard.layout"
import FlowManagement from "../pages/admin/Flow.page"
import OtherService from "../pages/admin/OtherService.page"

const AdminRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="dashboard" replace />,
        },
        {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
                {
                    path: "",
                    element:  <Dashboard />,
                },
                {
                    path: "flow",
                    element:  <FlowManagement />,
                },
                {
                    path: "other-services",
                    element:  <OtherService />,
                },
            ]
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ])
}

export default AdminRoutes