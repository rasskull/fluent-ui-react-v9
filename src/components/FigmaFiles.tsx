import { useState, useEffect } from 'react'
import { Button, Card, Text, Title3, Image, makeStyles, Spinner } from '@fluentui/react-components'
import { Open24Regular, Document24Regular } from '@fluentui/react-icons'
import { figmaAPI } from '../services/figmaAPI'
import type { FigmaFile } from '../services/figmaAPI'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  },
  fileCard: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  fileImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px 4px 0 0'
  },
  fileInfo: {
    padding: '1rem'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  }
})

interface FigmaFilesProps {
  projectId?: string
  onFileSelect?: (file: FigmaFile) => void
}

export function FigmaFiles({ projectId, onFileSelect }: FigmaFilesProps) {
  const styles = useStyles()
  const [files, setFiles] = useState<FigmaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (projectId) {
      loadFiles()
    }
  }, [projectId])

  const loadFiles = async () => {
    if (!projectId) return

    setLoading(true)
    setError(null)

    try {
      const response = await figmaAPI.getProjectFiles(projectId)
      setFiles(response.files || [])
      if ((!response.files || response.files.length === 0) && response.status === 404) {
        // some versions return status on body
        throw new Error('Project not found')
      }
    } catch (err: any) {
      console.error('Error loading project files:', err)
      if (err.response?.status === 404) {
        setError('Project unavailable or inaccessible. Please verify the project ID and that your token has access.')
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to load files')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFileClick = (file: FigmaFile) => {
    onFileSelect?.(file)
  }

  const openInFigma = (fileKey: string) => {
    window.open(`https://www.figma.com/file/${fileKey}`, '_blank')
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="large" label="Loading Figma files..." />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <Text style={{ color: '#c42b1c' }}>Error: {error}</Text>
      </Card>
    )
  }

  return (
    <div className={styles.container}>
      <Title3>Figma Files</Title3>

      {files.length === 0 ? (
        <Card>
          <Text>No files found in this project.</Text>
        </Card>
      ) : (
        <div className={styles.fileGrid}>
          {files.map((file) => (
            <Card
              key={file.key}
              className={styles.fileCard}
              onClick={() => handleFileClick(file)}
            >
              <Image
                src={file.thumbnail_url}
                alt={file.name}
                className={styles.fileImage}
              />
              <div className={styles.fileInfo}>
                <Text weight="semibold" block>{file.name}</Text>
                <Text size={200} block>
                  Modified: {new Date(file.last_modified).toLocaleDateString()}
                </Text>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <Button
                    size="small"
                    icon={<Document24Regular />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFileClick(file)
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    icon={<Open24Regular />}
                    onClick={(e) => {
                      e.stopPropagation()
                      openInFigma(file.key)
                    }}
                  >
                    Open in Figma
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}