import { useState } from 'react'
import { Button, Card, Text, Title3, Input, Textarea, makeStyles } from '@fluentui/react-components'
import { Play24Regular, Add24Regular } from '@fluentui/react-icons'
import { figmaAPI } from '../services/figmaAPI'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  prototypeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  prototypeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    border: '1px solid #e1e1e1',
    borderRadius: '4px'
  }
})

interface Prototype {
  id: string
  name: string
  description: string
  fileKey: string
  createdAt: Date
}

interface FigmaPrototypesProps {
  fileKey?: string
}

export function FigmaPrototypes({ fileKey }: FigmaPrototypesProps) {
  const styles = useStyles()
  const [prototypes, setPrototypes] = useState<Prototype[]>([])
  const [newPrototype, setNewPrototype] = useState({
    name: '',
    description: '',
    fileKey: fileKey || ''
  })
  const [isCreating, setIsCreating] = useState(false)

  const handleCreatePrototype = async () => {
    if (!newPrototype.name.trim() || !newPrototype.fileKey.trim()) {
      return
    }

    setIsCreating(true)
    try {
      // In a real implementation, you would call Figma's API to create a prototype
      // For now, we'll simulate creating a prototype locally
      const prototype: Prototype = {
        id: Date.now().toString(),
        name: newPrototype.name,
        description: newPrototype.description,
        fileKey: newPrototype.fileKey,
        createdAt: new Date()
      }

      setPrototypes(prev => [...prev, prototype])
      setNewPrototype({ name: '', description: '', fileKey: fileKey || '' })

      // You could also create a comment in Figma to mark this as a prototype
      await figmaAPI.createComment(
        newPrototype.fileKey,
        `Prototype created: ${newPrototype.name}\n${newPrototype.description}`
      )
    } catch (error) {
      console.error('Failed to create prototype:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const openPrototypeInFigma = (prototype: Prototype) => {
    window.open(`https://www.figma.com/file/${prototype.fileKey}/?mode=dev`, '_blank')
  }

  const deletePrototype = (id: string) => {
    setPrototypes(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className={styles.container}>
      <Title3>Prototypes</Title3>

      <Card>
        <div className={styles.form}>
          <Title3>Create New Prototype</Title3>

          <div className={styles.inputGroup}>
            <Text>Prototype Name</Text>
            <Input
              value={newPrototype.name}
              onChange={(e) => setNewPrototype(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter prototype name"
            />
          </div>

          <div className={styles.inputGroup}>
            <Text>Description</Text>
            <Textarea
              value={newPrototype.description}
              onChange={(e) => setNewPrototype(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your prototype"
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <Text>Figma File Key</Text>
            <Input
              value={newPrototype.fileKey}
              onChange={(e) => setNewPrototype(prev => ({ ...prev, fileKey: e.target.value }))}
              placeholder="Enter Figma file key"
            />
          </div>

          <Button
            onClick={handleCreatePrototype}
            disabled={isCreating || !newPrototype.name.trim() || !newPrototype.fileKey.trim()}
            icon={<Add24Regular />}
            appearance="primary"
          >
            {isCreating ? 'Creating...' : 'Create Prototype'}
          </Button>
        </div>
      </Card>

      {prototypes.length > 0 && (
        <Card>
          <Title3>Your Prototypes</Title3>
          <div className={styles.prototypeList}>
            {prototypes.map((prototype) => (
              <div key={prototype.id} className={styles.prototypeItem}>
                <div>
                  <Text weight="semibold">{prototype.name}</Text>
                  <Text size={200} block>{prototype.description}</Text>
                  <Text size={200} block style={{ color: '#666' }}>
                    Created: {prototype.createdAt.toLocaleDateString()}
                  </Text>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    size="small"
                    icon={<Play24Regular />}
                    onClick={() => openPrototypeInFigma(prototype)}
                  >
                    Open in Figma
                  </Button>
                  <Button
                    size="small"
                    appearance="secondary"
                    onClick={() => deletePrototype(prototype.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}