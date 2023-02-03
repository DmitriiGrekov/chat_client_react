export function UserSelect(props) {
  return (
    <div class='col-4 mr-2 mb-2' >
      <input type="checkbox" class="btn-check" id={props.user.id} autocomplete="off" />
      <label class="btn btn-outline-primary" for={props.user.id}>{props.user.login}</label>
    </div>
  )
}
