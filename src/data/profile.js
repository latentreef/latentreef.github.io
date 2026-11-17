/**
 * ============================================================
 *  YOUR PORTFOLIO CONTENT. Edit this file to make it yours.
 * ============================================================
 *  Every section of the page is rendered from this object.
 *  Text formatting: wrap a word in *asterisks* to highlight it in gold.
 */

export const profile = {
  seo: {
    title: 'Aljon Macabali — Senior AI Engineer · LLM & Multi-Agent Systems',
    description:
      'Portfolio of Aljon Macabali, a Senior AI Engineer in Pampanga, Philippines, building enterprise LLM orchestration platforms, multi-agent systems, production RAG pipelines and MLOps on Azure and AWS.',
  },

  name: { first: 'Aljon', last: 'Macabali.' },
  logo: { name: 'aljon', suffix: '.ai' },
  initials: 'AM',
  greeting: 'Hi, I’m',

  available: true,
  availabilityText: 'Open to contract & full-time AI roles · Pampanga, PH',
  location: 'Mexico, Pampanga, Philippines',
  workMode: 'UTC+8 · Remote · Contract or full-time',

  // Shown in the profile card and the terminal on the Stack page
  title: 'Senior AI Engineer',
  yearsSummary: '7+ yrs · software → AI systems',
  focus: ['LLMs', 'Multi-agent systems', 'RAG', 'MLOps'],

  // Info list on the About page (shown under Location)
  now: [
    { label: 'Role', value: 'AI Engineer @ Juji, Inc.' },
    { label: 'Building', value: 'Multi-agent LLM systems' },
    { label: 'Cloud', value: 'Azure OpenAI · AWS Bedrock' },
    { label: 'Open to', value: 'Contract & full-time roles' },
  ],

  // Put your photo in /public (e.g. public/me.jpg) and set photo: 'me.jpg'.
  // photoPosition is the CSS object-position used to crop it into the tall profile card.
  photo: 'me.jpg',
  photoPosition: '56% 20%',

  // "Download Resume" button on the profile card. public/resume.pdf is generated from this file:
  // run `npm run resume` after editing your content. Set cv: '' to show a "Copy email" button instead.
  cv: 'resume.pdf',

  // Looping video behind the whole page, kept faint so the cards stay readable.
  // Put your own file in /public and change src (mp4/H.264 works everywhere), or set bgVideo: null.
  // opacity is per theme (0 = invisible, 1 = full strength).
  bgVideo: {
    src: 'videos/fish.mp4',
    poster: 'videos/fish-poster.jpg',
    opacity: { light: 0.12, dark: 0.22 },
  },

  roles: [
    'Senior AI Engineer',
    'Multi-Agent Systems Builder',
    'RAG Pipeline Architect',
    'Production MLOps Engineer',
  ],
  tagline:
    'Turning complex business problems into *production LLM systems* — multi-agent orchestration, RAG and MLOps on *Azure* and *AWS*.',

  email: 'aljon7062@gmail.com',
  // WhatsApp: `number` is shown, `wa` is digits only (country code first) for the wa.me chat link
  whatsapp: { number: '+1 (562) 569-4271', wa: '15625694271' },
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/aljon-macabali-b0536b431/' },
    { label: 'GitHub', icon: 'github', href: 'https://github.com/pokemon225' },
  ],

  // Skill chips on the About page
  skills: ['LangChain', 'LlamaIndex', 'LangGraph', 'AutoGen', 'CrewAI', 'Azure OpenAI', 'AWS Bedrock', 'Pinecone', 'FAISS', 'Langfuse', 'MLflow', 'Python'],

  // "What I Do" cards on the About page
  services: [
    { icon: 'λ', title: 'LLM Orchestration', text: 'Enterprise LLM platforms with planning, tool use and Chain-of-Thought / ReAct reasoning that hold up in production.' },
    { icon: '∑', title: 'Multi-Agent Systems', text: 'Agents that delegate, remember and recover, built with LangGraph, AutoGen and CrewAI on Azure OpenAI.' },
    { icon: '≈', title: 'RAG & Vector Search', text: 'Hybrid dense-sparse retrieval and knowledge graphs at million-query scale, with sub-100ms search.' },
    { icon: '∂', title: 'MLOps & Fine-Tuning', text: 'Domain fine-tuning, evaluation, A/B tests and blue-green deploys on AWS Bedrock, Langfuse and MLflow.' },
  ],

  // Stack page: grouped tools
  stack: [
    { group: 'LLMs & Agents', icon: '◆', items: ['LangChain', 'LangGraph', 'AutoGen', 'CrewAI', 'Chain-of-Thought · ReAct', 'GPT-4 function calling'] },
    { group: 'Retrieval & Data', icon: '◇', items: ['LlamaIndex', 'Pinecone', 'FAISS', 'Azure AI Search', 'Hybrid dense-sparse retrieval', 'Knowledge graphs'] },
    { group: 'Cloud & MLOps', icon: '△', items: ['Azure OpenAI', 'AWS Bedrock', 'AWS Lambda', 'Langfuse', 'MLflow', 'A/B testing · blue-green'] },
    { group: 'Software Engineering', icon: '○', items: ['Python', 'React · Next.js', 'Node.js · Express', 'React Native', 'Laravel · MongoDB', 'CI/CD · Microservices'] },
  ],

  about: {
    statement:
      'Hey there 👋 I’m Aljon, an AI engineer from the Philippines who builds enterprise-grade LLM orchestration platforms, multi-agent systems and production RAG pipelines. My work spans the full AI lifecycle, from fine-tuning and prompt engineering to MLOps automation, and it is measured in lower costs, faster systems and fewer manual steps. Years of full-stack and cloud engineering taught me to ship AI that holds up in production.',
    // Words in the statement that light up gold
    stats: [
      { value: 7, suffix: '+', label: 'years building AI & software' },
      { value: 70, suffix: '%', label: 'fewer manual interventions' },
      { value: 40, suffix: '%', label: 'higher task completion' },
    ],
  },

  values: [
    { word: 'Teamwork', meaning: 'Ship together', icon: '⊕', text: 'Embedded with client engineering teams across APAC, and mentored junior engineers in Zamboanga City.' },
    { word: 'Efficiency', meaning: 'Measurable impact', icon: '∇', text: 'Cut deployment cycles from 5 days to 1 and operational costs by 25%. AI should pay for itself.' },
    { word: 'Reliability', meaning: 'Production first', icon: '◎', text: '99.9% system reliability, schema-validated outputs and reasoning you can explain.' },
    { word: 'Empathy', meaning: 'Users first', icon: '♡', text: 'Joining UX discussions early so AI solutions fit real users and real business goals.' },
  ],

  // Works page, in display order: products I built first, then current work at Juji.
  // `category` drives the filter tabs. `image` (in /public) replaces the drawn preview with a real screenshot.
  // `role` is optional. `metrics` show as a row of numbers on each card: keep them short.
  // `links[0]` becomes the arrow button on the card.
  projects: [
    {
      title: 'Healmind',
      year: 'iasona.com',
      category: 'Products',
      kind: 'React · Tavus conversational AI · Daily WebRTC',
      description: 'AI coaching app: visitors pick an integration coach and start a face-to-face video session with a conversational AI persona, streamed in real time.',
      metrics: [
        { value: 'AI', label: 'video personas' },
        { value: 'Live', label: 'WebRTC video chat' },
        { value: '1:1', label: 'coaching sessions' },
      ],
      tags: ['React', 'Tavus', 'Daily.co', 'Conversational AI'],
      image: 'works/healmind.jpg',
      colors: ['#0f3a46', '#c9a35a'],
      glyph: '◐',
      links: [{ label: 'Visit site', href: 'https://iasona.com' }],
    },
    {
      title: 'NAVA Smart Ring',
      year: 'navaring.com',
      category: 'Products',
      kind: 'Shopify · E-commerce · Health AI',
      description: 'Storefront for a smart ring that tracks sleep, activity, stress and readiness, with Health AI insights in its companion app. Product storytelling, ring-size finder, organization plans and ordering.',
      metrics: [
        { value: 'Shopify', label: 'storefront' },
        { value: 'Sizing', label: 'ring-size finder' },
        { value: 'B2B', label: 'organization plans' },
      ],
      tags: ['Shopify', 'Liquid', 'JavaScript', 'E-commerce'],
      image: 'works/nava.jpg',
      colors: ['#3b3226', '#d6c3a5'],
      glyph: '○',
      links: [{ label: 'Visit site', href: 'https://navaring.com/' }],
    },
    {
      title: 'Radiant Claims',
      year: 'radiantclaims.com',
      category: 'Products',
      kind: '7-agent federal claims & document platform',
      role: 'AI Engineer & Full-Stack Developer — sole builder, architecture through production',
      description: 'Families harmed by US nuclear testing must file RECA compensation claims against dense federal rules, and the DOJ backlog punishes every error. I built the platform solo: a guided eligibility wizard, separate claimant and staff portals, and seven specialized AI agents that extract entities, categorize uploaded evidence and check each filing against current federal rules. A four-tier OCR cascade routes every page to the cheapest engine that can actually read it, and a daily DOJ scraper keeps the rule set from going stale.',
      metrics: [
        { value: '7', label: 'specialized AI agents' },
        { value: '4-tier', label: 'OCR cost cascade' },
        { value: 'Daily', label: 'DOJ rule sync' },
      ],
      tags: ['AI Agents', 'OCR', 'Next.js', 'TypeScript', 'PostgreSQL'],
      image: 'works/radiantclaims.jpg',
      colors: ['#7a2e1f', '#e0674a'],
      glyph: '☢',
      links: [{ label: 'Visit site', href: 'https://radiantclaims.com' }],
    },
    {
      title: 'Filter Coop',
      year: 'turf-troop.com',
      category: 'Products',
      kind: 'Neighborhood group-buying SaaS with territory mapping',
      role: 'Full-Stack Developer — Next.js, PostgreSQL, Stripe, Mapbox, Twilio, three-sided flows',
      description: 'Households pay retail for HVAC filter service because they buy alone. Filter Coop groups neighbors into local co-ops so collective volume unlocks wholesale pricing. I built the full platform: drawable Mapbox service territories, customer interest and onboarding, a service-provider application track with status checking, an admin console, recurring Stripe subscription billing and Twilio SMS for scheduling, with product analytics and error tracking from the first deploy. Operating across Utah.',
      metrics: [
        { value: '3-sided', label: 'customer · provider · admin' },
        { value: 'Stripe', label: 'recurring billing' },
        { value: 'Mapbox', label: 'drawable territories' },
      ],
      tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Mapbox', 'Twilio'],
      image: 'works/filter-coop.jpg',
      colors: ['#3b2f8f', '#6c63ff'],
      glyph: '⌂',
      links: [{ label: 'Visit site', href: 'https://turf-troop.com' }],
    },
    {
      title: 'LLM Orchestration Platform',
      year: 'Juji',
      kind: 'Multi-Agent · AutoGen · CrewAI',
      description: 'Enterprise LLM orchestration with hierarchical planning and tool-augmented reasoning, built for a conversational AI platform.',
      metrics: [
        { value: '−25%', label: 'operational cost' },
        { value: '+40%', label: 'task completion' },
        { value: 'CoT', label: '+ ReAct reasoning' },
      ],
      tags: ['AutoGen', 'CrewAI', 'Python', 'Azure'],
      category: 'Current',
      colors: ['#14532d', '#22c55e'],
      glyph: 'λ',
      links: [],
    },
    {
      title: 'Multi-Agent AI System',
      year: 'Juji',
      kind: 'LangGraph · Azure OpenAI',
      description: 'Agents with dynamic task delegation and adaptive learning. Long-term agent memory runs on Azure AI Search.',
      metrics: [
        { value: '−70%', label: 'manual interventions' },
        { value: '99.9%', label: 'reliability' },
        { value: 'Azure', label: 'AI Search memory' },
      ],
      tags: ['LangGraph', 'Azure OpenAI', 'Azure AI Search'],
      category: 'Current',
      colors: ['#134e4a', '#2dd4bf'],
      glyph: '∑',
      links: [],
    },
    {
      title: 'Production RAG & Vector Search',
      year: 'Juji',
      kind: 'Retrieval · LangChain · LlamaIndex',
      description: 'Hybrid dense-sparse retrieval with knowledge-graph augmentation, on vector search infrastructure serving million-scale queries.',
      metrics: [
        { value: '85%', label: 'retrieval accuracy' },
        { value: '<100ms', label: 'search latency' },
        { value: '1M+', label: 'scale searches' },
      ],
      tags: ['LangChain', 'LlamaIndex', 'Pinecone', 'FAISS', 'AWS Lambda'],
      category: 'Current',
      colors: ['#1a2e05', '#84cc16'],
      glyph: '≈',
      links: [],
    },
    {
      title: 'MLOps & Model Fine-Tuning',
      year: 'Juji',
      kind: 'Langfuse · MLflow · AWS Bedrock',
      description: 'Automated A/B testing and blue-green deployment, plus domain fine-tuning on AWS Bedrock with a curated dataset of 10K+ examples.',
      metrics: [
        { value: '5d → 1d', label: 'deploy cycle' },
        { value: '+45%', label: 'model performance' },
        { value: '10K+', label: 'training examples' },
      ],
      tags: ['Langfuse', 'MLflow', 'AWS Bedrock', 'CI/CD'],
      category: 'Current',
      colors: ['#052e16', '#10b981'],
      glyph: '∂',
      links: [],
    },
  ],

  // Resume page, newest first. `highlights` show as bullets, `tech` as chips under each job.
  experience: [
    {
      years: 'May 2024 — Present',
      title: 'Artificial Intelligence Engineer',
      org: 'Juji, Inc. (acquired by Accenture)',
      text: 'Building enterprise LLM orchestration, multi-agent architectures, production RAG and MLOps for a conversational AI platform.',
      highlights: [
        'Built an LLM orchestration platform with hierarchical planning and Chain-of-Thought / ReAct reasoning: 25% lower operational cost and 40% higher task completion.',
        'Designed multi-agent systems with dynamic task delegation and long-term memory on Azure AI Search, cutting manual interventions by 70% at 99.9% reliability.',
        'Shipped hybrid dense-sparse RAG with knowledge-graph augmentation: 85% retrieval accuracy and sub-100ms search across million-scale queries.',
        'Automated A/B testing and blue-green deployments (deploy cycle 5 days → 1 day) and fine-tuned models on AWS Bedrock with 10K+ curated examples (+45% performance).',
      ],
      tech: ['AutoGen', 'CrewAI', 'LangGraph', 'LangChain', 'LlamaIndex', 'Azure OpenAI', 'AWS Bedrock', 'Pinecone', 'FAISS', 'Langfuse', 'MLflow'],
    },
    {
      years: 'Nov 2021 — Apr 2024',
      title: 'Senior Software Engineer',
      org: 'CBTW APAC',
      text: 'Built cloud-native platforms on Azure for clients across APAC, working embedded with their engineering teams.',
      highlights: [
        'Delivered platforms for digital banking, online marketplaces and EPC project management.',
        'Built front ends and APIs with React, Next.js, Node.js and Laravel on Azure.',
        'Championed microservices, CI/CD pipelines and automated testing across client teams.',
      ],
      tech: ['Azure', 'React', 'Next.js', 'Node.js', 'Laravel', 'Microservices', 'CI/CD'],
    },
    {
      years: 'Jun 2019 — Oct 2021',
      title: 'Artificial Intelligence Engineer',
      org: 'VINTAZK Outsourcing',
      text: 'Early AI engineer at a fast-growing BPO.',
      highlights: [
        'Built ML models and NLP pipelines that automated client workflows.',
        'Served clients in healthcare, e-commerce, real estate and finance.',
        'Mentored junior engineers.',
      ],
      tech: ['Python', 'Machine learning', 'NLP'],
    },
  ],
  // Resume page: numbers shown under Education
  achievements: [
    { value: '−70%', label: 'manual interventions with multi-agent systems' },
    { value: '99.9%', label: 'production system reliability' },
    { value: '5d → 1d', label: 'deploy cycle with automated MLOps' },
    { value: '<100ms', label: 'vector search at million-query scale' },
    { value: '+45%', label: 'model performance from domain fine-tuning' },
    { value: '−25%', label: 'operational cost on the LLM platform' },
  ],
  education: [
    { years: '2018 — 2019', title: 'Master of Science, Computer Science', org: 'Ateneo de Manila University', text: 'Graduate degree in Computer Science.' },
    { years: '2014 — 2018', title: 'Bachelor of Science, Computer Science', org: 'Ateneo de Manila University', text: 'Undergraduate degree in Computer Science.' },
  ],

  // World clocks on the Contact page (first one is highlighted as "home")
  timezones: [
    { label: 'Manila', tz: 'Asia/Manila' },
    { label: 'Singapore', tz: 'Asia/Singapore' },
    { label: 'London', tz: 'Europe/London' },
    { label: 'San Francisco', tz: 'America/Los_Angeles' },
  ],

  // Type this anywhere on the page for a surprise
  secretWord: 'philippines',
};
