import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddTodo from './components/AddTodo';
import Welcome from './components/Welcome';

function App() {
  return (
    // <Router>
    <div className="App">
      {/* <Routes>
            <Route path="/signup" element={<SignUp />} ></Route>
            <Route path="/" element={<SignIn />} ></Route>
            <Route path="/home/:curr" element={<AddTodo />} ></Route>
          </Routes>   */}
      <Welcome />
    </div>
    // </Router>
  );
}

export default App;
