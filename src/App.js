import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import NoteDetailedView from './components/NoteDetailedView'
import Archieved from './components/Archieved'
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute";
import AddingNote from "./components/AddingNote";
import Edit from "./components/Edit";

const App = () => {

  return<BrowserRouter>
    <Routes>
    <Route exact path="/login" element={<Login/>} />
    <Route exact path="/register" element={<Register/>} />
    <Route element={<ProtectedRoute/>}>
    <Route exact path="/dashboard" element={<Dashboard/>} />
      <Route exact path="/notes/:id" element={<NoteDetailedView/>} />
      <Route exact path="/archieved" element={<Archieved/>} />
      <Route exact path='/addnote' element={<AddingNote/>}/>
      <Route exact path="/edit/:id/:title/:content/:category" element={<Edit/>}/>
    </Route>
      <Route path='/notfound' element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
};

export default App;
