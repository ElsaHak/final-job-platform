import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';

const ApplicationList = ({ applications }) => {
    return (
        <Box>
            {applications.length === 0 ? (
                <Text>No applications found.</Text>
            ) : (
                <Stack spacing={4}>
                    {applications.map((application) => (
                        <Box key={application.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                            <Text fontSize="lg" fontWeight="bold">Applied for Job ID: {application.jobId}</Text>
                            <Text mt={2}>Name: {application.applicantName}</Text>
                            <Text mt={2}>Email: {application.applicantEmail}</Text>
                            <Text mt={2}>Resume URL: {application.resumeUrl}</Text>
                            <Text mt={2}>Cover Letter: {application.coverLetter}</Text>
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default ApplicationList;
