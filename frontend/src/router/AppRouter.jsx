import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

// Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashBoardPage";
import LogsPage from "../pages/LogsPage";
import NewLogPage from "../pages/NewLogPage";
import EditLogPage from "../pages/EditLogPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import PublicProfilePage from "../pages/PublicProfilePage";


const AppRouter = () => {
    return (
        <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="u/:username" element={<PublicProfilePage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/logs" element={<LogsPage />} />
                    <Route path="/logs/new" element={<NewLogPage />} />
                    <Route path="/logs/:id/edit" element={<EditLogPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    )
}

export default AppRouter;
