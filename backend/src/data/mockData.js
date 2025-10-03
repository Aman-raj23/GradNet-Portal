export const users = [
  { id: '1', name: 'Admin', email: 'admin@gradnet.edu', role: 'admin' },
  { id: '2', name: 'Raj', email: 'raj@alumni.edu', role: 'alumni', year: 2016, major: 'Computer Science', city: 'San Francisco', industry: 'Software' },
  { id: '3', name: 'John', email: 'john@student.edu', role: 'student', year: 2026, major: 'Mechanical Eng', city: 'Pune' },
  { id: '4', name: 'HR Recruiter', email: 'hr@company.com', role: 'employer' },
  { id: '5', name: 'Dean', email: 'dean@college.edu', role: 'institute', collegeId: 'C-001' },
  { id: '6', name: 'Aman Mehta', email: 'aman@alumni.edu', role: 'alumni', year: 2014, major: 'Electrical Eng', city: 'Bangalore', industry: 'Energy' },
  { id: '7', name: 'Priya Nair', email: 'priya@alumni.edu', role: 'alumni', year: 2018, major: 'Data Science', city: 'Mumbai', industry: 'Analytics' },
  { id: 1007, name: 'Kabir Nair', role: 'alumni', year: '2016', major: 'Biotech', city: 'Kolkata', industry: 'Healthcare' },
  { id: 1008, name: 'Ananya Iyer', role: 'alumni', year: '2020', major: 'Electrical', city: 'Bengaluru', industry: 'Energy' },
  { id: 1009, name: 'Harsh Patel', role: 'alumni', year: '2019', major: 'Computer Science', city: 'Ahmedabad', industry: 'E-commerce' },
  { id: 1010, name: 'Priya Desai', role: 'alumni', year: '2018', major: 'Information Technology', city: 'Surat', industry: 'Retail' },
  { id: 1011, name: 'Aditya Rao', role: 'alumni', year: '2021', major: 'AI & ML', city: 'Bengaluru', industry: 'AI/ML' },
    
];
export const getAlumni = () => users.filter(u => u.role === 'alumni');

export const jobs = [
  { id: 'j1', title: 'Frontend Engineer', company: 'TechNova', city: 'Bangalore', type: 'Full-time', postedBy: '4', postedAt: '2025-09-01' },
  { id: 'j2', title: 'Data Analyst', company: 'DataCorp', city: 'Remote', type: 'Internship', postedBy: '2', postedAt: '2025-09-10' }
];

export const events = [
  { id: 'e1', title: 'Alumni Meetup 2025', date: '2025-11-15', image: '', location: 'Mumbai', status: 'upcoming' },
  { id: 'e2', title: 'Career Fair 2024', date: '2024-05-10', image: '', location: 'Delhi', status: 'past' }
];

export const posts = [
  { id: 'p1', authorId: '2', content: 'Excited to mentor students interested in frontend!', likes: 12, comments: 3, createdAt: '2025-09-20' },
  { id: 'p2', authorId: '3', content: 'Looking for internship opportunities in data.', likes: 5, comments: 2, createdAt: '2025-09-22' }
];

export const startups = [
  { id: 's1', name: 'SolarEdge AI', founders: ['2'], stage: 'Seed', city: 'Pune' },
  { id: 's2', name: 'HealthBridge', founders: ['2'], stage: 'Bootstrapped', city: 'Hyderabad' }
];
