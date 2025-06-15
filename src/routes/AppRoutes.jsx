import React from 'react'
import { Route, Routes } from 'react-router'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
import OpenRoute from './OpenRoute'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard.jsx'
import MyProfile from "../components/core/Dashboard/Profile/MyProfile.jsx";
import MyClients from "../components/core/Dashboard/Clients/MyClients.jsx";
import MyGallery from "../components/core/Dashboard/Gallery/MyGallery.jsx";
import Contact from '../pages/Contact'
import ClientLogin from '../components/core/Auth/ClientLogin'
import PhotographerLogin from '../components/core/Auth/PhotographerLogin'
import PhotoSelection from '../components/core/Dashboard/Gallery/PhotoSelection.jsx'
import PreviewImages from '../pages/PreviewImages.jsx'
import Settings from '../components/core/Dashboard/Settings/Settings.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Open Route Paths */}
      <Route
        path="/login"
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
      ></Route>

      <Route
        path="/signUp"
        element={
          <OpenRoute>
            <SignUp />
          </OpenRoute>
        }
      ></Route>

      <Route
        path="/login/photographer"
        element={
          <OpenRoute>
            <PhotographerLogin />
          </OpenRoute>
        }
      ></Route>

      <Route
        path="/login/client"
        element={
          <OpenRoute>
            <ClientLogin />
          </OpenRoute>
        }
      ></Route>
      {/* Forgot-Password is Pending */}

      {/* PHOTOGRAPHER DASHBOARDS */}
      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
        <Route path = "/dashboard/settings" element = {<Settings/>}/>
        <Route path="/dashboard/customers" element={<MyClients />} />
        <Route path="/dashboard/photo-selection" element={<MyGallery />} />
        <Route path="/dashboard/photo-selection/:galleryId" element={<PhotoSelection />} />
      </Route>

      {/* PHOTOGRAPHER PREVIEW PAGE */}
      <Route path = "/preview/:id" element = {<PreviewImages/>}></Route>

      {/* Route Path For Error */}
      <Route path="*" element={<Error />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default AppRoutes
