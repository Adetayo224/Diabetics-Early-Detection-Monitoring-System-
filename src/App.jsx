import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.jsx'
import { ViewingPairProvider } from './hooks/useViewingPair.jsx'
import { ProtectedRoute, RoleRoute } from './routes/ProtectedRoute.jsx'
import { AppShell } from './components/layout/AppShell.jsx'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Overview from './pages/Overview.jsx'
import LiveMonitor from './pages/LiveMonitor.jsx'
import Patients from './pages/Patients.jsx'
import Calendar from './pages/Calendar.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <AuthProvider>
      <ViewingPairProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="live" element={<LiveMonitor />} />
            <Route
              path="patients"
              element={
                <RoleRoute role="doctor">
                  <Patients />
                </RoleRoute>
              }
            />
            <Route path="calendar" element={<Calendar />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ViewingPairProvider>
    </AuthProvider>
  )
}
