// Initialize everything when DOM is ready
const initApp = () => {
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    mobileToggle.setAttribute(
      'aria-expanded',
      navLinks.classList.contains('open') ? 'true' : 'false'
    );
  });
}

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

  // Project filters
  const projectFilters = document.querySelectorAll('#projects .filter-btn');
  const projectCardElements = document.querySelectorAll('#projects .project-card');

  console.log(`Found ${projectFilters.length} project filter buttons and ${projectCardElements.length} project cards`);

  if (projectFilters.length > 0 && projectCardElements.length > 0) {
    projectFilters.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const filter = btn.dataset.filter;
        console.log('Project filter clicked:', filter);

        projectFilters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        projectCardElements.forEach((card) => {
          const category = card.dataset.category || '';
          const shouldShow = filter === 'all' || category.includes(filter);
          if (shouldShow) {
            card.removeAttribute('hidden');
          } else {
            card.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  // Course filters
  const courseFilters = document.querySelectorAll('#skills .filter-btn');
  const courseItems = document.querySelectorAll('.course-list li');

  console.log(`Found ${courseFilters.length} course filter buttons and ${courseItems.length} course items`);

  if (courseFilters.length > 0 && courseItems.length > 0) {
    courseFilters.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const filter = btn.dataset.filter;
        console.log('Course filter clicked:', filter);

        courseFilters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        courseItems.forEach((item) => {
          const categories = item.dataset.category || '';
          const shouldShow = filter === 'all' || categories.includes(filter);
          if (shouldShow) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
          }
        });
      });
    });
  }
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

const sections = document.querySelectorAll('main section');
const updateActiveNav = () => {
  const navAnchors = document.querySelectorAll('.nav-links a');
  if (!navAnchors || navAnchors.length === 0) return;
  
  const headerOffset = 100; // Account for fixed header
  let currentSection = null;
  let minDistance = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    
    // Check if section is in viewport and above the middle of the screen
    if (sectionTop <= headerOffset + 100 && rect.bottom > headerOffset) {
      const distance = Math.abs(sectionTop - headerOffset);
      if (distance < minDistance) {
        minDistance = distance;
        currentSection = section;
      }
    }
  });

  // If no section found with the above logic, find the one with most visibility
  if (!currentSection) {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const ratio = visibleHeight / rect.height;
        if (ratio > 0.2 && (!currentSection || ratio > minDistance)) {
          minDistance = ratio;
          currentSection = section;
        }
      }
    });
  }

  if (currentSection) {
    const id = currentSection.getAttribute('id');
    navAnchors.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }
};

// Update on scroll
window.addEventListener('scroll', updateActiveNav);
// Update on load
updateActiveNav();

// Also use IntersectionObserver as backup
const observer = new IntersectionObserver(
  () => {
    updateActiveNav();
  },
  {
    threshold: [0, 0.1, 0.3, 0.5],
    rootMargin: '-100px 0px -40% 0px',
  }
);

sections.forEach((section) => observer.observe(section));

// Modal functionality
const initModals = () => {
const projectCardsInteractive = document.querySelectorAll('.project-card[data-modal]');
const modals = document.querySelectorAll('.project-modal');

  if (projectCardsInteractive.length === 0) {
    return;
  }

const openModal = (id) => {
  const modal = document.getElementById(id);
    if (!modal) {
      return;
    }
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.focus();
  }
};

const closeModal = (modal) => {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
};

projectCardsInteractive.forEach((card) => {
  const modalId = card.dataset.modal;
    if (!modalId) {
      return;
    }
  card.addEventListener('click', () => {
    openModal(modalId);
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(modalId);
    }
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-haspopup', 'dialog');
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.classList.contains('open')) {
        closeModal(modal);
      }
    });
  }
});
};

