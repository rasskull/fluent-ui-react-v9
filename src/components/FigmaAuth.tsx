import { useState } from 'react'
import { Button, Card, Input, Text, Title3, makeStyles } from '@fluentui/react-components'
import { Key24Regular, Checkmark24Regular } from '@fluentui/react-icons'
import { figmaAPI } from '../services/figmaAPI'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  tokenInput: {
    fontFamily: 'monospace'
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '4px'
  },
  success: {
    backgroundColor: '#e6f7e6',
    color: '#0b7a0b'
  },
  error: {
    backgroundColor: '#ffe6e6',
    color: '#c42b1c'
  }
})

interface FigmaAuthProps {
  onAuthenticated?: () => void
}

export function FigmaAuth({ onAuthenticated }: FigmaAuthProps) {
  const styles = useStyles()
  const [token, setToken] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authStatus, setAuthStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAuthenticate = async () => {
    if (!token.trim()) {
      setAuthStatus('error')
      setErrorMessage('Please enter a Figma access token')
      return
    }

    setIsAuthenticating(true)
    setAuthStatus('idle')
    setErrorMessage('')

    try {
      figmaAPI.setToken(token.trim())
      await figmaAPI.getUserProfile()
      setAuthStatus('success')
      onAuthenticated?.()
    } catch (error: any) {
      setAuthStatus('error')
      setErrorMessage(error.response?.data?.message || 'Authentication failed')
      figmaAPI.clearToken()
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleClearToken = () => {
    figmaAPI.clearToken()
    setToken('')
    setAuthStatus('idle')
    setErrorMessage('')
  }

  return (
    <Card>
      <div className={styles.container}>
        <Title3>Figma Authentication</Title3>
        <Text>
          Enter your Figma access token to connect to the Figma API.
          You can get a token from your Figma account settings.
        </Text>

        <div className={styles.inputGroup}>
          <Input
            type="password"
            placeholder="figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className={styles.tokenInput}
            contentBefore={<Key24Regular />}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            onClick={handleAuthenticate}
            disabled={isAuthenticating}
            appearance="primary"
          >
            {isAuthenticating ? 'Authenticating...' : 'Authenticate'}
          </Button>

          <Button
            onClick={handleClearToken}
            appearance="secondary"
          >
            Clear Token
          </Button>
        </div>

        {authStatus === 'success' && (
          <div className={`${styles.status} ${styles.success}`}>
            <Checkmark24Regular />
            <Text>Successfully authenticated with Figma!</Text>
          </div>
        )}

        {authStatus === 'error' && (
          <div className={`${styles.status} ${styles.error}`}>
            <Text>{errorMessage}</Text>
          </div>
        )}
      </div>
    </Card>
  )
}