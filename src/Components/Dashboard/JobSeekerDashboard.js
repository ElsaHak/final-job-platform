import React, { useState, useEffect, useContext } from 'react';
import { Box, Heading, Grid, SimpleGrid, Stack, Input, Button, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import JobSeekerCard from './JobSeekerCard.js';
import Navbar from '../Layout/Navbar';
import JobApplicationForm from './JobApplicationForm.js';
import { AuthContext } from '../../contexts/AuthContext'; 

const jobTypes = ['Internship', 'Remote', 'Full-time', 'Part-time', 'All'];
const JobSeekerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [isApplying, setIsApplying] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [applications, setApplications] = useState([]);
    const { user } = useContext(AuthContext); 
    const { isOpen, onToggle } = useDisclosure();
    const [refresh, setRefresh] = useState(false);
    

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(storedJobs);

        const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(storedApplications);
    }, [jobs]);
   
    

    const handleApply = (job) => {
        setSelectedJob(job);
        setIsApplying(true);
    };

    const handleCancelApplication = () => {
        setIsApplying(false);
        setSelectedJob(null);
    };
   
    
    const handleSubmitApplication = (application) => {
        console.log('Submitting application:', application);
    

        const updatedApplications = [...applications, application];
        setApplications(updatedApplications);
    
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
    
     
        handleCancelApplication();
    };
    
    

 
    const handleDeleteApplication = (index) => {
        const updatedApplications = applications.filter((_, i) => i !== index);
        setApplications(updatedApplications);
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
        setRefresh(!refresh);  
    };
    
   
    const userApplications = user
        ? applications.filter(app => app.email.trim().toLowerCase() === user.email.trim().toLowerCase())
        : [];

    const filteredJobs = jobs.filter((job) => {
        const matchesSearchQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTypeFilter = filter === 'All' || job.type === filter;
        return matchesSearchQuery && matchesTypeFilter;
    });



    return (
        <>
            <Navbar />
            <Box p={4} borderWidth={1} borderRadius="md" textAlign={'center'} position="relative">
                <IconButton
                    aria-label={isOpen ? "Hide Application History" : "Show Application History"}
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    colorScheme="teal"
                    onClick={onToggle}
                    position="absolute"
                    top={4}
                    right={4}
                    zIndex={1}
                />

                {!isOpen && (
                    <>
                        <Heading mb={4} marginTop={'20px'}>Search Your Dream Job</Heading>

                        <Input
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            mb={4}
                            width="50%"
                            marginTop={'20px'}
                        />

                        <Stack direction="row" spacing={4} mb={4} marginLeft={'480px'} marginTop={'20px'}>
                            {jobTypes.map((type) => (
                                <Button
                                    key={type}
                                    colorScheme={filter === type ? 'teal' : 'gray'}
                                    onClick={() => setFilter(type)}
                                >
                                    {type}
                                </Button>
                            ))}
                        </Stack>
                    </>
                )}

                {isOpen && userApplications.length > 0 ? (
                    <Box mt={16}>
                        <Heading size="md" mb={4}>Application History</Heading>
                        <Table variant="striped" >
                            <Thead>
                            <Tr bg="teal.500" color="white">
                                    <Th>Job Title</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                  
                                    <Th>Date</Th>
                                    <Th>Status</Th>
                                    
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {userApplications.map((app, index) => (
                                    <Tr key={index}>
                                        <Td>{app.job.title}</Td>
                                        <Td>{app.name}</Td>
                                        <Td>{app.email}</Td>
                                        <Td>{new Date(app.date).toLocaleDateString()}</Td>
                                        <Td>{app.status}</Td>
                                       
                                        
                                        <Td>
                                            <IconButton
                                                aria-label="Delete"
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                onClick={() => handleDeleteApplication(index)}
                                            />
                                        </Td> 
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                    </Box>
                ) : isOpen ? (
                    <Text>No applications found.</Text>
                ) : null}

                {!isOpen && (
                    <Grid
                        templateColumns={isApplying ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))'}
                        gap={4}
                    >
                        {isApplying ? (
                            <Box>
                                <SimpleGrid columns={1} spacing={4}>
                                    {filteredJobs.map((job) => (
                                        <JobSeekerCard
                                            key={job.id}
                                            job={job}
                                            onApply={() => handleApply(job)}
                                        />
                                    ))}
                                </SimpleGrid>
                            </Box>
                        ) : (
                            <Box gridColumn={{ md: 'span 2' }}>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    {filteredJobs.map((job) => (
                                        <JobSeekerCard
                                            key={job.id}
                                            job={job}
                                            onApply={() => handleApply(job)}
                                        />
                                    ))}
                                </SimpleGrid>
                            </Box>
                        )}

                        {isApplying && selectedJob && (
                            <Box p={4} borderWidth={1} borderRadius="md" bg="white" borderColor="gray.200">
                                <JobApplicationForm
                                    job={selectedJob}
                                    onSubmit={handleSubmitApplication}
                                    onCancel={handleCancelApplication}
                                />
                            </Box>
                        )}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default JobSeekerDashboard;




