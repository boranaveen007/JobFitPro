import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import mammoth from "mammoth";
import "./index.css"; // Ensure Tailwind is applied

function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  // File selection handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResumeFile(event.target.files[0]);
    }
  };

  // Extract text from DOCX
  const extractTextFromDocx = async (file: File): Promise<string> => {
    try {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = async (event) => {
          if (event.target?.result) {
            const arrayBuffer = event.target.result as ArrayBuffer;
            const { value } = await mammoth.extractRawText({ arrayBuffer });
            resolve(value.trim());
          }
        };
        reader.readAsArrayBuffer(file);
      });
    } catch (error) {
      console.error("Error extracting DOCX text:", error);
      return "";
    }
  };

  // Handle form submission
  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);

    let resumeText = "";

    if (resumeFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      resumeText = await extractTextFromDocx(resumeFile);
    } else {
      alert("Currently, only DOCX files are supported.");
      setLoading(false);
      return;
    }

    // Sending JSON instead of FormData
    const requestData = {
      resume: resumeText,
      job_desc: jobDescription,
    };

    try {
      const response = await axios.post("http://localhost:5001/api/analyze-resume", requestData);
      setResult(response.data);
      console.log("Analysis Result:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
      alert("Error analyzing resume.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🚀 JobFitPro - Resume Analyzer
        </h1>

        {/* Resume Upload Box */}
        <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition duration-300">
          <label className="block text-lg font-semibold text-gray-700 flex-col items-center justify-center gap-2">
            <AiOutlineUpload className="text-4xl text-blue-500" />
            {resumeFile ? (
              <span className="text-gray-700">{resumeFile.name}</span>
            ) : (
              <span className="text-gray-500">
                Click to upload your Resume (DOCX only)
              </span>
            )}
            <input
              type="file"
              accept=".docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Job Description Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">
            Paste Job Description
          </label>
          <textarea
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white text-gray-800"
            rows={6}
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Analyze Button */}
        <button
          className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition duration-300 ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* Results Section */}
        {result && (
          <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Results:
            </h3>

            {/* 1️⃣ ATS Score Accordion */}
            <details className="mb-4 border rounded-lg p-4 bg-white shadow">
              <summary className="cursor-pointer text-lg font-semibold text-blue-600">
                📌 ATS Score: {result.overall_score}%
              </summary>
              <div className="mt-2">
              <h4 className="font-semibold text-gray-700 mt-2">
                  🔹 Matched Keywords
                </h4>
                <p className="text-gray-600 bg-green-300 rounded-md">
                  {result.strengths.join(", ") || "None"}
                </p>
                <h4 className="font-semibold text-gray-700">
                  🔹 Missing Keywords
                </h4>
                <p className="text-gray-600 bg-red-400">
                  {result.weaknesses.join(", ") || "None"}
                </p>
              </div>
            </details>

            {/* 2️⃣ Job Match Accordion */}
            <details className="mb-4 border rounded-lg p-4 bg-white shadow">
              <summary className="cursor-pointer text-lg font-semibold text-blue-600">
                📌 Job Match
              </summary>
              <div className="mt-2">
                <h4 className="font-semibold text-gray-700">
                  🔹 Matching Skills
                </h4>
                <p className="text-gray-600">
                  {result.strengths.join(", ") || "None"}
                </p>
                <h4 className="font-semibold text-gray-700 mt-2">
                  🔹 Missing Skills
                </h4>
                <p className="text-gray-600">
                  {result.weaknesses.join(", ") || "None"}
                </p>
              </div>
            </details>

            {/* 3️⃣ Detailed Analysis */}
            <details className="border rounded-lg p-4 bg-white shadow">
              <summary className="cursor-pointer text-lg font-semibold text-blue-600">
                📌 Detailed Analysis
              </summary>
              <div className="mt-2">
                <h4 className="font-semibold text-gray-700">✅ Strengths</h4>
                <p className="text-gray-600">{result.strengths.join(", ")}</p>
                <h4 className="font-semibold text-gray-700 mt-2">
                  ⚠️ Areas of Improvement
                </h4>
                <p className="text-gray-600">{result.weaknesses.join(", ")}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;