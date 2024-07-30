import logo from '../logo.svg';
import './index.css';

export default function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    // <div>
    //   <h2>Yay! Welcome to umi!</h2>
    //   <p>
    //     <img src={yayJpg} width="388" />
    //   </p>
    //   <p>
    //     To get started, edit <code>pages/index.tsx</code> and save to reload.
    //   </p>
    // </div>
  );
}
