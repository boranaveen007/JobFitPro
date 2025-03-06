JobFitPro - AI-Powered Resume Analyzer 🚀

📢 JobFitPro is a free, open-source AI-powered resume analysis tool designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) and job descriptions. Built with cutting-edge AI models and state-of-the-art resume parsing techniques, JobFitPro bridges the gap between job seekers and their dream jobs by providing structured feedback on resume ATS compatibility, job match, and formatting.

🌟 Why JobFitPro?

💼 Many resume analysis tools are expensive and behind paywalls, limiting access to individuals who cannot afford them. JobFitPro is here to empower everyone with a cost-free alternative.

🤖 Unlike ChatGPT’s limited free queries, JobFitPro is a dedicated tool optimized for resume evaluations with highly structured output.

🧠 Powered by Open-Source AI Models – We utilize Llama 3 / Mistral for semantic analysis, BM25 for ATS keyword matching, and SBERT for semantic job-resume comparison.

🎯 Who is this for?
✅ Job Seekers who want ATS-friendly resumes
✅ Recruiters looking for quick, structured insights
✅ Developers interested in AI-powered resume analysis

⚡ Features

🔹 📄 Resume Parsing - Extracts text from PDFs & DOCX files
🔹 📊 ATS Score Calculation - Measures how well your resume aligns with ATS requirements
🔹 🎯 Job Match Analysis - Identifies matching & missing skills
🔹 📑 Resume Structure Evaluation - Checks for completeness & readability
🔹 📝 Detailed Feedback Report - Provides actionable insights for improvement
🔹 🌍 100% Open-Source & Free - No subscriptions, no hidden fees

🚀 Tech Stack

Frontend
	•	React (w/ TypeScript)
	•	Vite for fast builds 
	•	Tailwind CSS for modern UI 

Backend
	•	Node.js with Express 
	•	TypeScript for type safety 
	•	pdf-parse for resume parsing 
	•	GROQ API (Llama-3/Mistral) for AI-powered analysis 

AI Models Used
	•	Llama-3 / Mistral (for structured feedback & NLP analysis)
	
📥 Installation & Setup

Follow these steps to run JobFitPro on your local machine:

1️⃣ Clone the Repository
git clone https://github.com/yourusername/JobFitPro.git
cd JobFitPro

2️⃣ Backend Setup
	1.	Navigate to the backend folder:
        cd backend
    2.	Install dependencies:
        npm install
	3.	Create a .env file inside the backend folder:
        PORT=3000
        GROQ_API_KEY=your_groq_api_key_here
        GROQ_API_ENDPOINT=https://api.groq.com/v1
    4.	Start the backend server:
        npm run dev

3️⃣ Frontend Setup
	1.	Navigate to the frontend folder:
        cd ../frontend
	2.	Install dependencies:
        npm install
    3.	Start the frontend:
        npm run dev
    4.	Open http://localhost:5173 in your browser

🛠 How to Use

1️⃣ Upload your resume (PDF/DOCX) and paste a job description
2️⃣ Click “Analyze Resume” and let JobFitPro process it
3️⃣ View ATS Score, Job Match, and Resume Structure
4️⃣ Check the Detailed Feedback Report for improvement suggestions
5️⃣ Optimize your resume and increase your chances of landing the job!

💡 Contributing

🚀 We welcome contributions from developers & AI enthusiasts! To contribute:
	1.	Fork the repo & create a new branch
	2.	Implement your feature/fix
	3.	Submit a Pull Request

📜 License

MIT License - Free to use, modify, and distribute.

⭐ Support the Project

If you found JobFitPro helpful, consider giving it a ⭐ star on GitHub! 🚀

📢 Spread the word by sharing it with your friends and colleagues!

Happy coding & job hunting! 🎯💼