export const projects = [
  {
    id: "ulus",
    index: "01",
    title: "ULUS",
    subtitle: "Art management platform",
    year: "2024—2026",
    tags: ["MongoDB", "Express", "React", "Node", "Docker"],
    blurb:
      "A production platform for ~3,500 member artists, with separate portals for curators, administrators, and the public.",
    metric: "~3,500 artists",
    visual: "ulus",
  },
  {
    id: "polymarket",
    index: "02",
    title: "Polymarket",
    subtitle: "Weather market engine",
    year: "2026",
    tags: ["Python", "asyncio", "pytest"],
    blurb:
      "An async engine across 51 cities and ~2,750 temperature markets. Four strategies, typed ports, 1,044 offline tests.",
    metric: "51 cities",
    visual: "market",
  },
  {
    id: "blockchain",
    index: "03",
    title: "Escrow Store",
    subtitle: "Blockchain store management",
    year: "2025",
    tags: ["Flask", "MySQL", "Solidity", "Docker"],
    blurb:
      "Four Flask microservices and Ethereum escrow contracts for installment payments, with JWT auth and an HTTP test suite.",
    metric: "4 services",
    visual: "chain",
  },
  {
    id: "riscv",
    index: "04",
    title: "RISC-V Kernel",
    subtitle: "Operating system kernel",
    year: "2025",
    tags: ["C++11", "RISC-V", "QEMU"],
    blurb:
      "A multithreaded kernel with preemptive scheduling, synchronization, a first-fit heap, and trap handling for syscalls.",
    metric: "1 kernel",
    visual: "kernel",
  },
];

export const roles = [
  {
    year: "Mar 2024 – Sep 2026",
    company: "ULUS",
    role: "Full-stack developer",
    place: "Belgrade",
    line:
      "Built the platform behind ~3,500 artists: three portals, one typed API, and a Dockerized deploy.",
  },
  {
    year: "Sep – Dec 2023",
    company: "Levi9",
    role: "DevOps intern",
    place: "Belgrade",
    line:
      "CloudFormation, CI/CD, and containers — environments reproducible with a single command.",
  },
  {
    year: "Mar – Jun 2023",
    company: "DXC Luxoft",
    role: "GPU computing intern",
    place: "Belgrade",
    line:
      "Performance-first CUDA work that cut GPU processing time by 30%.",
  },
];

export const stackRows = [
  ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "SQL", "Solidity"],
  ["React", "Angular", "Node.js", "Express", "Flask", "Django", "Spring Boot"],
  ["MongoDB", "MySQL", "DynamoDB", "Cassandra", "Docker", "Kubernetes", "AWS"],
];

export const stats = [
  { value: "~3,500", label: "artists on one platform" },
  { value: "1,044", label: "offline tests, ~43s" },
  { value: "51", label: "cities priced in parallel" },
];
