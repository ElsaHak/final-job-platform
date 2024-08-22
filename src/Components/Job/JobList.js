

import React from 'react';
import { Box, Text, Button, Stack } from '@chakra-ui/react';

const JobList = ({ jobs, onEditJob, onDeleteJob, onViewApplications }) => {
    return (
        <Stack spacing={4}>
            {jobs.map((job) => (
                <Box key={job.id} p={4} borderWidth={1} borderRadius="md" bg="white" borderColor="gray.200">
                    <Text fontSize="lg" fontWeight="bold">{job.title}</Text>
                    <Text mb={2}><strong>Description:</strong> {job.description}</Text>
                    <Text mb={2}><strong>Requirements:</strong> {job.requirements}</Text>
                    <Stack direction="row" spacing={4} mt={4}>
                        <Button colorScheme="blue" onClick={() => onEditJob(job)}>
                            Edit
                        </Button>
                        <Button colorScheme="red" onClick={() => onDeleteJob(job)}>
                            Delete
                        </Button>
                        <Button colorScheme="teal" onClick={() => onViewApplications(job)}>
                            View Applications
                        </Button>
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default JobList;

