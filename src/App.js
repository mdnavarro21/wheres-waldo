/*import AuthProvider from './contexts/AuthContext';
import Signup from './components/Signup';*/
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './components/Game'
function App() {
  return (
    <div className="App">
      <Game />
      {/*<AuthProvider>
        <Signup />
      </AuthProvider>*/}
    </div>
  );
}

export default App;
