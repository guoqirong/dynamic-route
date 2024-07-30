import { useNavigate, useParams } from "react-router-dom";

export default function UserEditPage() {
  const history = useNavigate();
  const { id } = useParams();
  
  return (
    <div>
      <button onClick={() => history(-1)}>goback</button>
      <h1>useredit</h1>
      <div>id:{id}</div>
    </div>
  );
}
