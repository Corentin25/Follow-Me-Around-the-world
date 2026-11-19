import { Route, Routes } from 'react-router-dom'
import Aurora from './components/layout/Aurora.jsx'
import CenteredLayout from './components/layout/CenteredLayout.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import ToastProvider from './context/ToastProvider.jsx'
import TripProvider from './context/TripProvider.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import Home from './pages/Home.jsx'
import styles from './App.module.css'

export default function App() {
  return (
    <TripProvider>
      <ToastProvider>
        <div className={styles.app}>
          <Aurora />
          <ScrollToTop />
          <Routes>
            <Route element={<CenteredLayout />}>
              <Route index element={<Home />} />
              <Route path="cle" element={<ComingSoon />} />
              <Route path="voyage" element={<ComingSoon />} />
              <Route path="chargement" element={<ComingSoon />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>
            <Route path="itineraire" element={<ComingSoon />} />
          </Routes>
          <Footer />
        </div>
      </ToastProvider>
    </TripProvider>
  )
}
