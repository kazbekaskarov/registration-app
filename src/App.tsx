import { ThemeProvider } from './context/ThemeContext';
import { RegistrationProvider } from './context/RegistrationContext';
import Layout from './components/layout/Layout';
import RegistrationPage from './pages/RegistrationPage';
import './i18n';

function App() {
  return (
    <ThemeProvider>
      <RegistrationProvider>
        <Layout>
          <RegistrationPage />
        </Layout>
      </RegistrationProvider>
    </ThemeProvider>
  );
}

export default App;
