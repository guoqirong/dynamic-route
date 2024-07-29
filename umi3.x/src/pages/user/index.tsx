import { history } from "umi";

export default function UserPage() {
  return (
    <div>
      <h1>user</h1>
      <button onClick={() => history.push('/user/add')}>add</button>
    </div>
  );
}
