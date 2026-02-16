import { useParams } from 'react-router-dom';
import { experienceDetails } from '../../constants';
import { ExperienceDetails } from './ExperienceDetails';
import { Layout } from '../Layout';

export const ExperiencePage = () => {
    const { id } = useParams<{ id: string }>();
    const experience = experienceDetails.find(exp => exp.id === id);
    const currentIndex = experienceDetails.findIndex(exp => exp.id === id);
    
    if (!experience) {
        return <Layout element={<div>Experience not found</div>} />;
    }

    const prevId = currentIndex < experienceDetails.length - 1 ? experienceDetails[currentIndex + 1].id : undefined;
    const nextId = currentIndex > 0 ? experienceDetails[currentIndex - 1].id : undefined;

    return (
        <Layout element={
            <ExperienceDetails
                {...experience}
                prevId={prevId}
                nextId={nextId}
            />
        } />
    );
}; 