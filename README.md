JobFitPro is a free, open-source tool that helps you optimize your resume against any job description using AI. It analyzes key metrics like ATS Score, Job Match, Resume Structure, and AI-generated suggestions. Whether you’re tailoring your current resume or creating a new one from scratch, JobFitPro provides actionable insights to increase your chances of getting noticed.

⸻

Step 1: Clone the Repository
Start by cloning the repository to your local machine. You can do this by running the following command in your terminal:
git clone https://github.com/boranaveen007/JobFitPro.git
cd JobFitPro

Step 2: Set Up Environment Variables
Inside the project, you’ll find two folders: backend and frontend. Each has its own .env file.
In the backend/.env file, replace the placeholder values as follows:
PORT=3000
GROQ_API_KEY=your_groq_api_key_here

You will need a valid Groq API key to run the backend. You can obtain one from https://console.groq.com.
In the frontend/.env file, set the API URL to connect with your local backend:
VITE_API_URL=http://localhost:3000

Step 3: Install Dependencies and Run the Project
You will need to run both the backend and frontend in separate terminals.
For the backend, navigate to the backend folder and run:
npm install
npm start

For the frontend, open another terminal, go to the frontend folder, and run:
npm install
npm run dev

This will start the frontend on http://localhost:5173 and the backend on http://localhost:3000.
done 
Step 4: Start Using JobFitPro
Once both servers are running, open your browser and go to http://localhost:5173. From there, you can upload your resume and a job description to analyze them. JobFitPro will generate a detailed report with ATS scores, skill gaps, resume structure feedback, and actionable suggestions powered by AI.

⸻

License

This project is licensed under the MIT License. You are free to use, modify, and distribute it for both personal and commercial purposes.

⸻

Contributions

Pull requests are welcome! If you’d like to improve JobFitPro, feel free to contribute. Please make sure you do not include any private API keys, credentials, or production URLs in your commits.