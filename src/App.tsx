import React, { useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.tsx'
import Activity from './Pages/AutoTrader/Activity.tsx'
import { httpClient } from './Services/apiService.ts'
import MainTabs from './Pages/Trading/Tabs/Tabs.tsx'
import Account from './Pages/User/Account';
import Profile from './Pages/User/Profile';
import Logout from './Pages/User/Logout';

// import Instruments from './pages/Instruments'
// import Settings from './pages/Settings'
// import Help from './pages/Help'
// import User from './pages/User'

const App: React.FC = () => {

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const data = await httpClient('/api/trading/readPlatformPositions', {
  //         method: 'GET',
  //         params: {
  //           pseudoAccount: '53135052',
  //         },
  //         headers: {
  //           'api-key': 'f0a63155-883b-4fb5-b73f-8fefe03f4e4d',
  //         },
  //       });

  //       console.log('API Data:', data);
  //     } catch (err) {
  //       console.error('Error:', err);
  //     }
  //   };
  //   fetchOrders()
  // }, [])

  return (
    <>
      <Navbar />
      <div style={{ padding: 24 }}>
        <Routes>
          <Route path="/autotrader/activity" element={<Activity />} />
          <Route path="trading/portfolio" element={<MainTabs />} />
          <Route path="/user/account" element={<Account />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/logout" element={<Logout />} />


          {/* <Route path="/autotrader/instruments" element={<Instruments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/user" element={<User />} />  */}
        </Routes>
      </div>
    </>
  )

}

export default App


