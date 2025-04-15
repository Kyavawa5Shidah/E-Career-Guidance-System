import { useEffect, useState } from 'react';
import { FaYoutube, FaW3c, FaFreeCodeCamp, FaUniversity } from 'react-icons/fa';
import { SiCoursera, SiKhanacademy, SiEdx } from 'react-icons/si';

const siteIcons = {
  W3Schools: <FaW3c className="inline mr-1" />,
  Coursera: <SiCoursera className="inline mr-1" />,
  YouTube: <FaYoutube className="inline mr-1 text-red-600" />,
  edX: <SiEdx className="inline mr-1 text-purple-600" />,
  'Khan Academy': <SiKhanacademy className="inline mr-1 text-teal-600" />,
  FreeCodeCamp: <FaFreeCodeCamp className="inline mr-1 text-black" />,
};

const siteColors = {
  W3Schools: 'bg-green-100 text-green-800',
  Coursera: 'bg-blue-100 text-blue-800',
  YouTube: 'bg-red-100 text-red-800',
  edX: 'bg-purple-100 text-purple-800',
  'Khan Academy': 'bg-teal-100 text-teal-800',
  FreeCodeCamp: 'bg-gray-100 text-gray-900',
};

export default function LearningRecommendations({ missingSkills, skillsToImprove }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch('/api/recommend-learning/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missing_skills: missingSkills, skills_to_improve: skillsToImprove }),
      });

      const data = await response.json();
      setResources(data.resources);
    };

    if (missingSkills.length > 0 || skillsToImprove.length > 0) {
      fetchResources();
    }
  }, [missingSkills, skillsToImprove]);

  const groupedResources = resources.reduce((acc, item) => {
    if (!acc[item.skill]) acc[item.skill] = [];
    acc[item.skill].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedResources).map((skill, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{skill}</h3>
          <div className="flex flex-wrap gap-2">
            {groupedResources[skill].map((item, index) => (
              <a
                key={index}
                href={item.resource}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-1 ${siteColors[item.site] || 'bg-gray-200 text-gray-800'} hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out`}
              >
                {siteIcons[item.site] || null}
                {item.site}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
