import React from 'react';
import { Box, Heading, Text, Button, Stack, Icon, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaUser, FaBriefcase, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; 

const Home = () => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

    return (
        <Box
            textAlign="center"
            py={20}
            px={8}
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            zIndex="1"
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgImage="url('https://www.hermos.com/wp-content/uploads/2022/08/hermos-karriere-titelbild.jpg')"
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                zIndex="-1"
                opacity="0.5"
            />
            <Box zIndex="2"  p={8} borderRadius="lg">
                <Heading as="h2" size="2xl" mb={6} color="black">
                Discover Your Next Opportunity with Us

                </Heading>
                <Text fontSize="lg" color="black" mb={12}>
                Welcome to your go-to platform for finding exceptional job opportunities and connecting with top employers. Whether you're a job seeker looking for your next big break or an employer seeking to find the perfect candidate, we’ve got you covered. Explore our features and start your journey toward success today!

                </Text>
                <Stack spacing={4} direction="row" align="center" justify="center" mb={16}>
                    <Link to="/login?role=jobseeker">
                        <Button
                            colorScheme="teal"
                            size="lg"
                            variant="solid"
                            borderRadius="md"
                            _hover={{
                                bg: 'teal.600',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease, bg 0.3s ease',
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Icon as={FaUser} mr={2} />
                            Job Seeker Login
                        </Button>
                    </Link>
                    <Link to="/login?role=employer">
                        <Button
                            colorScheme="blue"
                            size="lg"
                            variant="solid"
                            borderRadius="md"
                            _hover={{
                                bg: 'blue.600',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease, bg 0.3s ease',
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Icon as={FaBriefcase} mr={2} />
                            Employer Login
                        </Button>
                    </Link>
                </Stack>
                
                <Box mt={16} mb={12} px={4}>
                    <Heading as="h3" size="xl" mb={6} color="black">
                        What Our Users Say
                    </Heading>
                    <SimpleGrid columns={gridColumns} spacing={8}>
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Icon as={FaQuoteLeft} boxSize={8} color="gray.400" mb={4} />
                            <Text fontSize="lg" color="gray.700" mb={4}>
                                "This platform has made job searching so much easier. The interface is user-friendly and the job listings are top-notch."
                            </Text>
                            <Text fontWeight="bold" color="gray.900">
                                Jane Doe
                            </Text>
                            <Text color="gray.600">Job Seeker</Text>
                        </Box>
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Icon as={FaQuoteLeft} boxSize={8} color="gray.400" mb={4} />
                            <Text fontSize="lg" color="gray.700" mb={4}>
                                "As an employer, I appreciate the ease of posting jobs and managing applications. Highly recommend this platform!"
                            </Text>
                            <Text fontWeight="bold" color="gray.900">
                                John Smith
                            </Text>
                            <Text color="gray.600">Employer</Text>
                        </Box>
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Icon as={FaQuoteLeft} boxSize={8} color="gray.400" mb={4} />
                            <Text fontSize="lg" color="gray.700" mb={4}>
                                "The job board is very comprehensive and provides great opportunities. I found my dream job here!"
                            </Text>
                            <Text fontWeight="bold" color="gray.900">
                                Alice Johnson
                            </Text>
                            <Text color="gray.600">Job Seeker</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
            
        </Box>
    );
};

export default Home;
