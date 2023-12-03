import { BrowserRouter} from 'react-router-dom';
import { Header } from './components/modules/Header/Header';
import { Container } from '@mui/material'
import { useAppSelector } from './hooks/redux';
import { LOGIN_ROUTE } from './utils/route-consts';
import { AppRouter } from './components/AppRouter';

function App() {

  const { rights, isAuth } = useAppSelector(state => ({ rights: state.user.user.rights, isAuth: state.user.isAuth }));



  const location = window.location

  return (
    <div className="App">
      <BrowserRouter>
        {location.pathname !== LOGIN_ROUTE && <Header rights={rights} />}
        <Container sx={{ backgroundColor: '#adadadc1', borderRadius: 3, py: 1, my: 2 }}>
          <AppRouter isAuth={isAuth} rights={rights}/>
        </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;
