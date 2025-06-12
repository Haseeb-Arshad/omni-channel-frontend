'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api';

export default function ApiTestPage() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testApi = async () => {
      try {
        const api = new ApiClient();
        const response = await api.getProfile();
        
        if (response.success) {
          setProfile(response.data);
        } else {
          setError(response.error || 'Unknown error');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      
      {error ? (
        <div className="text-red-500">
          <p>Error fetching profile:</p>
          <pre>{error}</pre>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Profile Data:</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
