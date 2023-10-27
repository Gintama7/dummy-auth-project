import { Switch, Route,Redirect,useHistory } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext, useEffect } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
const history = useHistory();

  useEffect(()=>{
    setTimeout(()=>{
          authCtx.logout();
          console.log('1');
      },1*60*1000)
     
  },[authCtx.login])
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
