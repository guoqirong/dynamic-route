import { useHistory, useParams } from "react-router-dom";

export default function UserEditPage() {
  const history = useHistory();
  const { id } = useParams<any>();
  
  return (
    <div>
      <button onClick={() => history.go(-1)}>goback</button>
      <h1>useredit</h1>
      <div>id:{id}</div>
    </div>
  );
}
