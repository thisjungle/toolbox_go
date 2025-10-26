export interface ClassificationResult {
  level: string;
  description: string;
  minWeekly: number;
  minHourly: number;
  keyDuties: string[];
  nextSteps: string;
}

export interface WizardAnswers {
  workerType: number;
  isNewEntrant: boolean;
  monthsExperience: number;
  qualificationLevel: number;
  hasSkillsTest: boolean;
  yearsExperience: number;
  moduleCount: number;
  canInterpretPlans: boolean;
  worksLimitedSupervision: boolean;
  hasTraining: boolean;
}

export function determineClassification(answers: WizardAnswers): ClassificationResult {
  const prefix = answers.workerType === 3 ? 'ECW' : 'CW';

  // New Entrant Path
  if (answers.isNewEntrant) {
    return handleNewEntrant(prefix, answers.monthsExperience, answers.hasTraining);
  }

  // Qualification-based classification
  switch (answers.qualificationLevel) {
    case 1: // No formal qualifications
      return handleNoQualifications(prefix, answers.hasSkillsTest, answers.yearsExperience);

    case 2: // Partial training
      return handlePartialTraining(
        prefix,
        answers.moduleCount,
        answers.canInterpretPlans,
        answers.worksLimitedSupervision
      );

    case 3: // Trade qualified
      return getLevel3(prefix);

    case 4: // Trade + 3 modules
      return getLevel4(prefix);

    case 5: // Trade + 6 modules
      return getLevel5(prefix);

    case 6: // Trade + 9+ modules
      return getLevel6(prefix);

    default:
      return getLevel1d(prefix);
  }
}

function handleNewEntrant(
  prefix: string,
  monthsExperience: number,
  hasTraining: boolean
): ClassificationResult {
  if (monthsExperience === 0) {
    return {
      level: `${prefix}/ECW 1 (Level a)`,
      description: 'New entrant - upon commencement in the industry',
      minWeekly: 967.50,
      minHourly: 25.46,
      keyDuties: [
        'Basic material handling functions',
        'Operate small plant and pneumatic machinery',
        'Use basic hand tools',
        'Assist tradespersons',
        'Work under general supervision',
      ],
      nextSteps:
        'After 3 months, the employee progresses to Level 1(b). Provide access to structured training for progression to Level 1(d).',
    };
  } else if (monthsExperience < 12) {
    return {
      level: `${prefix}/ECW 1 (Level b)`,
      description: 'New entrant - after 3 months in the industry',
      minWeekly: 967.50,
      minHourly: 25.46,
      keyDuties: [
        'Basic material handling functions',
        'Operate small plant and pneumatic machinery',
        'Use range of hand tools',
        'Assist tradespersons',
        'Developing construction process knowledge',
      ],
      nextSteps:
        'After 12 months total, the employee progresses to Level 1(c). Continue structured training to achieve Level 1(d).',
    };
  } else {
    if (hasTraining) {
      return getLevel1d(prefix);
    }
    return {
      level: `${prefix}/ECW 1 (Level c)`,
      description: 'New entrant - after 12 months in the industry',
      minWeekly: 967.50,
      minHourly: 25.46,
      keyDuties: [
        'Material handling',
        'Operate plant and machinery',
        'Use hand tools and basic equipment',
        'Assist tradespersons',
        'Understand construction process',
      ],
      nextSteps:
        'Complete structured training (Construction Skills Test or 16 modules) to progress to Level 1(d).',
    };
  }
}

function handleNoQualifications(
  prefix: string,
  hasSkillsTest: boolean,
  yearsExperience: number
): ClassificationResult {
  if (hasSkillsTest) {
    return getLevel1d(prefix);
  }

  if (yearsExperience < 1) {
    return {
      level: `${prefix}/ECW 1 (Level c)`,
      description: 'Experienced worker without formal qualifications (less than 1 year)',
      minWeekly: 967.50,
      minHourly: 25.46,
      keyDuties: [
        'Basic construction tasks',
        'Assisting tradespersons',
        'Operating basic equipment',
      ],
      nextSteps: 'Complete Construction Skills Test or structured training for Level 1(d).',
    };
  }

  return getLevel1d(prefix);
}

