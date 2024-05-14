// React
import { Suspense, lazy } from "react";
// Router
import { Route, Routes } from "react-router-dom";
// Provider
import AppThemeProvider from "design/providers/AppThemeProvider/AppThemeProvider";
// Layout
const AuthLayout = lazy(() => import("layouts/AuthLayout/AuthLayout"));
const AppLayout = lazy(() => import("layouts/AppLayout/AppLayout"));
// Components
const Login = lazy(() => import("components/organisms/Login/Login"));
const Employee = lazy(() => import("components/organisms/Signup/Employee"));
const Employer = lazy(() => import("components/organisms/Signup/Employer"));
const CompanyMain = lazy(() => import("components/organisms/CompanyMain/CompanyMain"));
const CompanyVacancies = lazy(() => import("components/organisms/CompanyVacancies/CompanyVacancies"));
const CompanyStaff = lazy(() => import("components/organisms/CompanyStaff/CompanyStaff"));
import SearchFriend from "components/molecules/SearchFriend/SearchFriend";
import ChatRooms from "components/organisms/ChatRooms/ChatRooms";
import Loader from "components/atoms/Loader/Loader";
// Pages
const Dashboard = lazy(() => import("pages/Dashboard"));
const PublicProfile = lazy(() => import("pages/PublicProfile"));
const Jobs = lazy(() => import("pages/Jobs"));
const MyJobs = lazy(() => import("pages/MyJobs"));
const CompanyProfile = lazy(() => import("pages/CompanyProfile"));
const Messanger = lazy(() => import("pages/Messanger"));
// Hooks
import { useAuthFirebase } from "hooks/useAuthFirebase";
// Firebase Config
import { auth } from "./firebaseConfig";
// Protected Route
import ProtectedRoute from "./ProtectedRoute";
import AddVacancy from "pages/AddVacancy";

function App() {
    useAuthFirebase(auth);

    return (
        <AppThemeProvider>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup">
                            <Route path="employee" element={<Employee />} />
                            <Route path="employer" element={<Employer />} />
                        </Route>
                    </Route>
                    <Route path="/" element={<AppLayout />}>
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="profile">
                            <Route
                                path="public"
                                element={
                                    <ProtectedRoute>
                                        <PublicProfile />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="jobs">
                            <Route path="all" element={<Jobs />}></Route>
                            <Route path="mine" element={<MyJobs />}></Route>
                            <Route path="add-vacancy" element={<AddVacancy />} />
                        </Route>
                        <Route path="messanger" element={<Messanger />}>
                            <Route index element={<ChatRooms />} />
                            <Route path="search" element={<SearchFriend />} />
                        </Route>
                        <Route path="company/:id?" element={<CompanyProfile />}>
                            <Route index element={<CompanyMain />} />
                            <Route path="vacancies" element={<CompanyVacancies />} />
                            <Route path="staff" element={<CompanyStaff />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </AppThemeProvider>
    );
}

export default App;
