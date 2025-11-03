'use client';

import { useState } from 'react';
import { determineClassification, ClassificationResult } from '@/lib/classificationLogic';

export default function ClassificationWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    workerType: 0,
    isNewEntrant: false,
    monthsExperience: 0,
    qualificationLevel: 0,
    hasSkillsTest: false,
    yearsExperience: 0,
    moduleCount: 0,
    canInterpretPlans: false,
    worksLimitedSupervision: false,
    hasTraining: false,
  });
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleWorkerType = (type: number) => {
    setAnswers({ ...answers, workerType: type });
    setStep(2);
  };

  const handleNewEntrant = (isNew: boolean) => {
    setAnswers({ ...answers, isNewEntrant: isNew });
    if (isNew) {
      setStep(10); // Go to months experience
    } else {
      setStep(3); // Go to qualifications
    }
  };

  const handleQualificationLevel = (level: number) => {
    setAnswers({ ...answers, qualificationLevel: level });

    if (level === 1) {
      setStep(4); // No quals path
    } else if (level === 2) {
      setStep(5); // Partial training path
    } else if (level === 3) {
      // Trade qualified - show result
      const result = determineClassification({ ...answers, qualificationLevel: level });
      setResult(result);
      setStep(100);
    } else if (level >= 4) {
      // Post-trade - show result
      const result = determineClassification({ ...answers, qualificationLevel: level });
      setResult(result);
      setStep(100);
    }
  };

  const handleMonthsExperience = (months: number) => {
    const updatedAnswers = { ...answers, monthsExperience: months };
    setAnswers(updatedAnswers);

    if (months >= 12) {
      setStep(11); // Ask about training
    } else {
      // Show result for new entrant
      const result = determineClassification(updatedAnswers);
      setResult(result);
      setStep(100);
    }
  };

  const handleHasTraining = (hasTraining: boolean) => {
    const updatedAnswers = { ...answers, hasTraining };
    setAnswers(updatedAnswers);
    const result = determineClassification(updatedAnswers);
    setResult(result);
    setStep(100);
  };

  const handleSkillsTest = (hasTest: boolean) => {
    const updatedAnswers = { ...answers, hasSkillsTest: hasTest };
    setAnswers(updatedAnswers);

    if (hasTest) {
      const result = determineClassification(updatedAnswers);
      setResult(result);
      setStep(100);
    } else {
      setStep(6); // Ask years experience
    }
  };

  const handleYearsExperience = (years: number) => {
    const updatedAnswers = { ...answers, yearsExperience: years };
    setAnswers(updatedAnswers);
    const result = determineClassification(updatedAnswers);
    setResult(result);
    setStep(100);
  };

  const handleModuleCount = (count: number) => {
    setAnswers({ ...answers, moduleCount: count });
    if (count >= 20) {
      setStep(7); // Ask additional questions for Level 2
    } else {
      const result = determineClassification({ ...answers, moduleCount: count });
      setResult(result);
      setStep(100);
    }
  };

  const handleLevel2Questions = (canInterpret: boolean, limitedSupervision: boolean) => {
    const updatedAnswers = {
      ...answers,
      canInterpretPlans: canInterpret,
      worksLimitedSupervision: limitedSupervision
    };
    setAnswers(updatedAnswers);
    const result = determineClassification(updatedAnswers);
    setResult(result);
    setStep(100);
  };

  const resetWizard = () => {
    setStep(1);
    setAnswers({
      workerType: 0,
      isNewEntrant: false,
      monthsExperience: 0,
      qualificationLevel: 0,
      hasSkillsTest: false,
      yearsExperience: 0,
      moduleCount: 0,
      canInterpretPlans: false,
      worksLimitedSupervision: false,
      hasTraining: false,
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Worker Type */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Step 1: Worker Type
            </h2>
            <p className="text-gray-700 mb-4">
              What type of work will the employee primarily perform?
            </p>
          </div>

          <div className="grid gap-3">
            <button
              onClick={() => handleWorkerType(1)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold text-gray-900">General building and construction</div>
              <div className="text-sm text-gray-600">Carpentry, bricklaying, concreting, etc.</div>
            </button>

            <button
              onClick={() => handleWorkerType(2)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold text-gray-900">Civil construction</div>
              <div className="text-sm text-gray-600">Earthmoving, plant operation, road construction</div>
            </button>

            <button
              onClick={() => handleWorkerType(3)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold text-gray-900">Engineering construction</div>
              <div className="text-sm text-gray-600">Electrical, mechanical, fabrication</div>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Industry Experience */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Step 2: Industry Experience
            </h2>
            <p className="text-gray-700 mb-4">
              Is this person NEW to the on-site building/construction industry?
            </p>
            <p className="text-sm text-gray-600">
              (No previous work in construction, no portable long service leave, no industry super)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleNewEntrant(true)}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition font-semibold"
            >
              Yes - New to Industry
            </button>

            <button
              onClick={() => handleNewEntrant(false)}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition font-semibold"
            >
              No - Has Experience
            </button>
          </div>

          <button
            onClick={() => setStep(1)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3: Qualifications */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Step 3: Qualifications & Training
            </h2>
            <p className="text-gray-700 mb-4">
              What is the highest relevant qualification/training the employee has?
            </p>
          </div>

          <div className="grid gap-3">
            <button
              onClick={() => handleQualificationLevel(1)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold">No formal construction qualifications</div>
            </button>

            <button
              onClick={() => handleQualificationLevel(2)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold">Some structured training or modules (less than full trade)</div>
            </button>

            <button
              onClick={() => handleQualificationLevel(3)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold">Completed trade apprenticeship or equivalent trade certificate</div>
            </button>

            <button
              onClick={() => handleQualificationLevel(4)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold">Trade qualification PLUS 3 additional modules</div>
            </button>

            <button
              onClick={() => handleQualificationLevel(5)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold">Trade qualification PLUS 6 additional modules</div>
            </button>

            <button
              onClick={() => handleQualificationLevel(6)}
              className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold">Trade qualification PLUS 9+ modules</div>
            </button>
          </div>

          <button
            onClick={() => setStep(2)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 4: No Qualifications - Skills Test */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Skills Verification
            </h2>
            <p className="text-gray-700 mb-4">
              Has the employee completed a Construction Skills Test or 16 appropriate training modules?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSkillsTest(true)}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition font-semibold"
            >
              Yes
            </button>

            <button
              onClick={() => handleSkillsTest(false)}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition font-semibold"
            >
              No
            </button>
          </div>

          <button
            onClick={() => setStep(3)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 5: Partial Training - Module Count */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Training Modules
            </h2>
            <p className="text-gray-700 mb-4">
              How many training modules has the employee completed?
            </p>
          </div>

          <input
            type="number"
            min="1"
            max="24"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="Enter number of modules (1-24)"
            onChange={(e) => handleModuleCount(parseInt(e.target.value) || 0)}
          />

          <button
            onClick={() => setStep(3)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 6: Years of Experience */}
      {step === 6 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Industry Experience
            </h2>
            <p className="text-gray-700 mb-4">
              How many years of industry experience does the employee have?
            </p>
          </div>

          <input
            type="number"
            min="0"
            max="50"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="Enter years of experience"
            onChange={(e) => handleYearsExperience(parseInt(e.target.value) || 0)}
          />

          <button
            onClick={() => setStep(4)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 7: Level 2 Additional Questions */}
      {step === 7 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Skills Assessment
            </h2>
            <p className="text-gray-700 mb-4">
              Please answer the following questions:
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Can the employee interpret plans and drawings?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    const canInterpret = true;
                    setAnswers({ ...answers, canInterpretPlans: canInterpret });
                  }}
                  className={`p-3 border-2 rounded-lg transition ${
                    answers.canInterpretPlans
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setAnswers({ ...answers, canInterpretPlans: false });
                  }}
                  className={`p-3 border-2 rounded-lg transition ${
                    !answers.canInterpretPlans
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-500'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Will the employee work under limited supervision (not constant oversight)?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    const limitedSupervision = true;
                    handleLevel2Questions(answers.canInterpretPlans, limitedSupervision);
                  }}
                  className="p-3 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    const limitedSupervision = false;
                    handleLevel2Questions(answers.canInterpretPlans, limitedSupervision);
                  }}
                  className="p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition"
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(5)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 10: New Entrant - Months Experience */}
      {step === 10 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Time in Industry
            </h2>
            <p className="text-gray-700 mb-4">
              How many months will this employee have worked in the industry at the time you're classifying them?
            </p>
          </div>

          <input
            type="number"
            min="0"
            max="100"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="Enter months (0-12+)"
            onChange={(e) => handleMonthsExperience(parseInt(e.target.value) || 0)}
          />

          <button
            onClick={() => setStep(2)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 11: New Entrant 12+ months - Training */}
      {step === 11 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Training Completion
            </h2>
            <p className="text-gray-700 mb-4">
              Has the employee completed structured training equivalent to Construction Skills Test or 16 appropriate modules?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleHasTraining(true)}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition font-semibold"
            >
              Yes
            </button>

            <button
              onClick={() => handleHasTraining(false)}
              className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition font-semibold"
            >
              No
            </button>
          </div>

          <button
            onClick={() => setStep(10)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 100: Result */}
      {step === 100 && result && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Classification Result
            </h2>
            <div className="text-3xl font-bold text-green-700">
              {result.level}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
            <p className="text-gray-700">{result.description}</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Minimum Rates (as of July 1, 2025):</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Weekly Rate</div>
                <div className="text-2xl font-bold text-blue-700">${result.minWeekly.toFixed(2)}</div>
                <div className="text-xs text-gray-500">per week</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Hourly Rate</div>
                <div className="text-2xl font-bold text-blue-700">${result.minHourly.toFixed(2)}</div>
                <div className="text-xs text-gray-500">per hour</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-300">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important: Add Industry Allowance
            </h3>
            <p className="text-sm text-gray-700">
              • General building/Civil/Engineering construction: <strong>+$64.10/week</strong><br />
              • Residential building: <strong>+$51.28/week</strong>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Key Duties at This Level:</h3>
            <ul className="space-y-2">
              {result.keyDuties.map((duty, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Next Steps for Progression:</h3>
            <p className="text-gray-700">{result.nextSteps}</p>
          </div>

          <button
            onClick={resetWizard}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Start New Classification
          </button>
        </div>
      )}
    </div>
  );
}
