import os
import groq
from dotenv import load_dotenv

# Load API Key from .env file
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class GroqService:
    def __init__(self):
        self.client = groq.Client(api_key=GROQ_API_KEY)

    def analyze_resume(self, resume_text, job_desc):
        prompt = f"""
        Analyze this resume against the given job description. Provide:
        1️⃣ **Missing Skills**
        2️⃣ **Matched Skills**
        3️⃣ **Resume Strengths**
        4️⃣ **Areas of Improvement**

        📝 **Resume:**
        {resume_text}

        📝 **Job Description:**
        {job_desc}
        """

        try:
            response = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-70b-8192",
                temperature=0.2
            )

            return response.choices[0].message.content
        except Exception as e:
            print("Error calling Groq API:", e)
            return "Failed to process resume."

# Example usage
if __name__ == "__main__":
    groq_service = GroqService()
    resume = "Experienced software developer with expertise in Python, AI, and machine learning."
    job_desc = "Looking for an AI Engineer with experience in Python, NLP, and model deployment."
    print(groq_service.analyze_resume(resume, job_desc))