function handlePartialTraining(
  prefix: string,
  moduleCount: number,
  canInterpretPlans: boolean,
  worksLimitedSupervision: boolean
): ClassificationResult {
  if (moduleCount >= 20 && canInterpretPlans && worksLimitedSupervision) {
    return {
      level: `${prefix}/ECW 2`,
      description: 'Worker with intermediate skills under limited supervision',
      minWeekly: 1016.30,
      minHourly: 26.75,
      keyDuties: [
        'Interpret plans and drawings',
        'Calculate safe loads and stress factors',
        'Operate machinery requiring skill beyond Level 1',
        'Use measuring and leveling instruments',
        'Perform basic quality checks on others\' work',
        'May supervise Level 1 workers',
        'Work under limited supervision',
      ],
      nextSteps:
        'Progress to Level 3 by completing trade apprenticeship or Engineering Construction Industry Certificate Level 3 (24 modules).',
    };
  }

  return getLevel1d(prefix);
}

function getLevel1d(prefix: string): ClassificationResult {
  return {
    level: `${prefix}/ECW 1 (Level d)`,
    description: 'Worker with basic skills and training',
    minWeekly: 967.50,
    minHourly: 25.46,
    keyDuties: [
      'Use precision measuring instruments',
      'Operate small plant and pneumatic machinery',
      'Operate mobile equipment (forklifts, overhead cranes)',
      'Sheet metal soldering and tack welding',
      'Assist tradespersons',
      'Responsible for quality of own work under general supervision',
    ],
    nextSteps:
      'Progress to Level 2 by completing additional training (20 modules total) and demonstrating ability to work under limited supervision.',
  };
}

function getLevel3(prefix: string): ClassificationResult {
  return {
    level: `${prefix}/ECW 3`,
    description: 'Tradesperson - completed apprenticeship or equivalent',
    minWeekly: 1068.40,
    minHourly: 28.12,
    keyDuties: [
      'Trade skills associated with certificated trades',
      'Understand and apply quality control techniques',
      'Exercise discretion within scope of trade',
      'Inspect products/materials for conformity',
      'Assist in on-the-job training of others',
      'May supervise Level 1 and 2 workers',
      'Work under limited supervision',
    ],
    nextSteps:
      'Progress to Level 4 by completing 3 additional modules beyond trade training, plus demonstrating advanced trade skills and ability to plan construction sequencing.',
  };
}

function getLevel4(prefix: string): ClassificationResult {
  return {
    level: `${prefix}/ECW 4`,
    description: 'Engineering Construction Tradesperson Level II / Technician Level I',
    minWeekly: 1098.40,
    minHourly: 28.91,
    keyDuties: [
      'Exercise precision trade skills at higher level than Level 3',
      'Operate and maintain plant and machinery',
      'Plan construction sequencing',
      'Work under limited supervision',
      'Provide guidance and assistance to work team',
      'Implement quality control techniques',
    ],
    nextSteps:
      'Progress to Level 5 by completing 6 modules total beyond trade (3 more), plus demonstrating complex equipment operation and advanced planning skills.',
  };
}

function getLevel5(prefix: string): ClassificationResult {
  return {
    level: `${prefix}/ECW 5`,
    description: 'Special Class Engineering Construction Tradesperson Level I / Technician Level II',
    minWeekly: 1118.40,
    minHourly: 29.43,
    keyDuties: [
      'Exercise precision trade skills at higher level than Level 4',
      'Operate and maintain complex plant and machinery',
      'Plan complex construction sequencing',
      'Work on complex hydraulic/pneumatic systems',
      'Work on complex electrical/electronic circuitry',
      'Provide trades guidance and training assistance',
    ],
    nextSteps:
      'Progress to Level 6 by completing 9 modules total beyond trade (3 more), plus demonstrating high precision skills on complex systems.',
  };
}

function getLevel6(prefix: string): ClassificationResult {
  return {
    level: `${prefix}/ECW 6`,
    description: 'Special Class Engineering Construction Tradesperson Level II / Technician Level III',
    minWeekly: 1143.30,
    minHourly: 30.09,
    keyDuties: [
      'Operate plant and equipment at higher skill level than Level 5',
      'Exercise high precision trade skills',
      'Plan complex construction sequencing',
      'Work on complex mechanical, hydraulic, pneumatic systems',
      'Work on complex electrical/electronic control systems',
      'Apply advanced CNC techniques',
      'Provide training in conjunction with supervisors',
    ],
    nextSteps:
      'Progress to Level 7 by completing additional advanced training modules and demonstrating mastery of complex systems integration.',
  };
}
