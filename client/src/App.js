
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<List />} />
      </Routes>

    </div>
  );
}

export default App;
