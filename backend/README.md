

backend/
│── .env                  # Environment variables (API keys, config)
│── .gitignore            # Ignore unnecessary files in Git
│── package.json          # Node.js project metadata
│── tsconfig.json         # TypeScript configuration
│── uploads/              # Temporary storage for uploaded files
│
├── src/
│   ├── index.ts          # Main entry point for Express server
│   │
│   ├── routes/
│   │   ├── uploadRoutes.ts    # Handles file uploads (PDF processing)
│   │   ├── analysisRoutes.ts  # Handles resume analysis API
│   │
│   ├── services/
│   │   ├── FileUploadService.ts       # Multer file handling
│   │   ├── PDFService.ts              # Extract text from PDF files
│   │   ├── atsAnalysis.service.ts     # ATS analysis using Groq API
│   │   ├── jobMatch.service.ts        # Job matching analysis
│   │   ├── resumeStructure.service.ts # Resume structure analysis
│   │   ├── reportGenerator.service.ts # Generates detailed resume report
│   │   ├── groq.service.ts            # Handles communication with Groq API
│   │
│   ├── types/
│   │   ├── analysis.ts    # Type definitions for analysis responses
│   │
│   ├── tests/
│   │   ├── uploadRoutes.test.ts  # Jest tests for upload API
│   │
│   ├── groqClient.ts      # Wrapper for Groq API calls
│
└── README.md              # Documentation for setting up & running the backend