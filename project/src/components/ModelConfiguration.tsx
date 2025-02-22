import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface ModelConfigurationProps {
  onComplete: () => void;
}

function ModelConfiguration({ onComplete }: ModelConfigurationProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [ensembleMethod, setEnsembleMethod] = useState<string>('voting');

  const models = [
    { id: 'rf', name: 'Random Forest', description: 'Bagging-based ensemble' },
    { id: 'xgb', name: 'XGBoost', description: 'Gradient boosting' },
    { id: 'lgbm', name: 'LightGBM', description: 'Light gradient boosting' },
    { id: 'cat', name: 'CatBoost', description: 'Categorical boosting' },
  ];

  const ensembleMethods = [
    { id: 'voting', name: 'Voting', description: 'Simple majority voting' },
    { id: 'stacking', name: 'Stacking', description: 'Meta-model approach' },
    { id: 'bagging', name: 'Bagging', description: 'Bootstrap aggregating' },
  ];

  const handleModelToggle = (modelId: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleStartTraining = () => {
    // In a real application, this would trigger the model training process
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Configure Ensemble
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Base Models
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {models.map((model) => (
            <div
              key={model.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedModels.includes(model.id)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => handleModelToggle(model.id)}
            >
              <h4 className="font-medium text-gray-900">{model.name}</h4>
              <p className="text-sm text-gray-500">{model.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Choose Ensemble Method
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {ensembleMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                ensembleMethod === method.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => setEnsembleMethod(method.id)}
            >
              <h4 className="font-medium text-gray-900">{method.name}</h4>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          onClick={handleStartTraining}
          disabled={selectedModels.length === 0}
        >
          <Play className="w-5 h-5 mr-2" />
          Start Training
        </button>
      </div>
    </div>
  );
}

export default ModelConfiguration;