import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UserSelect } from './UserSelect';

export function ModalComponent(props) {

  const dispatch = useDispatch();
  const modalShow = useSelector(state => state.modalShow);
  const findUsers = useSelector(state => state.findUsers);

  const handleClose = () => {
    dispatch({ type: "MODAL_SHOW", payload: false })
  };
  const handleShow = () => {
    dispatch({ type: "MODAL_SHOW", payload: true })
  };

  const handleOnChange = (e) => {
    const target = e.target;

    axios.get(`${process.env.REACT_APP_SERVER_URL}/users/list?search={"login": "${target.value}"}`).then((response) => {
      if (response.data.length > 0) {
        dispatch({ type: "FIND_USERS_ADD", payload: response.data })
      }
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const target = e.target;
    const form = new FormData(target);
    const name = form.get('name');
    axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms`, { name: name }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
      const room = response.data;
      const users = Array.from(target.querySelectorAll('input[type=checkbox]')).filter((u) => u.checked);
      users.map(user => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms/${room.id}/user`, { userId: +user.getAttribute('id') }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((res) => {
          handleClose();
        })
      })
    })
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить комнату
      </Button>

      <Modal show={modalShow} modalShow onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление комнаты</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" id="form" onSubmit={handleOnSubmit}>
            <div class="mb-3 ">
              <input type="text" class="form-control" id="name" name="name" placeholder="Название комнаты" />
              <input type="text" name="users" id="findUsers" onChange={handleOnChange} class="form-control mt-3 mb-3" placeholder="Логин пользователя" />

              <div class="btn-group" role="group" id="usersList" name="users" aria-label="Basic checkbox toggle button group">
                <div class='row'>
                  {
                    findUsers.map((user) => {
                      return <UserSelect user={user} />
                    })
                  }
                </div>

              </div><br />
              <input type='submit' class='btn btn-primary' value='Создать' />
            </div>
          </form>

        </Modal.Body>
      </Modal>
    </>
  )

}
