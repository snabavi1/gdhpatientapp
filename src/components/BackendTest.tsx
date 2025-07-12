import React, { useState } from 'react';

const BackendTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // Test your backend health endpoint
      const response = await fetch('http://localhost:3000/health');
      const data = await response.json();
      setResult(`✅ Backend connected! Status: ${data.data?.status}`);
    } catch (error) {
      setResult(`❌ Backend not connected: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Backend Connection Test</h3>
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Testing...' : 'Test Backend'}
      </button>
      {result && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
          {result}
        </div>
      )}
    </div>
  );
};

export default BackendTest;