import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UploadModel from './components/Upload.jsx'
import Home from './components/Home.jsx'
import ViewAll from './components/ViewPage.jsx'
import ModelDetailsPage from './components/ModelView.jsx'
import CorporateTowerView from './components/TowerModelDetails.jsx'
import UrbanApartmentView from './components/AparmentDetails.jsx'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/upload' element={<UploadModel />} />
        <Route path='/view-all' element={<ViewAll/>}/>
        <Route path="/view/:title" element={<ModelDetailsPage />} />
        <Route path='/towerdetails' element={<CorporateTowerView/>}/>
        <Route path='/Apartmentdetails' element={<UrbanApartmentView/>}/>
        
      </Routes>
   </BrowserRouter>
  )
}

export default App