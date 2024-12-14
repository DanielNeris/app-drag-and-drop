import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createFile } from '@/services/files/create-file'

const DragAndDrop = () => {
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    },
    multiple: false,
    onDrop: async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])

        await createFile(acceptedFiles[0])

        toast.success({ title: 'File uploaded successfully' })
      }
    },
    onDropRejected: () => {
      toast.error({
        title: 'Invalid file type. Please upload an image or video.',
      })
    },
  })

  const removeFile = () => {
    setFile(null)
    toast.info({ title: 'File removed' })
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            File Upload
          </h1>
          <p className="text-gray-600">
            Drag and drop your file here or click to browse
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            p-10 border-3 border-dashed rounded-xl text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragActive
                ? 'border-indigo-400 bg-indigo-50/50 scale-102'
                : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload
            className={`w-16 h-16 mx-auto mb-4 ${
              isDragActive ? 'text-indigo-500' : 'text-gray-400'
            }`}
          />
          {isDragActive ? (
            <p className="text-xl font-medium text-indigo-500">
              Drop your file here...
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xl font-medium text-gray-700">
                Drag & drop your file here
              </p>
              <p className="text-sm text-gray-500">
                Supports: Images and Videos (JPG, PNG, MP4, etc.)
              </p>
            </div>
          )}
        </div>

        {file && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Uploaded File
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FileIcon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DragAndDrop
