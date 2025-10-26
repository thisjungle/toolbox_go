'use client';

import { useState } from 'react';
import ClassificationWizard from '@/components/ClassificationWizard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              CW/ECW Worker Classification Wizard
            </h1>
            <p className="text-lg text-gray-600">
              Building and Construction General On-site Award [MA000020]
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>CW</strong> = Construction Worker (General Building & Civil Construction)<br />
                  <strong>ECW</strong> = Engineering Construction Worker
                </p>
              </div>
            </div>
          </div>

          <ClassificationWizard />
        </div>

        <footer className="text-center text-gray-600 text-sm">
          <p className="mb-2">
            This tool provides guidance only. For specific situations, consult the full award or seek professional advice.
          </p>
          <p>
            Based on Building and Construction General On-site Award [MA000020] | Rates effective July 1, 2025
          </p>
        </footer>
      </div>
    </main>
  );
}
