import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.tsx'
import Activity from './Pages/AutoTrader/Activity.tsx'
import MainTabs from './Pages/Trading/Tabs/Tabs.tsx'
import Account from './Pages/User//Account/Account.tsx';
import Profile from './Pages/User/Profile/Profile.tsx';
import Logout from './Pages/User/Logout/Logout.tsx';
import Positions from "./Pages/Trading/Portfolio/Positions.tsx";
import Orders from "./Pages/Trading/Portfolio/Orders.tsx";
import Margins from "./Pages/Trading/Portfolio/Margins.tsx";
import Holdings from "./Pages/Trading/Portfolio/Holdings.tsx";
import Notifications from "./Pages/Trading/Portfolio/Notifications.tsx";
import Screener from "./Pages/Screener/Screener";
//import General from "./Pages/Settings/General/General";
import TradingAccounts from "./Pages/Settings/TradingAccounts/TradingAccounts";
import PseudoAccounts from "./Pages/Settings/PseudoAccounts/PseudoAccounts";
import GroupAccounts from "./Pages/Settings/GroupAccounts/GroupAccounts";
// import MasterAccounts from "./Pages/Settings/MasterAccounts/MasterAccounts";
// import Security from "./Pages/Settings/Security/Security";
import CreateTradingAccount from "./Pages/Settings/TradingAccounts/CreateTradingAccount";
import ValidateAll from './Pages/Settings/TradingAccounts/ValidateAll.tsx';
import CreateGroupAccount from './Pages/Settings/GroupAccounts/CreateGroupAccount.tsx';

const App: React.FC = () => {

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
          <Route path="/trading/positions" element={<Positions />} />
          <Route path="/trading/orders" element={<Orders />} />
          <Route path="/trading/margins" element={<Margins />} />
          <Route path="/trading/holdings" element={<Holdings />} />
          <Route path="/trading/notifications" element={<Notifications />} />
          <Route path='/Screener/Screener' element={<Screener />} /> 
          {/* <Route path="/settings/general" element={<General />} /> */}
          <Route path="/settings/tradingaccounts" element={<TradingAccounts />} />
          <Route path="/settings/pseudoaccounts" element={<PseudoAccounts />} />
          <Route path="/settings/groupaccounts" element={<GroupAccounts />} />
          {/*<Route path="/settings/masteraccounts" element={<MasterAccounts />} />
          <Route path="/settings/security" element={<Security />} /> */}
          <Route path="/settings/tradingaccounts/createtradingaccount" element={<CreateTradingAccount />} />
          <Route path="/settings/tradingaccounts/validateall" element={<ValidateAll />} />
          <Route path="/settings/groupaccounts/creategroupaccount" element={<CreateGroupAccount />} />
        </Routes>
      </div>
    </>
  )
}
export default App


