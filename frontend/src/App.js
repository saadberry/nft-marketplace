import Navbar from "./components/Navbar";
import WalletCard from "./components/WalletCard";
function App() {
  return (
    <div className="App-header">
      <div className="centerCard">
        <div className = "card">
          <div className="App">
            <Navbar/>
            <WalletCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;