
// // //


import React, { useState, useContext } from 'react';
import { Box, Button, Input, Stack, useToast, FormControl, FormLabel, Text, Flex, Image } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import loginImage from '../assets/login.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext); 

    const params = new URLSearchParams(location.search);
    const role = params.get('role') || 'job_seeker';

    const handleLogin = () => {
        if (!email || !password) {
            toast({
                title: "Please enter both email and password.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password && user.role === role);

        if (user) {
            login(user); // Use the login function to set the user in context

            toast({
                title: "Logged in successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate(role === 'employer' ? '/employer-dashboard' : '/jobseeker-dashboard');
        } else {
            toast({
                title: "Invalid email or password.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minHeight="100vh"
            p={5}
            bgGradient="linear(to-r, teal.100, blue.100)"
            align="center"
            justify="center"
        >
            <Flex
                maxW="container.lg"
                width="100%"
                height="md"
                bg="white"
                borderRadius="lg"
                overflow="hidden"
            >
                <Box flex="1" display={{ base: "none", md: "block" }}>
                    <Image
                        src={loginImage}
                        alt="Login Image"
                        height="100%"
                        objectFit="cover"
                    />
                </Box>

                <Box
                    flex="1"
                    p={8}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(255, 255, 255, 0.8)"
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center" color="black">
                        {role === 'employer' ? 'Employer Login' : 'Job Seeker Login'}
                    </Text>
                    <Stack spacing={4} width="100%" maxW="md">
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            colorScheme={role === 'employer' ? 'blue' : 'teal'}
                            onClick={handleLogin}
                            _hover={{
                                bg: role === 'employer' ? 'blue.600' : 'teal.600',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease, bg 0.3s ease',
                            }}
                        >
                            Login
                        </Button>
                    </Stack>
                    <Text mt={4} textAlign="center" color="black">
                        Don't have an account?{' '}
                        <Button variant="link" colorScheme={role === 'employer' ? 'blue' : 'teal'} onClick={() => navigate('/register?role=' + role)}>
                            Register here
                        </Button>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Login;

