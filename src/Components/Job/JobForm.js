
import React, { useContext, useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Select, 
    Textarea, 
    Input, 
    useToast, 
    Heading, 
    Flex, 
    Icon 
} from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const JobForm = ({ onSubmit, onCancel, initialJob, isEditing, onDelete }) => {
    const [jobTitle, setJobTitle] = useState(initialJob ? initialJob.title : '');
    const [jobDescription, setJobDescription] = useState(initialJob ? initialJob.description : '');
    const [jobType, setJobType] = useState(initialJob ? initialJob.type : '');
    const [jobSalary, setJobSalary] = useState(initialJob ? initialJob.salary : '');
    const [jobCategory, setJobCategory] = useState(initialJob ? initialJob.category : '');
    const [jobLocation, setJobLocation] = useState(initialJob ? initialJob.location : '');

    const { user } = useContext(AuthContext);
    const toast = useToast();

    useEffect(() => {
        if (initialJob) {
            setJobTitle(initialJob.title);
            setJobDescription(initialJob.description);
            setJobType(initialJob.type);
            setJobSalary(initialJob.salary);
            setJobCategory(initialJob.category);
            setJobLocation(initialJob.location);
        }
    }, [initialJob]);

    const handleSubmit = () => {
        const jobData = {
            id: isEditing ? initialJob.id : Date.now(),
            title: jobTitle,
            description: jobDescription,
            type: jobType,
            location: jobLocation,
            salary: jobSalary,
            category: jobCategory,
            postedBy: user.email
        };
        onSubmit(jobData);
        toast({
            title: isEditing ? 'Job updated!' : 'Job posted!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleSalaryChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); 
        setJobSalary(value);
    };

    return (
        <Flex 
            justify="center" 
            align="center" 
            minH="100vh" 
            bg="gray.50" 
            p={6}
        >
            <Box 
                p={6} 
                borderWidth={1} 
                borderRadius="md" 
                boxShadow="lg" 
                bg="white"
                width="100%"
                maxW="600px"
            >
                <Heading as="h2" size="lg" mb={6} textAlign="center">
                    {isEditing ? 'Edit Job' : 'Post Job'}
                </Heading>
                <FormControl id="title" mb={4}>
                    <FormLabel>Job Title</FormLabel>
                    <Select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Graphic Designer">Graphic Designer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Sales Executive">Sales Executive</option>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="HR Specialist">HR Specialist</option>
                        <option value="Operations Manager">Operations Manager</option>
                        <option value="Customer Support Representative">Customer Support Representative</option>
                        <option value="Business Analyst">Business Analyst</option>
                        <option value="Content Writer">Content Writer</option>
                    </Select>
                </FormControl>
                <FormControl id="description" mb={4}>
                    <FormLabel>Job Description</FormLabel>
                    <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </FormControl>
                <FormControl id="type" mb={4}>
                    <FormLabel>Job Type</FormLabel>
                    <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Freelance">Freelance</option>
                    </Select>
                </FormControl>
                <FormControl id="salary" mb={4}>
                    <FormLabel>Salary</FormLabel>
                    <Input 
                        type="text" 
                        value={formatCurrency(jobSalary)} 
                        onChange={handleSalaryChange} 
                    />
                </FormControl>
                <FormControl id="category" mb={4}>
                    <FormLabel>Category</FormLabel>
                    <Select value={jobCategory} onChange={(e) => setJobCategory(e.target.value)}>
                        <option value="Technology">Technology</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Operations">Operations</option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Design">Design</option>
                        <option value="Legal">Legal</option>
                    </Select>
                </FormControl>
                <FormControl id="location" mb={4}>
                    <FormLabel>Location</FormLabel>
                    <Select value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}>
                        <option value="New York, NY">New York, NY</option>
                        <option value="San Francisco, CA">San Francisco, CA</option>
                        <option value="Los Angeles, CA">Los Angeles, CA</option>
                        <option value="Chicago, IL">Chicago, IL</option>
                        <option value="Austin, TX">Austin, TX</option>
                        <option value="Seattle, WA">Seattle, WA</option>
                        <option value="Boston, MA">Boston, MA</option>
                        <option value="Atlanta, GA">Atlanta, GA</option>
                        <option value="Remote">Remote</option>
                        <option value="Miami, FL">Miami, FL</option>
                        <option value="London, UK">London, UK</option>
                        <option value="Toronto, Canada">Toronto, Canada</option>
                    </Select>
                </FormControl>
                <Flex justifyContent="center" mt={6}>
                    <Button 
                        colorScheme="teal" 
                        onClick={handleSubmit} 
                        mr={4} 
                        leftIcon={isEditing ? <Icon as={FaEdit} /> : <Icon as={FaCheck} />}
                    >
                        {isEditing ? 'Update Job' : 'Post Job'}
                    </Button>
                    {isEditing && (
                        <Button 
                            colorScheme="red" 
                            onClick={() => onDelete(initialJob)}
                            leftIcon={<Icon as={FaTrash} />}
                        >
                            Delete Job
                        </Button>
                    )}
                    {!isEditing && (
                        <Button onClick={onCancel}>Cancel</Button>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
};

export default JobForm;
