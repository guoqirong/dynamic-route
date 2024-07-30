import { useNavigate } from "react-router-dom";


export default function UserPage() {
  const history = useNavigate();

  return (
    <div>
      <h1>user</h1>
      <button onClick={() => history('/user/add')}>add</button>
      <button onClick={() => history('/user/edit/1')}>edit</button>
    </div>
  );
}
