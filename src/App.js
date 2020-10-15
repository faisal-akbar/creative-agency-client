import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Home/Header/Header';
import Login from './Components/Login/Login';
import NoMatch from './Components/NoMatch/NoMatch';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Services from './Components/Home/Services/Services';
import WorksCarousel from './Components/Home/WorksCarousel/WorksCarousel';
import ClientFeedback from './Components/Home/ClientFeedback/ClientFeedback';
import ContactUs from './Components/Home/ContactUs/ContactUs';
import Order from './Pages/Clients/Order';
import Feedback from './Pages/Clients/Feedback';
import AdminServiceList from './Pages/Admin/AdminServiceList';
import Service from './Pages/Admin/Service';
import MakeAdmin from './Pages/Admin/MakeAdmin';
import ClientServices from './Pages/Clients/ClientServices';
import TopClients from './Components/Home/TopClients/TopClients';
import { loggedInInfo } from './Components/Login/loginManager';
import NoServiceId from './Pages/Clients/NoServiceId';

// ========================================================================================

// Context
export const UserContext = createContext();
export const AdminContext = createContext();
export const AdminContextTemp = createContext();

function App() {
  // Hook for Logged in user
  const [loggedInUser, SetLoggedInUser] = useState({});

  // Get logged in user info from Session
  const loggedInUserSession = loggedInInfo();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('https://creative-agency-react.herokuapp.com/isAdmin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: loggedInUserSession.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, [loggedInUserSession.email]);

  // Get user info from when user click on sign in
  const [isAdminTemp, setIsAdminTemp] = useState(false);

  useEffect(() => {
    fetch('https://creative-agency-react.herokuapp.com/isAdmin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdminTemp(data));
  }, [loggedInUser.email]);

  return (
    <AdminContextTemp.Provider value={[isAdminTemp, setIsAdminTemp]}>
      <AdminContext.Provider value={[isAdmin, setIsAdmin]}>
        <UserContext.Provider value={[loggedInUser, SetLoggedInUser]}>
          <Router>
            <Switch>
              <Route exact path='/home'>
                <Header />
                <TopClients />
                <Services />
                <WorksCarousel />
                <ClientFeedback />
                <ContactUs />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <PrivateRoute path='/service/:_id'>
                <Order />
              </PrivateRoute>
              <PrivateRoute exact path='/order'>
                <NoServiceId />
              </PrivateRoute>
              <PrivateRoute exact path='/admin-service-lists'>
                <AdminServiceList />
              </PrivateRoute>
              <PrivateRoute exact path='/service-lists'>
                <ClientServices />
              </PrivateRoute>
              <PrivateRoute exact path='/addService'>
                <Service />
              </PrivateRoute>
              <PrivateRoute exact path='/add-feedback'>
                <Feedback />
              </PrivateRoute>
              <PrivateRoute exact path='/makeAdmin'>
                <MakeAdmin />
              </PrivateRoute>

              <Route exact path='/'>
                <Header />
                <TopClients />
                <Services />
                <WorksCarousel />
                <ClientFeedback />
                <ContactUs />
              </Route>

              <Route path='*'>
                <NoMatch />
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </AdminContext.Provider>
    </AdminContextTemp.Provider>
  );
}

export default App;
