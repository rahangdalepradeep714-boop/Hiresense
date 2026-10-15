1. Register Flow

Frontend Register Form
        ↓
POST /api/auth/register
        ↓
Controller
        ↓
Service
        ↓
Password BCrypt se encrypt
        ↓
User DB me save
      
2. Login Flow

Frontend Login
       ↓
POST /api/auth/login
       ↓
Email + Password verify
       ↓
JWT Token generate
       ↓
Frontend ko token return
       ↓
Frontend localStorage me save


3. Restricted API Flow

Frontend request
↓
Authorization: Bearer token
↓
JwtFilter
↓
Token validate
↓
Email extract
↓
User + role verify
↓
SecurityContext set
↓
Controller access


4. Resume Upload Flow

Candidate Upload Resume
↓
PDF/Text Extract
↓
Email + Phone + Skills extract
↓
ResumeProfile table save

5. Password Security

12345
↓
BCrypt
↓
$2a$10$jdkshf

6. Job Matching Flow

Candidate skills
↓
Company required skills
↓
Skill comparison
↓
Matching percentage calculate
↓
Recommended jobs show