import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Aurora from './components/layout/Aurora.jsx'
import CenteredLayout from './components/layout/CenteredLayout.jsx'
import Footer from './components/layout/Footer.jsx'
import RequireItinerary from './components/layout/RequireItinerary.jsx'
import RequireTripAccess from './components/layout/RequireTripAccess.jsx'
import RequireTripForm from './components/layout/RequireTripForm.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import ToastProvider from './context/ToastProvider.jsx'
import TripProvider from './context/TripProvider.jsx'
import ApiKey from './pages/ApiKey.jsx'
import Home from './pages/Home.jsx'
import { loadItinerary } from './pages/lazyPages.js'
import Loading from './pages/Loading.jsx'
import NotFound from './pages/NotFound.jsx'
import TripForm from './pages/TripForm.jsx'
import styles from './App.module.css'

const Itinerary = lazy(loadItinerary)

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
              <Route path="cle" element={<ApiKey />} />
              <Route
                path="voyage"
                element={
                  <RequireTripAccess>
                    <TripForm />
                  </RequireTripAccess>
                }
              />
              <Route
                path="chargement"
                element={
                  <RequireTripAccess>
                    <RequireTripForm>
                      <Loading />
                    </RequireTripForm>
                  </RequireTripAccess>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              path="itineraire"
              element={
                <RequireItinerary>
                  <Suspense fallback={null}>
                    <Itinerary />
                  </Suspense>
                </RequireItinerary>
              }
            />
          </Routes>
          <Footer />
        </div>
      </ToastProvider>
    </TripProvider>
  )
}
