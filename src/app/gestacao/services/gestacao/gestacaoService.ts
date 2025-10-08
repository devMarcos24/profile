export const GestacaoService = () => ({
  post: async (startDate: string) => {
    try {
      const response = await fetch('/api/pregnancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ startDate }),
      });
      if (!response.ok) {
        throw new Error('Failed to create pregnancy record');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating pregnancy record:', error);
      throw error;
    }
  },
  get: async () => {
    try {
      const response = await fetch('/api/pregnancy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pregnancy record');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching pregnancy record:', error);
      throw error;
    }
  }
})