import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import StandardPhotoPrint from './pages/StandardPhotoPrint';
import StandardPhotoUpload from './pages/StandardPhotoUpload';
import Checkout from './pages/Checkout';

function App() {
  return (
      <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/standard-photo-print' element={<StandardPhotoPrint/>} />
          <Route path='/image/upload' element={<StandardPhotoUpload/>} />
          <Route path='/checkout' element={<Checkout/>} />
        </Routes>
      </>
  );
}

export default App;