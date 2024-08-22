import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './Components/Dashboard/EmployerDashboard';
import JobSeekerDashboard from './Components/Dashboard/JobSeekerDashboard';


import PrivateRoutes from './Components/Common/PrivateRoutes';

const App = () => {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        <Route 
                            path="/employer-dashboard" 
                            element={<PrivateRoutes element={EmployerDashboard} />}
                        />
                        <Route 
                            path="/jobseeker-dashboard" 
                            element={<PrivateRoutes element={JobSeekerDashboard} />}
                        />
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;