// Initialize modals when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModals);
} else {
  initModals();
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.ongoing': 'Ongoing',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.email': 'Email',
    'nav.resume': 'Resume',
    'hero.name': 'Benjamin Bahurel',
    'hero.tagline': 'Microengineering, Robotics and Machine Learning engineer',
    'hero.languages': 'French · English · Spanish',
    'about.title': 'About',
    'about.paragraph1':
      "I'm a Microengineering graduate from EPFL with a focus on robotics, control, microfabrication and applied machine learning. My work spans deep learning models for content moderation, reinforcement learning systems for power grid analysis, and predictive maintenance solutions for industrial equipment. I build systems where data and hardware converge to deliver measurable performance.",
    'about.paragraph2':
      'My portfolio covers autonomous mobile robotics with SLAM and navigation, embedded systems from FPGA logic to microcontroller applications, and mechanical design from mechanism synthesis to cleanroom microfabrication. Projects such as the Dynabal dynamometer, E-Puck2 surveillance robot, autonomous highway MPC controller, and nanofluidic diamond devices reflect hands-on experience moving from CAD and PCB design through fabrication, testing, and deployment.',
    'about.paragraph3':
      'I thrive in multidisciplinary teams, collaborating with industry partners like AXPO on predictive maintenance, working in cleanroom environments for microfabrication, and developing full-stack applications from React Native mobile apps to C++ simulators. Whether implementing transformer models for NLP tasks, designing control algorithms for autonomous systems, or optimizing cleanroom processes, I translate complex technical constraints into clear, executable plans.',
    'about.paragraph4':
      'I have a strong interest and expertise in cleanroom microfabrication, mastering a wide range of equipment and processes. My hands-on experience includes surface activation systems (Tepla300, Tepla Giga-batch), coating and lithography tools (Sawatec SM-150, SM-200), dry and wet etching techniques, evaporation systems (EVA760 Z11), and dicing equipment (Disco DAD 321/3221). I\'m skilled at optimizing process parameters, troubleshooting fabrication issues, and ensuring high-quality device yields in cleanroom environments.',
    'ongoing.title': 'Ongoing Projects',
    'badge.ongoing': 'Project Still Ongoing',
    'projects.title': 'Projects',
    'projects.filter.all': 'All',
    'projects.filter.software': 'Software',
    'projects.filter.hardware': 'Hardware',
    'projects.filter.mechanical': 'Mechanical',
    'projects.filter.personal': 'Personal',
    'projects.vocy.title': 'Vocy Vocabulary Companion',
    'projects.vocy.description':
      'AI-driven language learning app with spaced repetition.',
    'projects.ml4pm.title': 'ML for Predictive Maintenance',
    'projects.ml4pm.description':
      'Industrial valve anomaly detection.',
    'projects.nano.title': 'Nanofluidic Diamond Device',
    'projects.nano.description':
      'Cleanroom device optimization.',
    'projects.religious.title': 'Religious Hate Speech Detection',
    'projects.religious.description':
      'AI-powered content moderation detecting religious hate speech across multiple languages.',
    'projects.epuck.title': 'E-Puck2 Surveillance Robot',
    'projects.epuck.description':
      'Autonomous security robot patrolling and detecting intrusions in real-time.',
    'projects.fpga.title': 'FPGA Alarm Clock',
    'projects.fpga.description':
      'Hardware alarm clock built entirely in digital logic.',
    'projects.rotary.title': 'Rotary Dimmer Reverse Engineering',
    'projects.rotary.description':
      'Complete manufacturing analysis and reproduction plan.',
    'projects.orange.title': 'Orange Juice Press Mechanism',
    'projects.orange.description':
      'Ergonomic multi-link press mechanism with FEA validation.',
    'projects.dynabal.title': 'Dynabal Balanced Dynamometer',
    'projects.dynabal.description':
      'Compliant torque measurement system for flexible shafts.',
    'projects.mario.title': 'Homemade Mario LED Matrix Game',
    'projects.mario.description':
      'Classic Mario gameplay recreated on embedded hardware.',
    'projects.mobileRobotics.title': 'Autonomous Mobile Robotics Stack',
    'projects.mobileRobotics.description':
      'Full autonomy stack with SLAM, navigation, and control.',
    'projects.mpc.title': 'Autonomous Highway MPC',
    'projects.mpc.description':
      'Predictive control for safe highway driving.',
    'projects.planetDonut.title': 'Planet Donut Resource Simulator',
    'projects.planetDonut.description':
      'RL-powered resource management simulator.',
    'projects.rlBenchmark.title': 'Deep RL Algorithm Benchmark',
    'projects.rlBenchmark.description':
      'Comprehensive comparison of modern RL algorithms.',
    'projects.powerGrid.title': 'Power Grid Vulnerability Analysis',
    'projects.powerGrid.description':
      'RL-based risk assessment for power grids.',
    'projects.pitot.title': 'Wireless Pitot Probe Platform',
    'projects.pitot.description':
      'Wireless airflow measurement for aerodynamics.',
    'modal.common.viewRepo': 'View Repository',
    'modal.common.downloadReport': 'Download Report',
    'modal.religious.title': 'Religious Hate Speech Detection',
    'modal.religious.subtitle': 'Spring 2025 · Deep Learning (EE-559)',
    'modal.religious.tagline':
      'Lightweight transformer models tuned to flag religious hate speech across multilingual short-form content while balancing recall and latency.',
    'modal.religious.assignmentTitle': 'Assignment',
    'modal.religious.assignment':
      'Build and compare compact transformer architectures able to detect religious hate speech in noisy social media text. The model had to generalise across English, French, German, and Spanish while maintaining transparency for moderation teams.',
    'modal.religious.solutionTitle': 'Solution',
    'modal.religious.solution':
      'Benchmarked six lightweight transformer variants (DistilBERT, ALBERT, ELECTRA, RoBERTa, BERT-Tiny, MobileBERT) with Optuna hyper-parameter tuning. Combined data augmentation, class rebalancing, and multilingual embeddings to reach 95% recall in low-resource regimes. Deployed the best model in a Gradio moderation cockpit.',
    'modal.religious.toolsTitle': 'Tools & Competencies',
    'modal.religious.tools1': 'Python, Hugging Face Transformers, Optuna, Gradio, Docker',
    'modal.religious.tools2': 'Multilingual text preprocessing, explainable AI overlays, model monitoring',
    'modal.religious.tools3': 'Ethical AI considerations for moderation workflows',
    'modal.vocy.title': 'Vocy Vocabulary Companion',
    'modal.vocy.subtitle': 'Personal Project · Ongoing',
    'modal.vocy.tagline':
      'Mobile-first application that accelerates language learning with a structured spaced-repetition track and an AI discovery feed tailored to the learner’s interests.',
    'modal.vocy.conceptTitle': 'Concept',
    'modal.vocy.concept':
      'Designed Vocy to support fast-moving engineers learning new languages. The learning mode schedules flashcard-style reviews with adaptive spacing, while the discovery mode uses an LLM agent to surface idioms, slang, and domain-specific vocabulary from curated sources.',
    'modal.vocy.implementationTitle': 'Implementation',
    'modal.vocy.implementation':
      'Built with a React Native front-end, Supabase for synchronised storage, and an OpenAI-powered recommender microservice. Added pronunciation practice with speech-to-text scoring and progress dashboards for daily, weekly, and cumulative streaks.',
    'modal.vocy.learningTitle': 'What I’m Learning',
    'modal.vocy.learning1': 'Product discovery and retention analytics for consumer apps',
    'modal.vocy.learning2': 'Prompt engineering for contextual vocabulary recommendations',
    'modal.vocy.learning3': 'Privacy-aware data pipelines for multilingual learning progress',
    'tags.personalProject': 'personal project',
    'tags.ai': 'ai',
    'tags.languageLearning': 'language learning',
    'tags.machineLearning': 'machine learning',
    'tags.predictiveMaintenance': 'predictive maintenance',
    'tags.anomalyDetection': 'anomaly detection',
    'tags.timeSeries': 'time series',
    'tags.nanofluidics': 'nanofluidics',
    'tags.cleanroom': 'cleanroom',
    'tags.microfabrication': 'microfabrication',
    'tags.deepLearning': 'deep learning',
    'tags.nlp': 'nlp',
    'tags.transformers': 'transformers',
    'tags.moderation': 'moderation',
    'tags.robotics': 'robotics',
    'tags.embedded': 'embedded',
    'tags.automation': 'automation',
    'tags.fpga': 'fpga',
    'tags.digitalLogic': 'digital logic',
    'tags.hdl': 'hdl',
    'tags.reverseEngineering': 'reverse engineering',
    'tags.manufacturing': 'manufacturing',
    'tags.metrology': 'metrology',
    'tags.mechanismDesign': 'mechanism design',
    'tags.cad': 'cad',
    'tags.prototyping': 'prototyping',
    'tags.mechanisms': 'mechanisms',
    'tags.mechatronics': 'mechatronics',
    'tags.testing': 'testing',
    'tags.microcontrollers': 'microcontrollers',
    'tags.embeddedC': 'embedded c',
    'tags.gameDev': 'game dev',
    'tags.slam': 'slam',
    'tags.navigation': 'navigation',
    'tags.control': 'control',
    'tags.mpc': 'mpc',
    'tags.autonomousDriving': 'autonomous driving',
    'tags.simulation': 'simulation',
    'tags.reinforcementLearning': 'reinforcement learning',
    'tags.cpp': 'c++',
    'tags.benchmarking': 'benchmarking',
    'tags.openAiGym': 'openai gym',
    'tags.powerSystems': 'power systems',
    'tags.riskAnalysis': 'risk analysis',
    'tags.sensorDesign': 'sensor design',
    'tags.wireless': 'wireless',
    'tags.aerodynamics': 'aerodynamics',
    'skills.title': 'Skills and Tools',
    'skills.tools.title': 'Tools',
    'skills.tools.programmingTitle': 'Programming Languages',
    'skills.tools.roboticsTitle': 'Robotics & Control',
    'skills.tools.mlTitle': 'Machine Learning & AI',
    'skills.tools.cadTitle': 'CAD & Design',
    'skills.tools.electronicsTitle': 'Electronics & Embedded',
    'skills.tools.manufacturingTitle': 'Manufacturing & Fabrication',
    'skills.tools.devTitle': 'Development Tools',
    'skills.tools.dataTitle': 'Data Analysis & Visualization',
    'skills.tools.cleanroomTitle': 'Cleanroom Techniques',
    'skills.tools.cleanroomList':
      'Cleaning & Surface Activation (Tepla300, Tepla Giga-batch), Coating & Exposure & Development (Sawatec SM-150, Sawatec SM-200), Dry/Wet Etching, Evaporation (EVA760 Z11), Dicing (Disco DAD 321/3221)',
    'skills.courses.filterAll': 'All',
    'skills.courses.filterApplied': 'Applied',
    'skills.courses.filterTheoretical': 'Theoretical',
    'skills.courses.filterBusiness': 'Business',
    'skills.courses.basicsMobileRobotics': 'Basics of Mobile Robotics',
    'skills.courses.basicsManipulation': 'Basics of Robotics for Manipulation',
    'skills.courses.machineLearning': 'Machine Learning I',
    'skills.courses.modelPredictiveControl': 'Model Predictive Control',
    'skills.courses.roboticsPracticals': 'Robotics Practicals',
    'skills.courses.roboticsProject': 'Robotics Project I',
    'skills.courses.motorControl': 'Motor Embedded Control',
    'skills.courses.deepLearning': 'Deep Learning',
    'skills.courses.imageProcessing': 'Image Processing I',
    'skills.courses.microNanoRobotics': 'Micro/Nano Robotics',
    'skills.courses.networkedControl': 'Networked Control Systems',
    'skills.courses.reinforcementLearning': 'Reinforcement Learning',
    'skills.courses.logistics': 'Logistics and Demand Analysis',
    'skills.courses.projectManagement': 'Project Management and Risk Analysis',
    'skills.courses.finance': 'Principles of Finance',
    'skills.courses.actuators': 'Electromagnetic Actuators and Systems I-II',
    'skills.courses.automaticControl': 'Automatic Control and Digital Regulation',
    'skills.courses.signalsSystems': 'Signals and Systems I-II',
    'skills.courses.opticalEngineering': 'Optical Engineering',
    'skills.courses.semiconductorPhysics': 'Physics of Semiconductor Devices',
    'skills.courses.embeddedSystems': 'Embedded Systems and Robotics',
    'skills.courses.sensors': 'Sensors',
    'skills.courses.manufacturingTech': 'Manufacturing Technologies',
    'skills.courses.microfabrication': 'Microfabrication Technologies and Practicals',
    'skills.courses.wirelessSensors': 'Wireless Sensor Practicals',
    'skills.courses.mechanismDesign': 'Mechanism Design I-II',
    'skills.courses.analogDigital': 'Analog and Digital Electronics I-II',
    'skills.courses.microcontrollers': 'Microcontrollers',
    'skills.courses.designExperiments': 'Design of Experiments',
    'skills.courses.numericalAnalysis': 'Numerical Analysis and Optimization',
    'contact.title': 'Get In Touch',
    'contact.lead':
      "I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out through any of the channels below.",
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'footer.copy': '© 2025 Benjamin Bahurel. All rights reserved.',
  },
};

// Apply English translations
const applyTranslations = () => {
  const dict = translations.en;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      if (node.dataset.i18nHtml === 'true') {
        node.innerHTML = dict[key];
      } else {
        node.textContent = dict[key];
      }
    }
  });
};

applyTranslations();




