

import React, { useState } from 'react';
import { Box, Button, Input, Stack, useToast, Select, FormControl, FormLabel, Text, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import registerImage from '../assets/login.png'; 

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('job_seeker'); 
    const toast = useToast();
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!firstName || !email || !password || !confirmPassword) {
            toast({
                title: "Please fill in all fields.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email && user.role === role);

        if (userExists) {
            toast({
                title: "User already exists with this role.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        users.push({ firstName, lastName, email, password, role });
        localStorage.setItem('users', JSON.stringify(users));

        toast({
            title: "Account created successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        navigate('/login?role=' + role);
    };

//     return (
//         <Flex
//             minHeight="100vh"
//             p={5}
//             bgGradient="linear(to-r, teal.100, blue.100)"
//             align="center"
//             justify="center"
//         >
//             <Flex
//                 maxW="container.lg"
//                 width="100%"
//                 height="md"
//                 bg="white"
//                 borderRadius="lg"
//                 overflow="hidden"
//                 boxShadow="lg"
//             >
//                 <Box flex="1" display={{ base: "none", md: "block" }}>
//                     <Image
//                         src={registerImage} 
//                         alt="Register Image"
//                         height="100%"
//                         objectFit="cover"
//                     />
//                 </Box>

//                 <Box
//                     flex="1"
//                     p={8}
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     bg="rgba(255, 255, 255, 0.8)"
//                 >
//                     <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center" color="black">
//                         Create Account
//                     </Text>
//                     <Stack spacing={4} width="100%" maxW="md">
//                         <FormControl id="firstName">
//                             <FormLabel>First Name</FormLabel>
//                             <Input
//                                 placeholder="First Name"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 size="sm"
//                             />
//                         </FormControl>
                        
                        
                        
//                         <FormControl id="email">
//                             <FormLabel>Email Address</FormLabel>
//                             <Input
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 size="sm"
//                             />
//                         </FormControl>
//                         <Flex width="100%" mb={4} gap={2}>
//                             <FormControl id="password" flex="1">
//                                 <FormLabel>Password</FormLabel>
//                                 <Input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     size="sm"
//                                 />
//                             </FormControl>
//                             <FormControl id="confirmPassword" flex="1">
//                                 <FormLabel>Confirm Password</FormLabel>
//                                 <Input
//                                     type="password"
//                                     placeholder="Confirm Password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     size="sm"
//                                 />
//                             </FormControl>
//                         </Flex>
//                         <FormControl id="role">
//                             <FormLabel>Select Role</FormLabel>
//                             <Select
//                                 placeholder="Select role"
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                             >
//                                 <option value="job_seeker">Job Seeker</option>
//                                 <option value="employer">Employer</option>
//                             </Select>
//                         </FormControl>
//                         <Button
//                             colorScheme={role === 'employer' ? 'blue' : 'teal'}
//                             onClick={handleRegister}
//                             _hover={{
//                                 bg: role === 'employer' ? 'blue.600' : 'teal.600',
//                                 transform: 'scale(1.05)',
//                                 transition: 'transform 0.3s ease, bg 0.3s ease',
//                             }}
//                         >
//                             Register
//                         </Button>
//                     </Stack>
//                     <Text mt={4} textAlign="center" color="black">
//                         Already have an account?{' '}
//                         <Button variant="link" colorScheme={role === 'employer' ? 'blue' : 'teal'} onClick={() => navigate('/login?role=' + role)}>
//                             Login here
//                         </Button>
//                     </Text>
//                 </Box>
//             </Flex>
//         </Flex>
//     );
// };

// export default Register;



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
                boxShadow="lg"
            >
               
                <Box flex="1" display={{ base: "none", md: "block" }}>
                    <Image
                        src={registerImage} 
                        alt="Register Image"
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
                        Create Account
                    </Text>
                    <Stack spacing={4} width="100%" maxW="md">
                        <FormControl id="firstName">
                            <FormLabel>User Name</FormLabel>
                            <Input
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                size="sm"
                            />
                        </FormControl>
                        
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="sm"
                            />
                        </FormControl>
                        <Flex width="100%" mb={4} gap={2}>
                            <FormControl id="password" flex="1">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="sm"
                                />
                            </FormControl>
                            <FormControl id="confirmPassword" flex="1">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    size="sm"
                                />
                            </FormControl>
                        </Flex>
                        <FormControl id="role">
                            <FormLabel>Role</FormLabel>
                            <Select
                                placeholder="Select role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                size="sm"
                            >
                                <option value="job_seeker">Job Seeker</option>
                                <option value="employer">Employer</option>
                            </Select>
                        </FormControl>
                        <Button
                            colorScheme="blue"
                            onClick={handleRegister}
                            _hover={{
                                bg: 'blue.600',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease, bg 0.3s ease',
                            }}
                        >
                            Register
                        </Button>
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Register;