import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Home/Header/Header';
import Login from './Components/Login/Login';
import NoMatch from './Components/NoMatch/NoMatch';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { loggedInInfo } from './Components/Login/loginManager';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';
import PlaceOrder from './Components/Dashboard/PlaceOrder/PlaceOrder';
import NoOrderId from './Components/Dashboard/NoOrderId/NoOrderId';
import AdminServiceList from './Components/Dashboard/AdminServiceList/AdminServiceList';
import ClientServiceList from './Components/Dashboard/ClientServiceList/ClientServiceList';
import AddFeedback from './Components/Dashboard/AddFeedback/AddFeedback';
import AddService from './Components/Dashboard/AddService/AddService';
import AddAdmin from './Components/Dashboard/AddAdmin/AddAdmin';
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
              <Route exact path='/'>
                <Header />
              </Route>
              <Route exact path='/home'>
                <Header />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <PrivateRoute path='/service/:_id'>
                <DashboardLayout title='Order'>
                  <PlaceOrder />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/order'>
                <DashboardLayout title='Order'>
                  <NoOrderId />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/service-lists'>
                <DashboardLayout title='Services List'>
                  <ClientServiceList />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/add-feedback'>
                <DashboardLayout title='Reviews'>
                  <AddFeedback />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/admin-service-lists'>
                <DashboardLayout title='Services List'>
                  <AdminServiceList />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/addService'>
                <DashboardLayout title='Add Services'>
                  <AddService />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/makeAdmin'>
                <DashboardLayout title='Add Admin'>
                  <AddAdmin />
                </DashboardLayout>
              </PrivateRoute>
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
