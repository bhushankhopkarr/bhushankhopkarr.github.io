import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Bhushan Khopkar",
  initials: "BK",
  url: "https://www.linkedin.com/in/bhushankhopkrr/",
  location: "Mumbai, IN",
  locationLink: "https://www.google.com/maps/place/mumbai",
  description:
    "Solving Problems with Engineering Solutions.",
  summary:
    "I am a Computer Science and Engineering student at [A.P. Shah Institute of Technology](https://www.apsit.edu.in), specializing in AI and ML. I have a strong foundation in programming, machine learning, data analysis, and AI applications, and I’m passionate about using technology to solve real-world problems through hands-on projects and collaboration.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "JavaScript",
    "Python",
    "MySQL",
    "Postgres",
    "Django",
    "C",
    "Java",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "work.bhushankhopkar@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/bhushankhopkarr",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/bhushankhopkrr",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/bhushankhopkrr",
        icon: Icons.x,

        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto: work.bhushankhopkar@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "AIML Club, Thane",
      href: "https://github.com/APSIT-AIML-CLUB",
      badges: [],
      location: "On-Site",
      title: "Member",
      logoUrl: "/aiml.png", 
      start: "July 2024",
      end: "Present",
      description:
        "Teaching and mentoring learners in the field of AI and ML. Conducting workshops to help students learn and grow.",
    },
  ],
  education: [
    {
      school: "University of Mumbai",
      href: "https://mu.ac.in/",
      degree: "B.E. CSE (AI & ML)",
      logoUrl: "/mu.png", 
      start: "2022",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "AI Desktop Assistant",
      href: "https://github.com/bhushankhopkarr/Desktop_Assistant",
      dates: "June 2023 - October 2023",
      active: true,
      description:
        "My team and I built a desktop assistant that lets users interact with their computers using voice commands. Inspired by [OpenAI ChatGPT](https://openai.com/chatgpt/overview/) and similar to Jarvis, it uses pyttsx3 and speech_recognition for hands-free tasks like searching Wikipedia and controlling media playback.",
      technologies: [
        "Python",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/bhushankhopkarr/Desktop_Assistant",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ai.png",
      video:
        "",
    },
    {
      title: "ProctorAI",
      href: "https://github.com/bhushankhopkarr/AI-Exam-Proctoring-System",
      dates: "January 2024 - April 2024",
      active: true,
      description:
        "The AI-Based Exam Proctoring System ensures the integrity of online exams by using AI to monitor students, detect cheating, and maintain a fair and secure assessment process.",
      technologies: [
        "Python",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/bhushankhopkarr/AI-Exam-Proctoring-System",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/proctor.png", 
      video: "",
    },
    {
      title: "HeartSure",
      href: "https://github.com/bhushankhopkarr/heart_failure_backend",
      dates: "December 2023 - April 2024",
      active: true,
      description:
        "This project is a Django-based application named **HeartFailure**. It includes a command-line utility for performing administrative tasks.",
      technologies: [
        "Python",
        "Django",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/bhushankhopkarr/heart_failure_backend",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/heart.png", 
      video: "",
    },
    {
      title: "Brain Tumor Detection",
      href: "https://github.com/bhushankhopkarr/branegames",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed a system that detects the tumor present inside the brain using MRI images. The system uses a Convolutional Neural Network (CNN) to classify the tumor aling with its type.",
      technologies: [
        "Python",
        "Flask",
      ],
      links: [
        {
        type: "Source",
        href: "https://github.com/bhushankhopkarr/branegames/tree/nasha",
        icon: <Icons.github className="size-3" />,
      },
      ],
      image: "/tumor.png", 
      video:
        "",
    },
  ],
  hackathons: [
    {
      title: "Smart India Hackaton",
      dates: "November 23rd - 25th, 2024",
      location: "Mumbai, IN",
      description:
        "Developed a system for women safety keeping in mind the current scenario of the country. The system is designed to provide a safe environment for women in the any working environment.",
      image:
        "/SIH.png",
      mlh: "",
      links: [],
    },
  ],
} as const;
