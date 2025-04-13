'use client'
import React, { useState } from 'react';

const CareerMatch: React.FC = () => {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [preferences, setPreferences] = useState('');
  const [results, setResults] = useState<string[] | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/match-careers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests, skills, education, preferences }),
      });
  
      const data = await response.json();
      console.log('Response from backend:', data); // Debug
  
      if (response.ok && Array.isArray(data.careers)) {
        setResults(data.careers);
      } else {
        setResults([`Error: ${data.error || "Unexpected response"}`]);
      }
    } catch (error) {
      setResults(['Something went wrong!']);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h2>Career Guidance</h2>
      <textarea placeholder="Interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
      <textarea placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
      <textarea placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} />
      <textarea placeholder="Preferences" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Matching...' : 'Find Careers'}
      </button>

      {results && (
  <div>
    <h3>Results</h3>
    <ul>
      {results.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default CareerMatch;
