import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

export function Register(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorLoginMessage = useSelector(state => state.errorLoginMessage);
  const errorLoginMessageVisible = useSelector(state => state.errorLoginMessageVisible);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const form = new FormData(target)
    const data = {
      phone: form.get('phone'),
      email: form.get('email'),
      password: form.get('password'),
      login: form.get('login')
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, data).then(res => {
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('userId', res.data.user_id)
      // return redirect('/main')
      console.log(res.data);
      navigate('/');
    }).catch((e) => {
      dispatch({ type: "SET_ERROR_MESSAGE_LOGIN", payload: { errorLoginMessage: e.response.data.message, errorLoginMessageVisible: 'block' } })
    })
  }

  return (
    < div class='container' >
      <form onSubmit={handleOnSubmit}>
        <div class="alert alert-danger mt-3" style={{ display: errorLoginMessageVisible }} role="alert" >
          {errorLoginMessage}
        </div>
        <div class="mb-3 mt-3">
          <label for="phone" class="form-label">Телефон</label>
          <input type="text" class="form-control" id="phone" name='phone' placeholder='Телефон' aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Почта</label>
          <input type="email" class="form-control" id="email" name='email' placeholder='Почта' aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="login" class="form-label">Логин</label>
          <input type="text" class="form-control" id="login" name='login' placeholder='Логин' aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Пароль</label>
          <input type="password" class="form-control" name='password' placeholder='Пароль' id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Зарегестрироваться</button>
      </form>
    </div >

  )
}
