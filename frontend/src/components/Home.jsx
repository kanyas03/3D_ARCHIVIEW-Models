import react from 'react';
import Navbar from './Navbar.jsx';
import ArchGrid from './Arichgrid.jsx';
import Spotlight from './Soptlight.jsx';

const Home = () => {
  return (
    <div>
      <Navbar />
       <Spotlight /> 
      <ArchGrid/>
     
      
    </div>
  )
}

export default Home