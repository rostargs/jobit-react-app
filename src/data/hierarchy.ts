export const hierarchyLevels = [
    { level: "Trainee" },
    { level: "Junior" },
    { level: "Middle" },
    { level: "Senior" },
    { level: "Lead" },
];

export const positions = [
    { position: "Frontend Development" },
    { position: "Backend Development" },
    { position: "Full-stack Development" },
    { position: "Mobile Development" },
    { position: "Web Development" },
    { position: "Game Development" },
    { position: "Software Engineering" },
    { position: "Data Science" },
    { position: "Machine Learning" },
    { position: "Artificial Intelligence" },
    { position: "Cloud Computing" },
    { position: "DevOps" },
    { position: "Cybersecurity" },
    { position: "UI/UX Design" },
    { position: "Information Technology Management" },
    { position: "Embedded Systems Development" },
    { position: "Network Engineering" },
    { position: "Blockchain Development" },
    { position: "Augmented Reality" },
    { position: "Virtual Reality" },
    { position: "Project Management" },
    { position: "Quality Assurance (QA)" },
    { position: "Testing" },
    { position: "Recruiting" },
    { position: "System Administration" },
    { position: "Database Administration" },
    { position: "Technical Support" },
    { position: "Business Analysis" },
    { position: "Product Management" },
    { position: "Technical Writing" },
    { position: "IT Consulting" },
    { position: "IT Sales" },
    { position: "Network Security" },
    { position: "Enterprise Resource Planning (ERP)" },
    { position: "Customer Relationship Management (CRM)" },
    { position: "Big Data Analytics" },
    { position: "IT Training and Education" },
    { position: "Computer Graphics" },
    { position: "E-commerce Development" },
    { position: "Healthcare IT" },
    { position: "Financial Technology (FinTech)" },
    { position: "Geographic Information Systems (GIS)" },
    { position: "Legal Tech" },
    { position: "Educational Technology (EdTech)" },
    { position: "Agricultural Technology (AgriTech)" },
    { position: "Environmental Technology (GreenTech)" },
    { position: "Space Technology" },
] as const;

export type TPositionKeys = (typeof positions)[number];
export type TPositionValues = TPositionKeys["position"];
