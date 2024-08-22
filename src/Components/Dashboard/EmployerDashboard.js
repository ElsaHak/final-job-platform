import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Button,
    Stack,
    Text,
    Grid,
    GridItem,
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    HStack
} from '@chakra-ui/react';
import Navbar from '../Layout/Navbar';
import JobForm from '../Job/JobForm';
import JobCard from '../Job/JobCard';
import { AuthContext } from '../../contexts/AuthContext'; 
import './Employer.css';

const categories = ['Technology', 'Finance', 'Sales', 'Design', 'Marketing', 'Healthcare', 'Education', 'All'];

const EmployerDashboard = () => {
    const [isPostingJob, setIsPostingJob] = useState(false);
    const [isEditingJob, setIsEditingJob] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All'); 
    const [categoryFilter, setCategoryFilter] = useState('All'); 
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { user } = useContext(AuthContext); 

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(storedJobs);
    
        const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(storedApplications);
    }, [applications]); 
    
    const handlePostJob = () => {
        setIsPostingJob(true);
        setIsEditingJob(false);
        setCurrentJob(null);
    };

    const handleEditJob = (job) => {
        setIsEditingJob(true);
        setIsPostingJob(true);
        setCurrentJob(job);
    };

    const handleCancelPost = () => {
        setIsPostingJob(false);
        setIsEditingJob(false);
        setCurrentJob(null);
    };

    const handleDeleteJob = (jobToDelete) => {
        const updatedJobs = jobs.filter((job) => job.id !== jobToDelete.id);
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        handleCancelPost();
    };

    const handleAddJob = (newJob) => {
        const updatedJobs = [...jobs, newJob];
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        handleCancelPost();
    };

    const handleUpdateJob = (editedJob) => {
        const updatedJobs = jobs.map((job) =>
            job.id === editedJob.id ? editedJob : job
        );
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        handleCancelPost();
    };

    const filterJobs = (jobs) => {
        return jobs.filter((job) => {
            const matchesSearchQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTypeFilter = filter === 'All' || job.type === filter;
            const matchesCategoryFilter = categoryFilter === 'All' || job.category === categoryFilter;
            const matchesUser = job.postedBy === user.email; 
            return matchesSearchQuery && matchesTypeFilter && matchesCategoryFilter && matchesUser;
        });
    };

    const filteredJobs = filterJobs(jobs);

    const jobApplications = selectedJob ? applications.filter(app => app.job.id === selectedJob.id) : [];

    const handleStatusChange = (applicationId, newStatus) => {
        console.log('Updating application:', applicationId, 'to status:', newStatus);
    
        if (applicationId === undefined) {
            console.error('Application ID is undefined.');
            return;
        }
    
        const updatedApplications = applications.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
        );
    
        console.log('Updated applications:', updatedApplications);
    
        setApplications(updatedApplications);
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
    };

   
    const totalPages = Math.ceil(jobApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApplications = jobApplications.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Box>
            <Navbar onPostJob={handlePostJob} />
            {isPostingJob && (
                <JobForm
                    onCancel={handleCancelPost}
                    onSubmit={isEditingJob ? handleUpdateJob : handleAddJob}
                    initialJob={currentJob}
                    isEditing={isEditingJob}
                    onDelete={handleDeleteJob}
                />
            )}
            <Box p={4}>
                <Center mb={4}>
                    {!isPostingJob && (
                        <Button
                            colorScheme="teal"
                            size="md"
                            width="200px"
                            onClick={handlePostJob}
                        >
                            Post Job
                        </Button>
                    )}
                </Center>

                {!isPostingJob && !selectedJob && (
                    <Center mb={4}>
                        <Stack direction="row" spacing={4}>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    colorScheme={categoryFilter === category ? 'teal' : 'gray'}
                                    onClick={() => setCategoryFilter(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </Stack>
                    </Center>
                )}

                {!isPostingJob && !selectedJob && (
                    <Box>
                        {filteredJobs.length === 0 ? (
                            <Text textAlign="center">No jobs available.</Text>
                        ) : (
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                {filteredJobs.map((job) => (
                                    <GridItem key={job.id}>
                                        <JobCard
                                            job={job}
                                            onEdit={() => handleEditJob(job)}
                                            onViewApplications={() => setSelectedJob(job)}
                                        />
                                    </GridItem>
                                ))}
                            </Grid>
                        )}
                    </Box>
                )}

                {selectedJob && (
                    <Box mt={8}>
                        <Button colorScheme="teal" mb={4} onClick={() => setSelectedJob(null)}>
                            Back to Job List
                        </Button>
                        <Text fontSize="xl" mb={4}><strong>Applications for: {selectedJob.title}</strong></Text>
                        {jobApplications.length > 0 ? (
                            <>
                                <Table
                                    variant="striped"
                                    size="lg"
                                    border="1px solid #ddd"
                                    boxShadow="md"
                                    className="custom-table"
                                    sx={{
                                        thead: {
                                            backgroundColor: 'teal.500',
                                            color: 'white',
                                        },
                                        tbody: {
                                            tr: {
                                                backgroundColor: 'white',
                                                _hover: {
                                                    backgroundColor: 'teal.100',
                                                },
                                            },
                                        },
                                        th: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                            <Th>Phone</Th>
                                            <Th>Status</Th>
                                            <Th>Date</Th>
                                            <Th>Resume</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {currentApplications.map((app) => (
                                            <Tr key={app.id}>
                                                <Td>{app.name}</Td>
                                                <Td>{app.email}</Td>
                                                <Td>{app.phone}</Td>
                                                <Td>{app.status}</Td>
                                                <Td>{new Date(app.date).toLocaleDateString()}</Td>
                                                <Td>
                                                    {app.resume.url ? (
                                                        <Button
                                                            as="a"
                                                            href={app.resume.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            colorScheme="teal"
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Download Resume
                                                        </Button>
                                                    ) : (
                                                        'No Resume'
                                                    )}
                                                </Td>
                                                <Td>
                                                    <Stack direction="row" spacing={2}>
                                                        <Button
                                                            colorScheme="green"
                                                            onClick={() => handleStatusChange(app.id, 'Selected')}
                                                        >
                                                            Select
                                                        </Button>
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={() => handleStatusChange(app.id, 'Rejected')}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Stack>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>

                                <HStack spacing={4} mt={4} justify="center">
                                    <Button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        isDisabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Text>Page {currentPage} of {totalPages}</Text>
                                    <Button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        isDisabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </HStack>
                            </>
                        ) : (
                            <Text textAlign="center">No applications for this job.</Text>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EmployerDashboard;

