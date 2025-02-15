import { Navigate, Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts/baseLayout";
import { ProtectedRoute } from "./routes/protectedRoute";
import { AdminLayout } from "./layouts/adminLayout";
import ResponseProvider from "./context/responseProvider";
import { Dashboard, Login, IncientDetails } from "./pages";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BaseLayout>
            <ResponseProvider>
              <Login />
            </ResponseProvider>
          </BaseLayout>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ResponseProvider>
                <Dashboard />
              </ResponseProvider>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/incident"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ResponseProvider>
                <IncientDetails />
              </ResponseProvider>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
