import CareerRecommendations from './CareerRecommendations';
import LearningRecommendations from './LearningRecommendations';

export default function Recommendations({ userSkills, missingSkills, skillsToImprove }) {
  return (
    <div className="space-y-8">
      {/* Career Recommendations based on strong skills */}
      <div>
        <h2 className="text-xl font-semibold">Career Recommendations</h2>
        <CareerRecommendations userSkills={userSkills} />
      </div>

      {/* Learning Recommendations based on missing & improving skills only */}
      <div>
        <h2 className="text-xl font-semibold">Learning Recommendations</h2>
        <LearningRecommendations
          missingSkills={missingSkills}
          skillsToImprove={skillsToImprove}
        />
      </div>
    </div>
  );
}
