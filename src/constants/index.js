export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Work',
        href: '#work',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];

export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Marketing Director at GreenLeaf',
        img: 'assets/review1.png',
        review:
            'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
        id: 2,
        name: 'Mark Rogers',
        position: 'Founder of TechGear Shop',
        img: 'assets/review2.png',
        review:
            'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager at UrbanTech ',
        img: 'assets/review3.png',
        review:
            'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO of BrightStar Enterprises',
        img: 'assets/review4.png',
        review:
            'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
];

export const myProjects = [
    {
        title: 'MERN Stack Art Management System',
        desc: 'A full-stack application designed to manage art collections and exhibits for the Udruženje Likovnih Umetnika Srbije, providing a streamlined process for administrators and guests.',
        subdesc:
            'Developed using MongoDB, Express.js, React, and Node.js, the platform includes RESTful APIs for efficient data management and a user-friendly interface for easy interaction.',
        href: 'https://www.vusbaza.net', // example link, modify as needed
        texture: '/textures/project/ulus.mp4', // placeholder texture path
        logo: '/assets/ulus.png', // placeholder logo path
        logoStyle: {
            backgroundColor: '#1F1A1B',
            border: '0.2px solid #262122',
            boxShadow: '0px 0px 60px 0px #B34D3C4D',
        },
        spotlight: '/assets/spotlight1.png', // placeholder spotlight path
        tags: [
            {
                id: 1,
                name: 'MongoDB',
                path: '/assets/mongodb.svg', // placeholder MongoDB icon
            },
            {
                id: 2,
                name: 'Express.js',
                path: '/assets/express.png', // placeholder Express.js icon
            },
            {
                id: 3,
                name: 'React.js',
                path: '/assets/react.svg', // existing React icon
            },
            {
                id: 4,
                name: 'Node.js',
                path: '/assets/nodejs-2.svg', // placeholder Node.js icon
            },
        ],
    },
    {
        title: 'BOOKTOPIA – Bookstore',
        desc: 'A personal project developed to create an online bookstore with user authentication, shopping cart functionality, and secure payment processing using Django and Python.',
        subdesc:
            'Built using Django framework and MySQL database, this project showcases an e-commerce platform designed for seamless user experience and secure transactions.',
        href: 'https://github.com/zigameni/booktopia', // example link, modify as needed
        texture: '/textures/project/booktopia.mp4', // placeholder texture path
        logo: '/assets/booktopia.png', // placeholder logo path
        logoStyle: {
            backgroundColor: '#2E2A26',
            border: '0.2px solid #2D2C24',
            boxShadow: '0px 0px 60px 0px #886C584D',
        },
        spotlight: '/assets/spotlight2.png', // placeholder spotlight path
        tags: [
            {
                id: 1,
                name: 'Django',
                path: '/assets/django.png', // placeholder Django icon
            },
            {
                id: 2,
                name: 'Python',
                path: '/assets/python.svg', // placeholder Python icon
            },
            {
                id: 3,
                name: 'MySQL',
                path: '/assets/mysql.png', // placeholder MySQL icon
            },
        ],
    },
    {
        title: 'Operating System Kernel for RISC-V Architecture',
        desc: 'A custom operating system kernel developed for the RISC-V architecture, tested using the QEMU emulator for ensuring compatibility and performance.',
        subdesc:
            'This project involved the development of an OS kernel using C/C++ and RISC-V assembly, showcasing low-level system programming and architecture-specific development skills.',
        href: 'https://github.com/zigameni/riscv-kernel', // example link, modify as needed
        texture: '/textures/project/project3.mp4', // placeholder texture path
        logo: '/assets/risc-v.png', // placeholder logo path
        logoStyle: {
            backgroundColor: '#2A2E3B',
            border: '0.2px solid #2B3C4D',
            boxShadow: '0px 0px 60px 0px #546F8D4D',
        },
        spotlight: '/assets/spotlight3.png', // placeholder spotlight path
        tags: [
            {
                id: 1,
                name: 'C++',
                path: '/assets/c.svg', // placeholder C/C++ icon
            },
            {
                id: 2,
                name: 'C++',
                path: '/assets/cpp.svg', // placeholder C/C++ icon
            },
            {
                id: 3,
                name: 'RISC-V',
                path: '/assets/risc-v.svg', // placeholder RISC-V icon
            },
            {
                id: 4,
                name: 'QEMU',
                path: '/assets/qemu.svg', // placeholder QEMU icon
            },
        ],
    },
];


export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'Udruženje Likovnih Umetnika Srbije (ULUS)',
        pos: 'Full Stack Developer (MERN Stack)',
        duration: 'December 2023 - August 2024',
        title: `Developed a full-stack application using MongoDB, Express.js, React, and Node.js. 
        Designed and implemented RESTful APIs for data management. Created a user-friendly frontend interface 
        for administrators and guests.`,
        icon: '/assets/react.svg',  // Assuming you have a logo or icon for ULUS
        animation: 'victory',  // You can change this if needed
    },
    {
        id: 2,
        name: 'Levi9 Technology Services d.o.o.',
        pos: 'DevOps Engineering Intern',
        duration: 'October 2023 - November 2023',
        title: `Developed CloudFormation templates for AWS services including DynamoDB and Lambda. 
        Implemented CI/CD pipelines using Bitbucket and GitLab. Gained experience with Docker and Kubernetes for 
        application containerization and orchestration. Applied DevOps principles to improve software development automation.`,
        icon: '/assets/docker.svg',  // Assuming you have a logo or icon for Levi9
        animation: 'clapping',  // You can change this if needed
    },
    {
        id: 3,
        name: 'Luxoft d.o.o',
        pos: 'GPU Computing and Embedded Electronics Intern',
        duration: 'March 2023 - June 2023',
        title: `Optimized GPU algorithms, resulting in a 40% improvement in processing speed for complex computational tasks. 
        Developed using efficient coding techniques for embedded systems.`,
        icon: '/assets/circuit.svg',  // Assuming you have a logo or icon for Luxoft
        animation: 'salute',  // You can change this if needed
    },
];
