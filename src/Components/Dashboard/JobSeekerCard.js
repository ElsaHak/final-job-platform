import React from 'react';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';

const JobSeekerCard = ({ job, onApply }) => (
    <Box
        p={4}
        borderWidth={1}
        borderRadius="md"
        bg="white"
        borderColor="gray.200"
        boxShadow="md"
        _hover={{ borderBottom: 'black', borderLeft: 'black',boxShadow: 'lg' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
    >
        <VStack align="start" spacing={3}>
            <Text fontSize="xl" fontWeight="bold">{job.title}</Text>
            <div style={{borderBottom:'1px solid black', height:'4px',width:'100%'}}></div>
            
            <Text>Location: {job.location}</Text>
            <Text>Type: {job.type}</Text>
            <Text>Salary: {job.salary}</Text>
            <Text>Category: {job.category}</Text>
       
        </VStack>
        <HStack spacing={4} mt={4} justifyContent="flex-end">
            <Button colorScheme="teal" onClick={onApply}>Details</Button>
        </HStack>
    </Box>
);

export default JobSeekerCard;
