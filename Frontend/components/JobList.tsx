"use client";

import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  job_url: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/jobs/");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Job Listings</h2>
      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <a
                href={job.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Job
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}
