import './App.scss';

import Homepage from './pages/Home/Homepage'
import Item from './pages/Item/Itempage'
import Notfoundpage from './pages/Notfoundpage'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="header">
        <div className='header__nav'>
          <Link className='body01' to='/'>Home</Link>
          {/* <Link className='body01' to='/card'>Blog</Link>
          <Link className='body01' to='/card/123'>About Us</Link> */}
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        {/* <Route path='/card/*' element={<Item />}/> */}
        <Route path='card' element={<Item />}>
          <Route path=':id' element={<Item />}/>
        </Route>
        {/* <Route path='/*' element={<Notfoundpage />}/> */}
      </Routes>
    </div>
  );
}

export default App;
