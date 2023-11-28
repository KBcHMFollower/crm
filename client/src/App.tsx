import { BrowserRouter} from 'react-router-dom';
import { Header } from './components/modules/Header/Header';
import { Container } from '@mui/material'
import { useAppSelector } from './hooks/redux';
import { LOGIN_ROUTE } from './utils/consts';
import { AppRouter } from './components/AppRouter';

function App() {

  const { role, isAuth } = useAppSelector(state => ({ role: state.user.user.role, isAuth: state.user.isAuth }));



  const location = window.location

  return (
    <div className="App">
      <BrowserRouter>
        {location.pathname !== LOGIN_ROUTE && <Header role={role} />}
        <Container sx={{ backgroundColor: '#adadadc1', borderRadius: 3, py: 1, my: 2 }}>
          <AppRouter isAuth={isAuth} role={role}/>
        </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;
