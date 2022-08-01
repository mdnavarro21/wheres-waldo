import AuthProvider from './contexts/AuthContext';
import Signup from './components/Signup';

function App() {
  return (
    <AuthProvider>
      <div className="App">
       <Signup />
      </div>
    </AuthProvider>
  );
}

export default App;
