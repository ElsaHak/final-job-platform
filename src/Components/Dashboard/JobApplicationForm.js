import React, { useState } from 'react';
import { Box, Input, Button, Textarea, Stack, Heading, Text, FormControl, FormLabel } from '@chakra-ui/react';

const JobApplicationForm = ({ job, onSubmit, onCancel }) => {
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !phone || !resume) {
            setError("Please fill out all required fields.");
            return;
        }

        if (!resume.name.endsWith('.pdf')) {
            setError("Resume must be a PDF file.");
            return;
        }

        const resumeUrl = URL.createObjectURL(resume);

        const application = {
            id: Date.now(), 

            job,
            name,
            email,
            phone,
            status: 'Pending',
            date: new Date().toISOString(),
            resume: { url: resumeUrl, name: resume.name },
            coverLetter,
            
            
           
            
            
        };
        onSubmit(application);
    };

    return (
        <Box p={6} borderWidth={1} borderRadius="md" bg="white" borderColor="gray.200">
            <Stack spacing={4}>
                <Heading size="md" mb={4}>{job.title}</Heading>
                <Text mb={4}><strong>Description:</strong> {job.description}</Text>
                <Text mb={4}><strong>Requirements:</strong> {job.requirements}</Text>

                {error && <Text color="red.500">{error}</Text>}

                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Resume (PDF)</FormLabel>
                    <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Cover Letter</FormLabel>
                    <Textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Cover letter (optional)"
                    />
                </FormControl>

                <Stack direction="row" spacing={4}>
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Submit Application
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default JobApplicationForm;
