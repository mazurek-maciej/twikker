import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, ...props }: RouteProps) {
  const { isAuth } = useAuth();

  const Component = () => (isAuth ? children : <Redirect to='/login' />);

  return <Route {...props} render={Component} />;
}
