import React, { useState } from 'react';
import { Box, Input, Textarea, Button, Stack, Text } from '@chakra-ui/react';

const JobApplicationForm = ({ job, onCancel, onSubmit }) => {
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const application = {
            id: Date.now(),
            jobId: job.id,
            employerId: job.employerId,
            applicantName,
            applicantEmail,
            resumeUrl,
            coverLetter,
        };
        onSubmit(application);
        onCancel();
    };

    return (
        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <Text fontSize="xl" mb={4}>Apply for {job.title}</Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Input
                        placeholder="Name"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Resume URL"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Cover Letter"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={4}
                    />
                    <Stack direction="row" spacing={4} mt={4}>
                        <Button colorScheme="blue" type="submit">Submit</Button>
                        <Button colorScheme="gray" onClick={onCancel}>Cancel</Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default JobApplicationForm;
