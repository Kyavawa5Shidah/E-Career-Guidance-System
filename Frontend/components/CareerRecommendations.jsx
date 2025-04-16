import { useEffect, useState } from 'react';

export default function CareerRecommendations({ userSkills }) {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await fetch('/api/recommend-careers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: userSkills }),
      });
      const data = await response.json();
      setCareers(data.careers);
    };

    if (userSkills?.length > 0) {
      fetchRecommendations();
    }
  }, [userSkills]);

  return (
    <ul>
      {careers.map((career, idx) => <li key={idx}>{career}</li>)}
    </ul>
  );
}
