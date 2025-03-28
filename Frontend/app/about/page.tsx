export default function AboutPage() {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">About E-Career Guidance System</h1>
  
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            The E-Career Guidance System (ECGS) is an AI-powered platform designed to help Ugandan youth make informed
            career choices aligned with their strengths and market demands.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to bridge the gap between education and employment by providing personalized career guidance,
            skill assessment tools, and job market insights to young people in Uganda.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-powered career matching based on your skills, interests, and educational background</li>
            <li>Comprehensive skill gap analysis to identify areas for development</li>
            <li>Real-time job market insights and listings</li>
            <li>Career growth tracking and personalized learning paths</li>
            <li>Connections with mentors and professionals in various fields</li>
          </ul>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p>
            ECGS was developed by a team of education specialists, career counselors, data scientists, and software
            engineers committed to improving career outcomes for Ugandan youth.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            Have questions or feedback? Reach out to us at{" "}
            <a href="mailto:support@ecgs.com" className="text-primary hover:underline">
              support@ecgs.com
            </a>
          </p>
        </div>
      </div>
    )
  }
  
  
  