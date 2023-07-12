import "./App.css";
import "./styles/ant.scss";
import Summary from "./components/summary";
import Wallets from "./components/wallets";
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="p-4 shadow-lg bg-white rounded-lg w-[500px]">
          <Summary />
          <Wallets />
        </div>
      </div>
    </div>
  );
}

export default App;
