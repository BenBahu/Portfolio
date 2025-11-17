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

const projectFilters = document.querySelectorAll('#projects .filter-btn');
const projectCardElements = document.querySelectorAll('#projects .project-card');

projectFilters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    projectFilters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    projectCardElements.forEach((card) => {
      const { category } = card.dataset;
      const shouldShow = filter === 'all' || category.includes(filter);
      card.toggleAttribute('hidden', !shouldShow);
    });
  });
});

const courseFilters = document.querySelectorAll('#skills .filter-btn');
const courseItems = document.querySelectorAll('.course-list li');

courseFilters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    courseFilters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    courseItems.forEach((item) => {
      const categories = item.dataset.category || '';
      const shouldShow = filter === 'all' || categories.includes(filter);
      item.toggleAttribute('hidden', !shouldShow);
    });
  });
});

const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible.length > 0) {
      const id = visible[0].target.getAttribute('id');
      navAnchors.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => observer.observe(section));

const projectCardsInteractive = document.querySelectorAll('.project-card[data-modal]');
const modals = document.querySelectorAll('.project-modal');

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
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
      'I’m a Microengineering graduate from EPFL with a focus on robotics, control, and applied machine learning. From predictive maintenance models for AXPO’s industrial valve fleet to high-frequency trading analytics, I build systems where data and hardware converge to deliver measurable performance.',
    'about.paragraph2':
      'My portfolio spans autonomous mechatronic rigs, embedded wearables, and simulation-heavy software. Projects such as the DYNABAL dynamometer, self-regulating ski jacket, wireless sensor networks, and FPGA-based interfaces reflect hands-on experience moving from CAD and PCB design through fabrication, testing, and deployment.',
    'about.paragraph3':
      'I thrive in multidisciplinary teams—aligning robotics labs, finance analysts, and manufacturing workshops. Whether mentoring robotics projects, leading cleanroom builds, or turning deep-learning research into actionable dashboards, I translate complex constraints into clear plans that keep teams shipping resilient products.',
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
      'Mobile-first language companion with a structured spaced-repetition track and an AI discovery feed that suggests idioms, slang, and domain vocabulary based on learner interests.',
    'projects.ml4pm.title': 'ML for Predictive Maintenance',
    'projects.ml4pm.description':
      'Machine learning system in collaboration with AXPO to detect anomalies in ball valve operations for industrial maintenance, targeting proactive interventions.',
    'projects.nano.title': 'Nanofluidic Diamond Device',
    'projects.nano.description':
      'Semester research developing aluminium-backed diamond nanofluidic devices with improved fabrication steps, focusing on surface activation and bonding quality.',
    'projects.religious.title': 'Religious Hate Speech Detection',
    'projects.religious.description':
      'Lightweight transformer ensemble evaluating multilingual religious hate speech and surfacing moderation insights while balancing accuracy, recall, and deployment cost.',
    'projects.epuck.title': 'E-Puck2 Surveillance Robot',
    'projects.epuck.description':
      'Embedded security platform on the e-puck2 that patrols, detects intrusions, and emits alarms using onboard sensing, behaviour states, and autonomous navigation loops.',
    'projects.fpga.title': 'FPGA Alarm Clock',
    'projects.fpga.description':
      'Digital logic alarm clock implementing setup, countdown, and audible alerts on DE-10 Lite hardware with debounced inputs and finite state control.',
    'projects.rotary.title': 'Rotary Dimmer Reverse Engineering',
    'projects.rotary.description':
      'Manufacturing teardown of a rotary dimmer switch covering material analysis, tolerances, and a full process plan to reproduce the assembly with EPFL lab equipment.',
    'projects.orange.title': 'Orange Juice Press Mechanism',
    'projects.orange.description':
      'Multi-link press engineered for ergonomic leverage, finite-element validated components, and a build plan spanning machining, assembly, and safety assessment.',
    'projects.dynabal.title': 'Dynabal Balanced Dynamometer',
    'projects.dynabal.description':
      'Compliant dynamometer concept capturing torque on flexible shafts with modular bearings, preload compensation, and instrumentation interfaces.',
    'projects.mario.title': 'Homemade Mario LED Matrix Game',
    'projects.mario.description':
      'ATmega128-based platform recreating Mario gameplay on an 8×8 LED matrix with custom drivers, sound, and controller logic coded in embedded C.',
    'projects.mobileRobotics.title': 'Autonomous Mobile Robotics Stack',
    'projects.mobileRobotics.description':
      'Thymio-II robotics stack integrating computer vision, global and local navigation, motion control, and Kalman filtering for autonomous indoor routing demos.',
    'projects.mpc.title': 'Autonomous Highway MPC',
    'projects.mpc.description':
      'Model predictive control pipeline for highway driving that optimises lane keeping, speed profiles, and constraint handling under dynamic traffic scenarios.',
    'projects.planetDonut.title': 'Planet Donut Resource Simulator',
    'projects.planetDonut.description':
      'C++ resource management simulator coordinating mining and logistics robots with reinforcement learning policies to maximise colony resilience.',
    'projects.rlBenchmark.title': 'Deep RL Algorithm Benchmark',
    'projects.rlBenchmark.description':
      'Comparative study of DQN, PPO, SAC, and TD3 across classic control environments with learning curves, hyperparameter sweeps, and stability analysis.',
    'projects.powerGrid.title': 'Power Grid Vulnerability Analysis',
    'projects.powerGrid.description':
      'Semester thesis using reinforcement learning contingency search to expose weak points in national power grids and recommend risk mitigation strategies.',
    'projects.pitot.title': 'Wireless Pitot Probe Platform',
    'projects.pitot.description':
      'Wireless sensor suite that logs airflow via a Pitot probe, performs onboard calibration, and streams data for aerodynamic diagnostics in the lab.',
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
    'modal.common.viewRepo': 'Voir le dépôt',
    'modal.common.downloadReport': 'Télécharger le rapport',
    'modal.religious.title': 'Détection de discours haineux religieux',
    'modal.religious.subtitle': 'Printemps 2025 · Deep Learning (EE-559)',
    'modal.religious.tagline':
      'Ensemble de transformeurs légers capables de signaler le discours haineux religieux multilingue en équilibrant rappel, précision et coût de déploiement.',
    'modal.religious.assignmentTitle': 'Mandat',
    'modal.religious.assignment':
      "Concevoir et comparer des architectures de transformeurs compactes pour détecter le discours haineux religieux dans des textes sociaux bruités. Le modèle devait généraliser en anglais, français, allemand et espagnol tout en restant explicable pour les équipes de modération.",
    'modal.religious.solutionTitle': 'Solution',
    'modal.religious.solution':
      "Comparaison de six variantes légères (DistilBERT, ALBERT, ELECTRA, RoBERTa, BERT-Tiny, MobileBERT) avec réglage Optuna. Combinaison d’augmentation de données, rééquilibrage des classes et embeddings multilingues pour atteindre 95 % de rappel en contexte à faible données. Déploiement du meilleur modèle dans une interface de modération Gradio.",
    'modal.religious.toolsTitle': 'Outils & compétences',
    'modal.religious.tools1': 'Python, Hugging Face Transformers, Optuna, Gradio, Docker',
    'modal.religious.tools2': "Prétraitement multilingue, IA explicable, suivi des modèles",
    'modal.religious.tools3': 'Considérations éthiques pour les workflows de modération',
    'modal.vocy.title': 'Vocy, compagnon de vocabulaire',
    'modal.vocy.subtitle': 'Projet personnel · En cours',
    'modal.vocy.tagline':
      'Application mobile pour accélérer l’apprentissage des langues via une répétition espacée structurée et un flux de découverte piloté par l’IA selon les intérêts du learner.',
    'modal.vocy.conceptTitle': 'Concept',
    'modal.vocy.concept':
      'Conçue pour les ingénieurs pressés qui apprennent une nouvelle langue. Le mode apprentissage planifie les révisions avec un espacement adaptatif, tandis que le mode découverte exploite un agent LLM pour proposer expressions, argot et vocabulaire métier sélectionné.',
    'modal.vocy.implementationTitle': 'Implémentation',
    'modal.vocy.implementation':
      'Développement en React Native avec synchronisation Supabase et microservice de recommandation propulsé par OpenAI. Ajout de la pratique de prononciation via reconnaissance vocale et tableaux de bord de progression quotidienne, hebdomadaire et cumulée.',
    'modal.vocy.learningTitle': 'Ce que j’apprends',
    'modal.vocy.learning1': 'Product discovery et analyse de rétention pour applications grand public',
    'modal.vocy.learning2': 'Conception de prompts pour recommandations lexicales contextualisées',
    'modal.vocy.learning3': 'Pipelines de données respectueux de la vie privée pour le suivi multilingue',
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
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.ongoing': 'En cours',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    'nav.email': 'E-mail',
    'nav.resume': 'CV',
    'hero.name': 'Benjamin Bahurel',
    'hero.tagline': 'Ingénieur en microtechnique, robotique et apprentissage automatique',
    'hero.languages': 'Français · Anglais · Espagnol',
    'about.title': 'À propos',
    'about.paragraph1':
      "Je suis diplômé en microtechnique de l'EPFL, spécialisé en robotique, contrôle et intelligence artificielle appliquée. Des modèles de maintenance prédictive pour la flotte de vannes d'AXPO aux analyses de trading haute fréquence, je conçois des systèmes où données et matériel se rejoignent pour générer de la performance mesurable.",
    'about.paragraph2':
      "Mon portfolio couvre des bancs mécatroniques autonomes, des dispositifs embarqués et des logiciels intensifs en simulation. Des projets comme le dynamomètre DYNABAL, la veste auto-régulée, les réseaux de capteurs sans fil ou les interfaces FPGA reflètent une expérience concrète du design CAD et PCB jusqu'à la fabrication, les tests et le déploiement.",
    'about.paragraph3':
      "Je m'épanouis au sein d'équipes multidisciplinaires—entre laboratoires de robotique, analystes financiers et ateliers de fabrication. Que ce soit pour encadrer des projets de robotique, piloter des lots en salle blanche ou transformer des recherches en IA en tableaux de bord exploitables, je convertis les contraintes complexes en plans clairs qui permettent de livrer des produits robustes.",
    'ongoing.title': 'Projets en cours',
    'badge.ongoing': 'Projet en cours',
    'projects.title': 'Projets',
    'projects.filter.all': 'Tous',
    'projects.filter.software': 'Logiciel',
    'projects.filter.hardware': 'Hardware',
    'projects.filter.mechanical': 'Mécanique',
    'projects.filter.personal': 'Personnel',
    'projects.vocy.title': 'Vocy, compagnon de vocabulaire',
    'projects.vocy.description':
      "Application mobile pour accélérer l'apprentissage des langues grâce à une révision espacée structurée et un flux de découverte piloté par l'IA qui suggère expressions, idiomes et vocabulaire métier.",
    'projects.ml4pm.title': 'Maintenance prédictive par ML',
    'projects.ml4pm.description':
      "Système de machine learning mené avec AXPO pour détecter les anomalies des vannes à bille industrielles et anticiper les interventions de maintenance.",
    'projects.nano.title': 'Dispositif nanofluidique en diamant',
    'projects.nano.description':
      "Projet de semestre visant à optimiser le procédé salle blanche d’un dispositif nanofluidique en diamant, avec dos métallisé aluminium, en améliorant activation de surface et qualité de collage.",
    'projects.religious.title': 'Détection de discours haineux religieux',
    'projects.religious.description':
      "Ensemble de transformeurs légers évaluant le discours haineux religieux multilingue et fournissant des insights de modération tout en équilibrant rappel, précision et coût de déploiement.",
    'projects.epuck.title': 'Robot de surveillance E-Puck2',
    'projects.epuck.description':
      "Plateforme de sécurité embarquée sur e-puck2 qui patrouille, détecte les intrusions, déclenche des alertes et reprend automatiquement son parcours grâce aux capteurs embarqués.",
    'projects.fpga.title': 'Réveil sur FPGA',
    'projects.fpga.description':
      "Réveil entièrement en logique numérique sur carte DE-10 Lite intégrant configuration, compte à rebours et alarme sonore avec entrées débouncées et machine d’états.",
    'projects.rotary.title': 'Rétro-ingénierie d’un variateur rotatif',
    'projects.rotary.description':
      "Analyse complète d’un variateur d’intensité : matériaux, tolérances et processus de fabrication afin de reproduire l’assemblage dans les ateliers de l’EPFL.",
    'projects.orange.title': 'Mécanisme de presse à jus',
    'projects.orange.description':
      "Presse multi-barres offrant un levier ergonomique, validée par éléments finis, avec un plan de fabrication couvrant usinage, assemblage et sécurité d’utilisation.",
    'projects.dynabal.title': 'Dynamomètre équilibré Dynabal',
    'projects.dynabal.description':
      "Concept de dynamomètre compliant mesurant le couple sur des arbres flexibles avec roulements modulaires, compensation de précharge et instrumentation intégrée.",
    'projects.mario.title': 'Jeu Mario sur matrice LED',
    'projects.mario.description':
      "Plateforme ATmega128 reproduisant le gameplay de Mario sur matrice LED 8×8 avec pilotes sur mesure, gestion audio et contrôleur en C embarqué.",
    'projects.mobileRobotics.title': 'Stack robotique mobile autonome',
    'projects.mobileRobotics.description':
      "Stack d’autonomie pour Thymio-II combinant vision, navigation globale et locale, commande de mouvement et filtre de Kalman pour des missions d’intérieur.",
    'projects.mpc.title': 'MPC pour autoroute autonome',
    'projects.mpc.description':
      "Pipeline de contrôle prédictif modélisant la conduite sur autoroute tout en respectant confort, vitesse et contraintes de sécurité face à un trafic dynamique.",
    'projects.planetDonut.title': 'Simulateur de ressources Planet Donut',
    'projects.planetDonut.description':
      "Simulateur C++ de gestion de ressources coordonnant robots de forage et de logistique avec des agents RL pour maximiser la résilience des colonies.",
    'projects.rlBenchmark.title': 'Benchmark d’algorithmes RL profonds',
    'projects.rlBenchmark.description':
      "Comparaison de DQN, PPO, SAC et TD3 sur les environnements classiques d’OpenAI Gym avec analyse de stabilité, vitesse d’apprentissage et coûts de calcul.",
    'projects.powerGrid.title': 'Analyse de vulnérabilité du réseau électrique',
    'projects.powerGrid.description':
      "Mémoire de semestre exploitant l’apprentissage par renforcement pour découvrir des scénarios de contingence critiques et recommander des actions de mitigation sur le réseau suisse.",
    'projects.pitot.title': 'Plateforme Pitot sans fil',
    'projects.pitot.description':
      "Plateforme capteur sans fil mesurant les flux via une sonde Pitot, assurant calibration embarquée et télémétrie basse consommation pour l’analyse aérodynamique.",
    'tags.personalProject': 'projet personnel',
    'tags.ai': 'ia',
    'tags.languageLearning': 'apprentissage des langues',
    'tags.machineLearning': 'apprentissage automatique',
    'tags.predictiveMaintenance': 'maintenance prédictive',
    'tags.anomalyDetection': "détection d'anomalies",
    'tags.timeSeries': 'séries temporelles',
    'tags.nanofluidics': 'nanofluidique',
    'tags.cleanroom': 'salle blanche',
    'tags.microfabrication': 'microfabrication',
    'tags.deepLearning': 'deep learning',
    'tags.nlp': 'nlp',
    'tags.transformers': 'transformers',
    'tags.moderation': 'modération',
    'tags.robotics': 'robotique',
    'tags.embedded': 'embarqué',
    'tags.automation': 'automatisation',
    'tags.fpga': 'fpga',
    'tags.digitalLogic': 'logique numérique',
    'tags.hdl': 'hdl',
    'tags.reverseEngineering': 'rétro-ingénierie',
    'tags.manufacturing': 'fabrication',
    'tags.metrology': 'métrologie',
    'tags.mechanismDesign': 'conception de mécanismes',
    'tags.cad': 'cao',
    'tags.prototyping': 'prototypage',
    'tags.mechanisms': 'mécanismes',
    'tags.mechatronics': 'mécatronique',
    'tags.testing': 'tests',
    'tags.microcontrollers': 'microcontrôleurs',
    'tags.embeddedC': 'c embarqué',
    'tags.gameDev': 'développement de jeu',
    'tags.slam': 'slam',
    'tags.navigation': 'navigation',
    'tags.control': 'commande',
    'tags.mpc': 'mpc',
    'tags.autonomousDriving': 'conduite autonome',
    'tags.simulation': 'simulation',
    'tags.reinforcementLearning': 'apprentissage par renforcement',
    'tags.cpp': 'c++',
    'tags.benchmarking': 'benchmark',
    'tags.openAiGym': 'openai gym',
    'tags.powerSystems': 'réseaux électriques',
    'tags.riskAnalysis': 'analyse de risque',
    'tags.sensorDesign': 'conception de capteurs',
    'tags.wireless': 'sans fil',
    'tags.aerodynamics': 'aérodynamique',
    'skills.title': 'Compétences et outils',
    'skills.tools.title': 'Outils',
    'skills.tools.programmingTitle': 'Langages de programmation',
    'skills.tools.roboticsTitle': 'Robotique & commande',
    'skills.tools.mlTitle': 'Apprentissage automatique & IA',
    'skills.tools.cadTitle': 'CAO & design',
    'skills.tools.electronicsTitle': 'Électronique & embarqué',
    'skills.tools.manufacturingTitle': 'Fabrication & industrialisation',
    'skills.tools.devTitle': 'Outils de développement',
    'skills.tools.dataTitle': 'Analyse & visualisation de données',
    'skills.tools.cleanroomTitle': 'Procédés salle blanche',
    'skills.tools.cleanroomList':
      'Nettoyage & activation de surface (Tepla300, Tepla Giga-batch), Dépôt, exposition & développement (Sawatec SM-150, Sawatec SM-200), Gravure sèche/humide, Évaporation (EVA760 Z11), Découpe (Disco DAD 321/3221)',
    'skills.courses.filterAll': 'Tous',
    'skills.courses.filterApplied': 'Appliqués',
    'skills.courses.filterTheoretical': 'Théoriques',
    'skills.courses.filterBusiness': 'Management',
    'skills.courses.basicsMobileRobotics': 'Bases de la robotique mobile',
    'skills.courses.basicsManipulation': 'Bases de la robotique de manipulation',
    'skills.courses.machineLearning': 'Machine Learning I',
    'skills.courses.modelPredictiveControl': 'Commande prédictive de modèles',
    'skills.courses.roboticsPracticals': 'Travaux pratiques de robotique',
    'skills.courses.roboticsProject': 'Projet de robotique I',
    'skills.courses.motorControl': 'Commande embarquée de moteurs',
    'skills.courses.deepLearning': 'Deep Learning',
    'skills.courses.imageProcessing': 'Traitement d’images I',
    'skills.courses.microNanoRobotics': 'Robotique micro/nano',
    'skills.courses.networkedControl': 'Systèmes de contrôle distribués',
    'skills.courses.reinforcementLearning': 'Apprentissage par renforcement',
    'skills.courses.logistics': 'Logistique et analyse de la demande',
    'skills.courses.projectManagement': 'Gestion de projet et analyse des risques',
    'skills.courses.finance': 'Principes de finance',
    'skills.courses.actuators': 'Actionneurs électromagnétiques I-II',
    'skills.courses.automaticControl': 'Commande automatique & régulation numérique',
    'skills.courses.signalsSystems': 'Signaux et systèmes I-II',
    'skills.courses.opticalEngineering': 'Ingénierie optique',
    'skills.courses.semiconductorPhysics': 'Physique des composants semi-conducteurs',
    'skills.courses.embeddedSystems': 'Systèmes embarqués et robotique',
    'skills.courses.sensors': 'Capteurs',
    'skills.courses.manufacturingTech': 'Technologies de fabrication',
    'skills.courses.microfabrication': 'Microfabrication et travaux pratiques',
    'skills.courses.wirelessSensors': 'Capteurs sans fil – travaux pratiques',
    'skills.courses.mechanismDesign': 'Conception de mécanismes I-II',
    'skills.courses.analogDigital': 'Électronique analogique et numérique I-II',
    'skills.courses.microcontrollers': 'Microcontrôleurs',
    'skills.courses.designExperiments': 'Plan d’expériences',
    'skills.courses.numericalAnalysis': 'Analyse numérique et optimisation',
    'contact.title': 'Contact',
    'contact.lead':
      "Je suis ouvert à toute discussion de projet, opportunité ou collaboration. N'hésitez pas à me joindre via les canaux ci-dessous.",
    'contact.email': 'E-mail',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'footer.copy': '© 2025 Benjamin Bahurel. Tous droits réservés.',
  },
};

const langButtons = document.querySelectorAll('.lang-btn');

const applyLanguage = (lang) => {
  const dict = translations[lang];
  if (!dict) return;
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
  document.body.setAttribute('data-lang', lang);
  langButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('preferredLanguage', lang);
};

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.lang);
  });
});

const savedLang = localStorage.getItem('preferredLanguage') || 'en';
applyLanguage(savedLang);




