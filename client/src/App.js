
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NewLessons from './components/NewLessons/NewLessons';

function App() {
  return (
   <>
   <NavBar/>
   <Home/>
   <Login/>
   <SignUp/>
   <NewLessons/>
   </> 
  );
}

export default App;
