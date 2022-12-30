import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button as button,
    FormText,
} from 'reactstrap';

function CvForm() {
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [languages, setLanguages] = useState([]);

    const handleEducationChange = e => {
        setEducation(e.target.value.split(','));
        console.log(education);
    };

    const handleExperienceChange = e => {
        setExperience(e.target.value.split(','));
        console.log(experience);
    };

    const handleLanguagesChange = e => {
        setLanguages(e.target.value.split(','));
        console.log(languages);
    };


    return (
        <Form >
            <FormGroup>
                <Label for="educationInput">Education</Label>
                <Input
                    type="text"
                    name="education"
                    id="educationInput"
                    placeholder="Enter your education (comma-separated)"
                    onChange={handleEducationChange}
                />
                <FormText>
                    Enter your education in the following format: "degree, institution,
                    graduation year" (comma-separated)
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label for="experienceInput">Experience</Label>
                <Input
                    type="text"
                    name="experience"
                    id="experienceInput"
                    placeholder="Enter your experience (comma-separated)"
                    onChange={handleExperienceChange}
                />
                <FormText>
                    Enter your experience in the following format: "position, company,
                    start date - end date" (comma-separated)
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label for="languagesInput">Languages</Label>
                <Input
                    type="text"
                    name="languages"
                    id="languagesInput"
                    placeholder="Enter your languages (comma-separated)"
                    onChange={handleLanguagesChange}
                />
            </FormGroup>
        </Form>
    );
}

export default CvForm;