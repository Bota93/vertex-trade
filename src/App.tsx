import { Outlet } from 'react-router-dom'; // Importamos Outlet
import './index.css';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">Vertex Trade</h1>
        </div>
      </header>
      {/* Outlet es el lugar donde React Router renderizará la página actual */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;