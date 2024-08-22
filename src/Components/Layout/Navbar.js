



import React, { useContext, useState } from 'react';
import { Flex, Button, Heading, Text, Box, useToast, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        logout();
        toast({
            title: "Logged out successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });

        const redirectPath = user.role === 'employer' ? '/login?role=employer' : '/login?role=job_seeker';
        navigate(redirectPath);
    };

    return (
        <Flex
            bg="teal.600"
            p={4}
            color="white"
            justify="space-between"
            align="center"
            boxShadow="md"
            borderBottom="1px solid" 
            borderColor="teal.700"
        >
            <Heading size="lg" letterSpacing="wider">
                Job Platform
            </Heading>
            {user ? (
                <Flex align="center">
                    <Box
                        display="flex"
                        alignItems="center"
                        color="white"
                        borderRadius="full"
                        p={2}
                        boxShadow="md"
                        mr={4}
                        cursor="pointer"
                        onClick={onOpen} 
                    >
                        <Avatar 
                            name={user.firstName}
                            src={user.avatarUrl || undefined} 
                            size="sm" 
                            mr={2}
                        />
                        <Box>
                            <Text fontSize="lg" fontWeight="bold">{user.firstName}</Text>
                           
                        </Box>
                    </Box>
                    <Button colorScheme="teal" onClick={handleLogout}>
                        Logout
                    </Button>
                </Flex>
            ) : (
                <Button colorScheme="teal" onClick={() => navigate('/login')}>
                    Login
                </Button>
            )}

            
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column" align="center">
                            <Avatar 
                                name={user.firstName}
                                src={user.avatarUrl || undefined} 
                                size="xl" 
                                mb={4}
                            />
                            <Text fontSize="2xl" fontWeight="bold">{user.firstName} {user.lastName}</Text>
                            <Text fontSize="lg" color="gray.600">{user.email}</Text>
                            
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Navbar;
