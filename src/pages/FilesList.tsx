import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { FileIcon } from 'lucide-react'
import { listFiles } from '@/services/files/list-files'
import { getFileDetails } from '@/services/files/get-file'

const FilesList = () => {
  const [files, setFiles] = useState<Array<{
    id: string
    filename: string
    originalName: string
    type: string
    url: string
    shareableLink: string
    createdAt: string
    views: number
  }> | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [loadingFileId, setLoadingFileId] = useState<string | null>(null)
  const toast = useToast()

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const { files } = await listFiles()
        setFiles(files)
      } catch (error) {
        toast.error({
          title: 'Error loading files',
          description: 'Could not fetch files. Please try again later.',
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFiles()
  }, [])

  const handleViewFile = async (fileId: string, shareableLink: string) => {
    try {
      setLoadingFileId(fileId)
      const { url } = await getFileDetails(shareableLink)

      const fullUrl = `${import.meta.env.VITE_API_URL}${url}`
      window.open(fullUrl, '_blank')
    } catch (error) {
      toast.error({
        title: 'Error fetching file details',
        description: 'Could not fetch file details. Please try again later.',
      })
    } finally {
      setLoadingFileId(null)
    }
  }
  if (isLoading) {
    return <div className="text-center py-8">Loading files...</div>
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">No files uploaded yet.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">My Files</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr
                  key={file.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center space-x-3">
                    <FileIcon className="w-5 h-5 text-indigo-500" />
                    <span>{file.filename}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(file.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {file.views || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleViewFile(file.id, file.shareableLink)
                      }
                      disabled={loadingFileId === file.id}
                      className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                    >
                      {loadingFileId === file.id ? 'Loading...' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FilesList
