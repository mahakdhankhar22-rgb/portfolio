export const profile={
    name:"Mahak",
    tagline:"Frontend Developer who designs before she codes.",
    intro:"B.Tech AI & Data Science student building clean, data-driven interfaces with React.",
    email:"mahakdhankhar22@gmail.com",
    github:"https://github.com/mahakdhankhar22-rgb",
    linkedin:"https://www.linkedin.com/in/mahak-dhankhar-464ba6434",
    resume:"/resume.pdf",
};

export const stats=[
    {value:"9.2", label:"CGPA"},
    {value:"2", label:"Projects"},
    {value:"2", label:"Certifications"},
];

export const experience =[
    {
        role:"Frontend Developer Intern",
        company:"Matrabhumi Technology Pvt.Ltd.",
        period:"June 2026-Present",
        points:[
            "Developed responsive B2B agricultural marketplace interfaces using React.js, Tailwind CSS.",
            "Built and refined homepage, authentication, product-detail and purchasing experiences with a focus on usability and conversion.",
            "Developed reusable product components including image galleries, pricing cards, volume selection, logistics information and sticky purchase actions.",
            "Worked on RM dashboard experiences for call plans, lead activity and activity-status indicators.",
            "Implemented frontend flows for voice-enabled product search and billing, integrating APIs and speech/AI services.",
            "Integrated REST APIs using Axios and managed application navigation with React Router.",
            "Collaborated directly with product leadership to translate requirements and feedback into production-ready UI improvements.",
        ],
        // Optional: groups the points above (by index) into stacked-card chapters.
        groups:[
            { title:"Marketplace interfaces", points:[0,1,2] },
            { title:"Sales dashboards", points:[3] },
            { title:"Voice search & billing", points:[4] },
            { title:"APIs & collaboration", points:[5,6] },
        ],
    },
];

export const projects=[
    {
        title:"GitHub Profile Explorer",
        tech:["React.js","GitHub API","JavaScript","CSS"],
        description:"A responsive web application for exploring GitHub profiles, repositories, and developer activity through a clean and intuitive interface.",
        highlights:[
            "GitHub API integration",
            "Dynamic profile & repository data",
            "Reusable React components",
            "Responsive UI",
            "Clean data-focused design",
        ],
        preview:"github",   // built-in artwork; add image:"/projects/github.png" to use a real screenshot
        live:"",
        code:"",
    },
    {
        title:"Personal Portfolio",
        tech:["React.js","JavaScript","Tailwind CSS","Framer Motion"],
        description:"A modern interactive portfolio showcasing my frontend development, UI/UX skills, experience, and projects through smooth animations and engaging interactions.",
        highlights:[
            "Scroll-based animations",
            "Motion-driven experience cards",
            "Responsive design",
            "Modern UI/UX",
            "Component-based architecture",
        ],
        preview:"portfolio",
        live:"",
        code:"",
    },
];

export const skills={
    languages:["C++","JavaScript","CSS"],
    Frontend:["React","Tailwind CSS","Framer Motion"],
    Tools:["Git","GitHub","VS Code","Cursor"],
};

export const certifications=[
    {
        title:"Tata Data Analytics Job Simulation",
        issuer:"Forage",
        year:"2026",
        status:"completed",
        description:"Completed a hands-on data analytics simulation focused on data-driven problem solving and responsible AI.",
    },
    {
        title:"Meta Front-End Developer Professional Certificate",
        issuer:"Coursera",
        status:"in-progress",
        description:"Building deeper expertise in modern frontend development, UI design, JavaScript, and React.",
    },
];

// Content for the stacked-card Experience section (order = scroll order).
export const experienceCards=[
    {
        type:"intro",
        label:"Experience",
        role:"Frontend Developer Intern",
        company:"Matrabhumi Technology Pvt. Ltd. · Krshak",
        period:"June 2026 — Present",
        summary:"Building real-world B2B digital products with React.js and modern frontend technologies.",
    },
    {
        type:"list",
        label:"What I built",
        title:"Krshak — B2B Agricultural Platform",
        items:[
            "Redesigned the homepage and brand experience",
            "Built product detail pages and responsive product interfaces",
            "Developed authentication & registration flows",
            "Built billing workflows and voice-enabled billing",
            "Developed voice product search with API integration",
            "Created the RM dashboard & lead management UI",
            "Built reusable, responsive React + Tailwind components",
        ],
    },
    {
        type:"statement",
        label:"My approach",
        title:"From Ideas → Interfaces → Experiences",
        text:"Translating product requirements into clean, responsive and intuitive interfaces with a strong focus on usability, visual hierarchy, and smooth user interactions.",
    },
    {
        type:"stack",
        label:"Tech stack",
        title:"Technologies I Work With",
        rows:[
            ["React.js","JavaScript","HTML5","CSS3"],
            ["Tailwind CSS","REST APIs","Axios"],
            ["Git","GitHub","Figma"],
        ],
    },
];