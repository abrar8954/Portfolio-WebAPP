import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.contactMessage.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.profile.deleteMany();

  // Seed Profile
  await prisma.profile.create({
    data: {
      name: "Abrar Ahmed",
      title: "Automation Expert",
      tagline: "Transforming manual processes into intelligent automated workflows",
      about:
        "I'm a seasoned Automation Expert with extensive experience in RPA development, web scraping, and process optimization. I help businesses save time and reduce errors by automating repetitive tasks using cutting-edge tools like UiPath, Selenium, Python, and more. Whether it's streamlining data entry, building intelligent bots, or creating end-to-end automated pipelines — I deliver solutions that scale.",
      email: "contact@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/example",
      github: "https://github.com/example",
      upwork: "https://upwork.com/freelancers/example",
      location: "Remote — Worldwide",
      openToWork: true,
      yearsExp: 5,
      clientsServed: 40,
      projectsCount: 85,
    },
  });

  // Seed Projects
  const projects = [
    {
      title: "Invoice Processing Bot",
      description:
        "Automated end-to-end invoice processing for an insurance company, extracting data from PDFs using OCR and entering it into SAP. Reduced processing time from 8 hours to 45 minutes daily.",
      techStack: "UiPath,ABBYY OCR,SAP,SQL Server",
      category: "RPA",
      outcome: "Reduced processing time by 90%",
      featured: true,
      order: 0,
    },
    {
      title: "E-Commerce Price Monitor",
      description:
        "Built a real-time price monitoring system that scrapes competitor prices across 5 major e-commerce platforms and sends automated alerts when pricing thresholds are crossed.",
      techStack: "Python,Selenium,BeautifulSoup,PostgreSQL,Slack API",
      category: "Web Scraping",
      outcome: "Tracking 10,000+ products daily",
      featured: true,
      order: 1,
    },
    {
      title: "HR Onboarding Automation",
      description:
        "Designed an automated onboarding workflow that creates email accounts, provisions access to 12 internal systems, generates welcome documents, and schedules training sessions.",
      techStack: "Power Automate,Microsoft Graph API,SharePoint,Azure AD",
      category: "RPA",
      outcome: "Onboarding time cut from 3 days to 2 hours",
      featured: true,
      order: 2,
    },
    {
      title: "Automated Testing Suite",
      description:
        "Developed a comprehensive test automation framework for a fintech startup, covering UI testing, API testing, and regression test suites with CI/CD integration.",
      techStack: "Selenium,Playwright,Python,Jenkins,Docker",
      category: "Test Automation",
      outcome: "95% test coverage achieved",
      featured: false,
      order: 3,
    },
    {
      title: "Data Migration Pipeline",
      description:
        "Engineered an automated data migration pipeline that transferred 2 million+ records from legacy systems to a cloud-based CRM with full data validation and rollback capabilities.",
      techStack: "Python,Apache Airflow,AWS S3,Salesforce API",
      category: "Data Automation",
      outcome: "Zero data loss across 2M+ records",
      featured: false,
      order: 4,
    },
    {
      title: "Social Media Scheduler Bot",
      description:
        "Created a cross-platform social media automation tool that schedules posts, monitors engagement metrics, and generates weekly performance reports automatically.",
      techStack: "Node.js,Puppeteer,Meta API,Twitter API,MongoDB",
      category: "Web Automation",
      outcome: "Managing 15 accounts simultaneously",
      featured: false,
      order: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Seed Skills
  const skills = [
    { name: "UiPath", category: "RPA Tools", proficiency: 95, order: 0 },
    { name: "Automation Anywhere", category: "RPA Tools", proficiency: 85, order: 1 },
    { name: "Blue Prism", category: "RPA Tools", proficiency: 75, order: 2 },
    { name: "Power Automate", category: "RPA Tools", proficiency: 90, order: 3 },
    { name: "Python", category: "Programming", proficiency: 92, order: 4 },
    { name: "JavaScript", category: "Programming", proficiency: 88, order: 5 },
    { name: "TypeScript", category: "Programming", proficiency: 82, order: 6 },
    { name: "VB.NET", category: "Programming", proficiency: 78, order: 7 },
    { name: "Selenium", category: "Web Automation", proficiency: 95, order: 8 },
    { name: "Playwright", category: "Web Automation", proficiency: 88, order: 9 },
    { name: "Puppeteer", category: "Web Automation", proficiency: 85, order: 10 },
    { name: "BeautifulSoup", category: "Web Automation", proficiency: 90, order: 11 },
    { name: "AWS", category: "Cloud & DevOps", proficiency: 80, order: 12 },
    { name: "Azure", category: "Cloud & DevOps", proficiency: 78, order: 13 },
    { name: "Docker", category: "Cloud & DevOps", proficiency: 82, order: 14 },
    { name: "Git", category: "Cloud & DevOps", proficiency: 90, order: 15 },
    { name: "PostgreSQL", category: "Databases", proficiency: 85, order: 16 },
    { name: "MongoDB", category: "Databases", proficiency: 80, order: 17 },
    { name: "SQL Server", category: "Databases", proficiency: 82, order: 18 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Seed Testimonials
  const testimonials = [
    {
      content:
        "Abrar automated our entire invoice processing workflow and saved us hundreds of hours per month. His attention to detail and ability to understand our business processes was remarkable.",
      authorName: "Sarah Mitchell",
      authorTitle: "Operations Director",
      authorCompany: "GlobalTech Solutions",
      order: 0,
    },
    {
      content:
        "The web scraping solution he built is incredibly robust. It's been running flawlessly for 6 months, handling thousands of requests daily without any issues. Highly recommended!",
      authorName: "James Chen",
      authorTitle: "CTO",
      authorCompany: "PriceWatch Analytics",
      order: 1,
    },
    {
      content:
        "Working with Abrar was a game-changer for our QA team. The test automation framework he delivered helped us achieve 95% coverage and cut our release cycle in half.",
      authorName: "Maria Rodriguez",
      authorTitle: "QA Lead",
      authorCompany: "FinFlow Inc.",
      order: 2,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
