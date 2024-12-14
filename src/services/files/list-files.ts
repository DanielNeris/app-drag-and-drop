import httpClient from '@/services/httpClient'

export async function listFiles() {
  try {
    const response = await httpClient.get('/files', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    )
  }
}
