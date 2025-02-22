import React, { useState } from 'react';
import { Upload, BarChart2, Settings, Play, Database, Home } from 'lucide-react';
import DataUpload from './components/DataUpload';
import ModelConfiguration from './components/ModelConfiguration';
import Results from './components/Results';

type Step = 'upload' | 'configure' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [dataset, setDataset] = useState<File | null>(null);

  const steps = [
    { id: 'upload', label: 'Upload Dataset', icon: Upload },
    { id: 'configure', label: 'Configure Models', icon: Settings },
    { id: 'results', label: 'View Results', icon: BarChart2 },
  ];

  const handleDatasetUpload = (file: File) => {
    setDataset(file);
    setCurrentStep('configure');
  };

  const handleHomeClick = () => {
    setCurrentStep('upload');
    setDataset(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <DataUpload onUpload={handleDatasetUpload} />;
      case 'configure':
        return <ModelConfiguration onComplete={() => setCurrentStep('results')} />;
      case 'results':
        return <Results />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Automated Ensemble Techniques
              </h1>
            </div>
            <button
              onClick={handleHomeClick}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex justify-center">
            <ol className="flex items-center space-x-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.id} className="flex items-center">
                    {index > 0 && (
                      <div className="hidden sm:block h-0.5 w-12 bg-gray-200 -ml-8" />
                    )}
                    <div
                      className={`flex items-center ${
                        currentStep === step.id
                          ? 'text-indigo-600'
                          : 'text-gray-400'
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          currentStep === step.id
                            ? 'bg-indigo-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="ml-2 text-sm font-medium">
                        {step.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}

export default App;