import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Toast from './components/Toast';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Toast />
      </div>
    </BrowserRouter>
  );
}
