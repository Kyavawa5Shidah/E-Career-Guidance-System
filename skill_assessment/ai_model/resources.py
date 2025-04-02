def fetch_learning_resources(skill_gaps):
    resources = {
        "Python Programming": [
            "Python for Beginners - Coursera",
            "Advanced Python - Udemy",
            "Python Crash Course - Codeacademy",
            "Automate the Boring Stuff with Python - Udemy",
            "Python Data Structures - University of Michigan (Coursera)"
        ],
        "Data Analysis": [
            "Data Science Specialization - Coursera",
            "Google Data Analytics Certificate - Coursera",
            "SQL for Data Science - Udacity",
            "Pandas for Data Analysis - Kaggle",
            "Introduction to Data Analysis - DataCamp"
        ],
        "Machine Learning": [
            "Machine Learning by Andrew Ng - Coursera",
            "Deep Learning Specialization - Coursera",
            "Hands-on Machine Learning with Scikit-Learn - O'Reilly",
            "TensorFlow for Beginners - Udacity",
            "Practical Deep Learning for Coders - fast.ai"
        ],
        "Web Development": [
            "The Complete Web Developer Bootcamp - Udemy",
            "Full Stack Open - University of Helsinki",
            "JavaScript for Beginners - freeCodeCamp",
            "React - The Complete Guide - Udemy",
            "Django for Beginners - William S. Vincent"
        ],
        "Cloud Computing": [
            "AWS Certified Solutions Architect - Coursera",
            "Google Cloud Fundamentals - Coursera",
            "Azure Fundamentals - Microsoft Learn",
            "Cloud Computing Specialization - Udacity",
            "Kubernetes for Beginners - Udemy"
        ],
        "Cybersecurity": [
            "Cybersecurity Fundamentals - IBM (Coursera)",
            "Certified Ethical Hacker (CEH) - Udemy",
            "Introduction to Cybersecurity - Cisco",
            "CompTIA Security+ Certification - Pluralsight",
            "Network Security Essentials - Coursera"
        ],
        "Database Management": [
            "SQL for Beginners - Udemy",
            "Database Design and Management - Coursera",
            "MongoDB for Developers - MongoDB University",
            "PostgreSQL for Everybody - University of Michigan",
            "Mastering MySQL - Udemy"
        ],
        "Mobile App Development": [
            "Android App Development - Udacity",
            "Flutter & Dart - The Complete Guide - Udemy",
            "SwiftUI for iOS Developers - Coursera",
            "React Native - The Practical Guide - Udemy",
            "iOS Development with Swift - Stanford University"
        ],
        "DevOps & CI/CD": [
            "DevOps Fundamentals - Udacity",
            "CI/CD Pipelines with Jenkins - Udemy",
            "Docker & Kubernetes - The Practical Guide - Udemy",
            "AWS DevOps Engineer - Coursera",
            "Ansible for DevOps - LeanPub"
        ],
        "AI & Natural Language Processing": [
            "Natural Language Processing with Python - Coursera",
            "Hugging Face Transformers Course - Hugging Face",
            "Deep Learning for NLP - Stanford University",
            "AI for Everyone - Andrew Ng (Coursera)",
            "Applied AI with Deep Learning - IBM (Coursera)"
        ]
    }

    recommendations = {}
    for skill in skill_gaps:
        recommendations[skill] = resources.get(skill, ["No resources found"])
    
    return recommendations
