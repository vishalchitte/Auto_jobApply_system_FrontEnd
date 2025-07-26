# Next.js Project Documentation

## Project Structure

### Modules

1. Authentication
- Login `/pages/auth/login.tsx`
- Register `/pages/auth/register.tsx`
- Password Reset `/pages/auth/reset-password.tsx`

2. Job Management
- Job Listings `/pages/jobs/index.tsx`
- Job Details `/pages/jobs/[id].tsx` 
- Job Application `/pages/jobs/apply/[id].tsx`
- Job Posting (Employer) `/pages/employer/post-job.tsx`

3. User Dashboard
- Candidate Dashboard `/pages/dashboard/candidate.tsx`
- Employer Dashboard `/pages/dashboard/employer.tsx`
- Profile Management `/pages/profile/index.tsx`

### API Integration Points

1. Authentication APIs
- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/auth/reset-password`

2. Job APIs
- GET `/api/jobs` - List all jobs
- GET `/api/jobs/{id}` - Get job details
- POST `/api/jobs` - Create new job
- PUT `/api/jobs/{id}` - Update job
- POST `/api/jobs/{id}/apply` - Apply for job

3. User APIs
- GET `/api/user/profile`
- PUT `/api/user/profile`
- GET `/api/user/applications`

### Key Features

1. Google Maps Integration
- Job location visualization
- Office location mapping

2. Data Visualization
- Application statistics using Recharts
- Job market trends

3. Motion Effects
- Page transitions using Framer Motion
- Interactive UI elements

4. Responsive Design
- TailwindCSS implementation
- Mobile-first approach

### Project Dependencies

- Next.js 15.3.2
- React & React DOM 19.0.0
- Google Maps API
- Recharts 3.0.2
- Framer Motion 11.0.0
- Lucide React 0.400.0