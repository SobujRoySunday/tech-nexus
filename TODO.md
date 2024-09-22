# TODO List

## General

- [x] Set up project repository and initial project structure.
- [x] Define and document project goals and milestones.
- [ ] Create and configure necessary project environments (development, staging, production).

## Smart Competency Diagnostic and Candidate Profile Score Calculator (PS1628)

- [x] Develop AI-powered candidate profile score calculator.
- [ ] Develop AI-powered job/training recommendation system.
- [ ] Implement skill gap analysis and personalized suggestions.
- [ ] Design and build adaptive learning pathways.
- [ ] Integrate real-time job market insights based on candidate skills.
- [ ] Implement skills verification and certification module.
- [ ] Create resume wizard for automated resume building.
- [ ] Develop community and peer support features (forums, virtual events).

## Learning Path Dashboard for Enhancing Skills (PS1615)

- [ ] Design and build the learning dashboard with reading statistics.
- [ ] Implement creation of learning paths with various resources.
- [ ] Integrate continuous progress updates functionality.

## Freelancing Platform (PS1629)

- [ ] Develop freelance job marketplace.
- [ ] Implement freelancer profile and portfolio management.
- [ ] Build extensive search and analytics features.
- [ ] Integrate AI-enabled insights for job seekers and employers.
- [ ] Develop secure payment system with escrow accounts.

## Mentor Connect (PS1630)

- [ ] Implement automated calendar booking system.
- [ ] Integrate video call and chat functionality.
- [ ] Ensure secure and reliable communication between mentors and mentees.

## AI-Powered Student Assistance Chatbot (PS1631)

- [ ] Develop AI-powered chatbot for student assistance.
- [ ] Implement efficient information retrieval and natural language processing.
- [ ] Provide enhanced user experience and data insights from interactions.

## Interactive Job and Internship Platform for Technical Education (PS1632)

- [ ] Build AI-driven job and internship matchmaking system.
- [ ] Create a platform with diverse job opportunities across sectors.
- [ ] Provide comprehensive career resources and support for internships and industrial training.
- [ ] Implement mentorship programs.

## Effective Career Counseling and Guidance Programs in Schools (PS1666)

- [ ] Develop AI-powered career guidance platforms.
- [ ] Implement career mentorship programs and interactive career exploration tools.
- [ ] Create comprehensive career resource portals.

## Integration of Industry-Relevant Vocational Training into Education (PS1667)

- [ ] Develop VR-based training modules.
- [ ] Implement AI-powered career guidance and digital skill badges.
- [ ] Set up mobile training labs and online apprenticeship platforms.

## Key Features

- [ ] Develop and integrate AI-powered personalized chatbot.
- [ ] Create and implement tailored roadmap generation for learning and career pathways.

## Documentation and Contributions

- [ ] Update README.md with detailed project information and progress.
- [ ] Write and maintain CONTRIBUTING.md for guidelines on contributions.
- [ ] Ensure LICENSE file is included and correctly documented.

## Testing and Deployment

- [ ] Develop and execute testing plans for all features.
- [ ] Prepare for deployment and ensure all environments are configured.
- [ ] Monitor and address any post-deployment issues.

## Miscellaneous

- [ ] Review and refine project scope and objectives as needed.
- [ ] Engage with stakeholders and incorporate feedback.
- [ ] Plan and execute project presentations or demos as required.

## From Vivek

- User Authentication

  - Login Component:

    - [x] A form where users can enter their email and password.
    - [x] Validate the inputs and authenticate with the backend API.
    - [x] Store the JWT token in local storage or cookies for session management.

  - Registration Component:

    - [x] A form for user registration with fields like name, email, password, and confirm password.
    - [] Validate the inputs (e.g., password strength, email format) and create a new account via the backend API.

<!-- TODO: from here Develop backend -->

- Profile Management:

  - [] A user profile page where users can view and update their details, skills, and experiences.
  - [] Fetch and display user data from the backend and allow updates via API calls.

- Skill Assessment

  - Assessment Dashboard:

    - [] A page that lists available assessments for the user.
    - [] Fetch assessments from the backend and display them in a user-friendly format.

  - Assessment Component:

    - Render different types of questions (multiple-choice, coding challenges) and collect user responses.
    - Submit responses to the backend for scoring and feedback.

  - Results Display:
    - Display the results of completed assessments, including scores, feedback, and competencies verified.
    - Provide an option for users to retake assessments if necessary.

- Badges and Certifications

  - Badge Display:

    - A section on the user profile where earned badges are displayed.
    - Fetch badges from the backend and show them with associated descriptions and criteria.

  - Certification Component:
    - Display certifications that users can download or share.
    - Provide options to download certificates as PDFs or share them on social media.

- Resume Wizard

  - Resume Builder Interface:

    - A step-by-step wizard that guides users through building their resumes.
    - Fetch user profile data and allow users to select and organize information to include in their resumes.

<!-- TODO: to here Develop backend -->

- Template Selection:
  Provide multiple resume templates for users to choose from.
  Render a live preview of the resume as the user customizes it.
  PDF Generation:
  Integrate with the backend to generate a downloadable PDF resume.
  Provide a download button and possibly an option to email the resume.
  e. Community Forum
  Forum Homepage:
  Display a list of forum topics, with filters and search functionality.
  Allow users to create new topics or view existing ones.
  Topic Detail Page:
  Show the full content of a topic along with user replies.
  Allow users to post replies, like posts, or follow threads.
  Post Creation Component:
  A form for creating new forum posts with rich text editing options.
  Validate the post content and submit it to the backend.
  f. Virtual Events
  Event Dashboard:
  Display upcoming events, workshops, and webinars.
  Fetch event details from the backend and allow users to register.
  Event Detail Page:
  Provide detailed information about the event, including speaker bios, schedules, and links to join the event.
  Allow users to register and add events to their calendars.
  Event Registration:
  A simple form for users to sign up for events.
  Submit registration details to the backend and show a confirmation message.
  g. Job Matching and Skill Recommendations
  Job Recommendations Page:
  Display personalized job recommendations based on the user’s verified skills and experiences.
  Allow users to apply for jobs directly or save them for later.
  Skill Recommendation Component:
  Suggest courses, certifications, and assessments based on profile gaps.
  Provide quick actions to enroll in recommended courses or take assessments.
