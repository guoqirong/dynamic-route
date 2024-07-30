import { useNavigate } from "react-router-dom";

export default function UserAddPage() {
  const history = useNavigate();
  
  return (
    <div>
      <button onClick={() => history(-1)}>goback</button>
      <h1>useradd</h1>
    </div>
  );
}
