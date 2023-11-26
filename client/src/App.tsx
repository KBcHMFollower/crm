import { BrowserRouter, Navigate, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import { Header } from './components/modules/Header/Header';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { WorkersPage } from './pages/WorkersPage/WorkersPage';
import { Container } from '@mui/material'
import { ClientsPage } from './pages/ClientsPage/ClientsPage';
import { RolesPage } from './pages/RolesPage/RolesPage';
import SignInPage from './pages/SignInPage/SignInPage';
import { ClientPage } from './pages/ClientPage/ClientPage';
import { LeadsPage } from './pages/LeadsPage/LeadsPage';
import { useAppSelector } from './hooks/redux';

function App() {
  const location = window.location

  const { role, isAuth } = useAppSelector(state => ({ role: state.user.workerInfo.role, isAuth: state.user.isAuth }));

  return (
    <div className="App">
      <BrowserRouter>
        {location.pathname !== '/login' && <Header role={role} />}
        <Container sx={{ backgroundColor: '#adadadc1', borderRadius: 3, py: 1, my: 2 }}>
          <Routes>
            {!isAuth ? (
              <>
                <Route path='/login' element={<SignInPage />} />
                <Route path='*' element={<Navigate to={'/login'} replace />} />
              </>
            ) : (
              <>
              <Route path='*' element={<Navigate to={'/'} replace />} />
                <Route path='/' element={<ProfilePage />} />
                {role !== 'teacher' && (
                  <Route path='/workers' element={<WorkersPage />} />
                )}
                <Route path='/clients' element={<ClientsPage />} />
                <Route path='/profile/:userId' element={<ProfilePage />} />
                <Route path='/clients/:userId' element={<ClientPage />} />
                {role === 'admin' && (
                  <Route path='/roles' element={<RolesPage />} />
                )}
                {role !== 'teacher' && (
                  <Route path='/leads' element={<LeadsPage />} />
                )}
              </>
            )}

          </Routes>
        </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;
