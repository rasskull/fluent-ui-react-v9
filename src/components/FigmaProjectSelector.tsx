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
      // First, try to get the user profile for team info
      const userProfile = await figmaAPI.getUserProfile()
      console.log('User Profile Response:', userProfile)

      let teamId = null

      // Method 1: Direct teams property
      if (userProfile.teams && userProfile.teams.length > 0) {
        teamId = userProfile.teams[0].id
      }
      // Method 2: User ID based team (personal team format)
      else if (userProfile.id) {
        teamId = userProfile.id
      }
      // Method 3: Fallback - check for team_id field
      else if (userProfile.team_id) {
        teamId = userProfile.team_id
      }

      // If we still don't have a team ID, try getting teams directly
      if (!teamId) {
        console.log('No team ID found in user profile, trying to fetch teams...')
        try {
          const teamsResponse = await figmaAPI.getTeams()
          console.log('Teams Response:', teamsResponse)
          if (teamsResponse.teams && teamsResponse.teams.length > 0) {
            teamId = teamsResponse.teams[0].id
          }
        } catch (teamsErr) {
          console.warn('Failed to fetch teams via /teams endpoint:', teamsErr)
        }
      }

      if (!teamId) {
        console.warn('Available response fields:', Object.keys(userProfile))
        setError('Unable to determine team ID. This may indicate an API permission issue. Check the console for diagnostic information.')
        return
      }

      // Now try to load projects
      console.log('Loading projects for team:', teamId)
      try {
        const projectsResponse = await figmaAPI.getTeamProjects(teamId)
        console.log('Projects Response:', projectsResponse)

        if (projectsResponse.projects && projectsResponse.projects.length > 0) {
          setProjects(projectsResponse.projects)
          const firstProjectId = projectsResponse.projects[0].id
          setSelectedProjectId(firstProjectId)
          onProjectSelect?.(firstProjectId)
          return
        }
      } catch (projectsErr) {
        console.warn('Failed to fetch projects via /projects endpoint:', projectsErr)
      }

      // Fallback: Try getting team files directly
      console.log('Trying to get team files directly...')
      try {
        const filesResponse = await figmaAPI.getTeamFiles(teamId)
        console.log('Team Files Response:', filesResponse)
        setError('Loaded files directly. (Note: Project structure not available)')
      } catch (filesErr) {
        console.warn('Failed to fetch team files:', filesErr)
        setError('No projects found and unable to load team files. Verify your Figma API key has proper permissions.')
      }
    } catch (err: any) {
      console.error('Full error object:', err)
      console.error('Error response:', err.response?.data)
      console.error('Error message:', err.message)
      setError(err.response?.data?.message || err.message || 'Failed to load projects')
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
          <Text>
            If you already know your Figma project ID, you can enter it below instead of
            using the automatic lookup.
          </Text>
          <div className={styles.selectGroup}>
            <Text>Manual project ID:</Text>
            <input
              type="text"
              placeholder="Enter project ID"
              value={selectedProjectId}
              onChange={(e) => {
                const val = e.target.value
                setSelectedProjectId(val)
                onProjectSelect?.(val)
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </div>
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
