import { useState, useEffect } from 'react'
import { Button, Card, Text, Title3, makeStyles, Spinner } from '@fluentui/react-components'
import { figmaAPI } from '../services/figmaAPI'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem'
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
})

interface Project {
  id: string
  name: string
}

interface FigmaProjectSelectorProps {
  onProjectSelect?: (projectId: string) => void
}

export function FigmaProjectSelector({ onProjectSelect }: FigmaProjectSelectorProps) {
  const styles = useStyles()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const userProfile = await figmaAPI.getUserProfile()
      // Get the first team's projects (users typically have a personal team)
      if (userProfile.teams && userProfile.teams.length > 0) {
        const teamId = userProfile.teams[0].id
        const projectsResponse = await figmaAPI.getTeamProjects(teamId)
        setProjects(projectsResponse.projects || [])
        
        // Auto-select first project
        if (projectsResponse.projects && projectsResponse.projects.length > 0) {
          const firstProjectId = projectsResponse.projects[0].id
          setSelectedProjectId(firstProjectId)
          onProjectSelect?.(firstProjectId)
        }
      } else {
        setError('No teams found in your Figma account')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load projects')
      console.error('Project loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value
    setSelectedProjectId(projectId)
    onProjectSelect?.(projectId)
  }

  if (loading) {
    return (
      <Card>
        <div className={styles.loading}>
          <Spinner size="small" />
          <Text>Loading your Figma projects...</Text>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <div className={styles.container}>
          <Text style={{ color: '#c42b1c' }}>Error: {error}</Text>
          <Button onClick={loadProjects}>Retry</Button>
        </div>
      </Card>
    )
  }

  if (projects.length === 0) {
    return (
      <Card>
        <Text>No projects found. Create a project in Figma first!</Text>
      </Card>
    )
  }

  return (
    <Card>
      <div className={styles.container}>
        <Title3>Select a Figma Project</Title3>
        <div className={styles.selectGroup}>
          <Text>Choose a project to view its files:</Text>
          <select
            value={selectedProjectId}
            onChange={handleProjectChange}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  )
}
