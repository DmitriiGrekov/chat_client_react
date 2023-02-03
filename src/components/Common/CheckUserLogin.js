import { useNavigate } from 'react-router-dom';

export function CheckUserLogin(props) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token)
    navigate('/');


}
