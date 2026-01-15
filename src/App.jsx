import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== VISITOR ===== */
import VisitorLayout from "./pages/visitor/VisitorLayout";

/* ===== AUTH (GLOBAL) ===== */
import Signup from "./pages/SignUp";
import ForgotPage from "./pages/ForgotPage";

/* ===== EMPLOYEE ===== */
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeePage from "./pages/employee/EmployeePage";

/* ===== SECURITY ===== */
import SecurityLogin from "./pages/security/Login";
import Scanner from "./pages/security/Scanner";

/* ===== HOD ===== */
import HodLogin from "./pages/hod/Login";
import HodDashboard from "./pages/hod/Dashboard";

/* ===== ADMIN ===== */
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= VISITOR ================= */}
        <Route path="/" element={<VisitorLayout />} />

        {/* ================= GLOBAL AUTH ================= */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPage />} />

        {/* ================= EMPLOYEE ================= */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee" element={<EmployeePage />} />

        {/* ================= SECURITY ================= */}
        <Route path="/security/login" element={<SecurityLogin />} />
        <Route path="/security" element={<Scanner />} />

        {/* ================= HOD ================= */}
        <Route path="/hod/login" element={<HodLogin />} />
        <Route path="/hod" element={<HodDashboard />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-black text-red-400 font-bold">
              404 – Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

{/* ================= FALLBACK ================= */ }
<Route
  path="*"
  element={
    <div className="min-h-screen flex items-center justify-center bg-black text-red-400 font-bold">
      404 – Page Not Found
    </div>
  }
/>
