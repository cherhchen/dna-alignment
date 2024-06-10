import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage  from './pages/HomePage';
import GlobalAlignPage  from './pages/GlobalAlignPage';
import LocalAlignPage from './pages/LocalAlignPage';

function AppRoutes() {
  return (
    <BrowserRouter basename={"/dna-alignment/"}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/global' element={<GlobalAlignPage />}/>
        <Route path='/local' element={<LocalAlignPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;