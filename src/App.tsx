import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/layout/Dashboard';
import UsuariosPage from './pages/UsuariosPage';
import AssignPcPage from './pages/AssignPcPage';
import AccesosPage from './pages/AccessPage';
import PcsPage from './pages/PcsPage';
import AppsPage from './pages/AppsPage';
import RolesPage from './pages/RolesPage';
import AreasPage from './pages/AreasPage';
import EstadosPage from './pages/EstadosPage';
function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<UsuariosPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/asignaciones-pc" element={<AssignPcPage />} />
          <Route path="/accesos" element={<AccesosPage />} />
          <Route path="/computadores" element={<PcsPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/estados" element={<EstadosPage />} />
        </Routes>
      </Dashboard>
    </Router>
  );
}

export default App;

