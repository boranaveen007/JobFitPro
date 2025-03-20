import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Props = {
  setResumeText: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  onAnalyze: (jobDescription?: string) => Promise<void>;
};

const ResumeUploader: React.FC<Props> = ({
  setResumeText,
  setIsLoading,
  setJobDescription,
  onAnalyze,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    // setIsAnalyzing(true); // Disable button while uploading
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name); // Display file name after upload
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload resume");

      const data = await response.json();
      console.log('Resume parsed successfully!!')
      setResumeText(data.text);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
      // setIsAnalyzing(false); // Re-enable button after upload
    }
  };

  const handleAnalyze = async () => {
    if (!fileName || !jobDesc.trim()) {
      console.log('Error in handleAnalyze');
      return;
    }
    setIsAnalyzing(true); // Disable button & show "Analyzing..."
    setJobDescription(jobDesc); // Store job description before analyzing

    try {
      await onAnalyze(jobDesc);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false); // Re-enable button after processing
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
      {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🚀 JobFitPro - Resume Analyzer
      </h1> */}
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
        🚀 JobFitPro - Resume Analyzer
      </h1>

      {/* Upload Box */}
      <label className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg w-full cursor-pointer hover:border-blue-500 transition">
        <MdCloudUpload className="text-4xl text-blue-500" />
        <span className="mt-2 font-bold text-gray-700">
          {fileName ? fileName : "Click to upload your Resume (PDF)"}
        </span>
        <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
      </label>

      {/* Job Description Input */}
      <textarea
        className="w-full mt-4 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700 hover:border-blue-500"
        rows={5}
        placeholder="Paste the job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      {/* Analyze Button */}
      <button
        className={`w-full py-3 px-4 text-white font-bold rounded-lg mt-4 transition ${
          isAnalyzing || !fileName || !jobDesc.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-400 hover:bg-orange-500"
        }`}
        onClick={handleAnalyze}
        disabled={isAnalyzing || !fileName || !jobDesc.trim()}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
};

export default ResumeUploader;