import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

export function Auth(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorLoginMessage = useSelector(state => state.errorLoginMessage);
  const errorLoginMessageVisible = useSelector(state => state.errorLoginMessageVisible);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const form = new FormData(target)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { login: form.get('login'), password: form.get('password') }).then(res => {
      console.log(res.data)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('userId', res.data.user_id)
      localStorage.setItem('userLogin', res.data.login)
      navigate('/main');
    }).catch((e) => {
      dispatch({ type: "SET_ERROR_MESSAGE_LOGIN", payload: { errorLoginMessage: e.response.data.message, errorLoginMessageVisible: 'block' } })
    })
  }

  return (
    <>

      < div class='container' >
        <form onSubmit={handleOnSubmit}>
          <div class="alert alert-danger mt-3" style={{ display: errorLoginMessageVisible }} role="alert" >
            {errorLoginMessage}
          </div>
          <div class="mb-3">
            <label for="login" class="form-label">Логин</label>
            <input type="text" class="form-control" id="login" name='login' placeholder='Логин' aria-describedby="emailHelp" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Пароль</label>
            <input type="password" class="form-control" name='password' placeholder='Пароль' id="exampleInputPassword1" />
          </div>
          <button type="submit" class="btn btn-primary mr-5">Войти</button>
          <a class='btn btn-primary register' href='/register'>Регистрация</a>
        </form>
      </div >
    </>

  )
}
