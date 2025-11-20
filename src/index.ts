import express, { Request, Response } from "express";
import connectDB from "./config/dbConfig";
import apiRouter from "./routers/apiRouter";
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = 8000;

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview Practice Backend API',
      version: '1.0.0',
      description: 'API documentation for the Interview Practice Backend',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // User Schema
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              description: 'The unique identifier for the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
              minLength: 2,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The email address of the user',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'The role of the user',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the user was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the user was last updated',
            },
          },
          required: ['name', 'email', 'password'],
        },

        // Interview Schema
        Interview: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              description: 'The unique identifier for the interview',
            },
            userId: {
              type: 'string',
              description: 'Reference to the user who owns this interview',
            },
            role: {
              type: 'string',
              description: 'The job role this interview is for',
            },
            type: {
              type: 'string',
              description: 'Type of the interview',
            },
            level: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              description: 'Experience level for the interview',
            },
            techStack: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of technologies involved in the interview',
            },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  answer: { type: 'string' },
                  difficulty: {
                    type: 'string',
                    enum: ['easy', 'medium', 'hard'],
                  },
                },
                required: ['question'],
              },
              description: 'List of questions in the interview',
            },
            finalised: {
              type: 'boolean',
              default: false,
              description: 'Whether the interview is finalized',
            },
            coverImage: {
              type: 'string',
              description: 'URL to the interview cover image',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the interview was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the interview was last updated',
            },
          },
          required: ['userId', 'role', 'level', 'type', 'questions'],
        },

        // Feedback Schema
        Feedback: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              description: 'The unique identifier for the feedback',
            },
            interviewId: {
              type: 'string',
              description: 'Reference to the interview this feedback is for',
            },
            userId: {
              type: 'string',
              description: 'Reference to the user who received this feedback',
            },
            totalScore: {
              type: 'number',
              description: 'Overall score for the interview',
            },
            categoryScores: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    enum: [
                      'Communication Skills',
                      'Technical Knowledge',
                      'Problem Solving',
                      'Cultural Fit',
                      'Confidence and Clarity',
                    ],
                  },
                  score: { type: 'number' },
                  comment: { type: 'string' },
                },
                required: ['name', 'score', 'comment'],
              },
              minItems: 5,
              maxItems: 5,
              description: 'Scores and comments for each category',
            },
            strengths: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of strengths observed',
            },
            areasForImprovement: {
              type: 'array',
              items: { type: 'string' },
              description: 'Areas where improvement is needed',
            },
            finalAssessment: {
              type: 'string',
              description: 'Overall assessment of the interview',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the feedback was created',
            },
          },
          required: ['interviewId', 'userId', 'totalScore', 'categoryScores'],
        },

        // Error Response Schema
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
              description: 'Indicates if the request was successful',
            },
            message: {
              type: 'string',
              description: 'Error message describing what went wrong',
            },
          },
          required: ['success', 'message'],
        },
      },
    },
  },
  apis: ['./src/routers/**/*.ts'],
};

const specs = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Health check endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: 'Pong',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  connectDB();
});

