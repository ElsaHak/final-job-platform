
import React from 'react';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'; 

const JobCard = ({ job, onEdit, onDelete, onViewApplications }) => (
    <Box
        p={4}
        borderWidth={1}
        borderRadius="md"
        bg="white"
        borderColor="gray.200"
        boxShadow="md"
        _hover={{ borderColor: 'teal.400', boxShadow: 'lg' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%" 
        height="100%" 
        minHeight="200px" 
        overflow="hidden" 
    >
        <VStack align="start" spacing={3} overflow="hidden">
            <Text fontSize="xl" fontWeight="bold" noOfLines={2}>{job.title}</Text>
            <Text noOfLines={4}>{job.description}</Text>
            <Text>Location: {job.location}</Text>
            <Text>Type: {job.type}</Text>
            <Text>Salary: {job.salary}</Text>
            <Text>Category: {job.category}</Text>
            <Text>Requirements: {job.requirements}</Text>
        </VStack>
        <HStack spacing={4} mt={4} justifyContent="flex-end">
            <Button colorScheme="blue" onClick={onEdit} leftIcon={<EditIcon />}>Edit</Button>
            <Button colorScheme="teal" onClick={() => onViewApplications(job)} leftIcon={<ViewIcon />}>
                View Applications
            </Button>
          
        </HStack>
    </Box>
);

export default JobCard;
