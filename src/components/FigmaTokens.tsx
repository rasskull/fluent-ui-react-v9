import { useState, useEffect } from 'react'
import { Button, Card, Text, Title3, makeStyles, Spinner, Textarea } from '@fluentui/react-components'
import { ArrowDownload24Regular, Copy24Regular } from '@fluentui/react-icons'
import { figmaAPI } from '../services/figmaAPI'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  tokenSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  tokenCode: {
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap',
    maxHeight: '400px',
    overflow: 'auto'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  }
})

interface FigmaTokensProps {
  fileKey: string
}

export function FigmaTokens({ fileKey }: FigmaTokensProps) {
  const styles = useStyles()
  const [tokens, setTokens] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (fileKey) {
      loadFileData()
    }
  }, [fileKey])

  const loadFileData = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await figmaAPI.getFile(fileKey)
      const extractedTokens = figmaAPI.extractDesignTokens(data)
      setTokens(extractedTokens)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load file data')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const downloadTokens = () => {
    if (!tokens) return

    const dataStr = JSON.stringify(tokens, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

    const exportFileDefaultName = `figma-tokens-${fileKey}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const generateCSSTokens = () => {
    if (!tokens) return ''

    let css = ':root {\n'

    // Colors
    Object.entries(tokens.colors).forEach(([key, style]: [string, any]) => {
      if (style.fills && style.fills[0]) {
        const fill = style.fills[0]
        if (fill.type === 'SOLID') {
          const { r, g, b } = fill.color
          const alpha = fill.color.a || 1
          const color = alpha < 1
            ? `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`
            : `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
          css += `  --${key.toLowerCase().replace(/\s+/g, '-')}: ${color};\n`
        }
      }
    })

    css += '}\n'
    return css
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="large" label="Loading design tokens..." />
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

  if (!tokens) {
    return (
      <Card>
        <Text>No tokens available. Select a Figma file to extract design tokens.</Text>
      </Card>
    )
  }

  const cssTokens = generateCSSTokens()
  const jsonTokens = JSON.stringify(tokens, null, 2)

  return (
    <div className={styles.container}>
      <Title3>Design Tokens</Title3>

      <div className={styles.actions}>
        <Button
          icon={<ArrowDownload24Regular />}
          onClick={downloadTokens}
        >
          Download JSON
        </Button>
        <Button
          icon={<Copy24Regular />}
          onClick={() => copyToClipboard(jsonTokens)}
        >
          Copy JSON
        </Button>
        <Button
          icon={<Copy24Regular />}
          onClick={() => copyToClipboard(cssTokens)}
        >
          Copy CSS
        </Button>
      </div>

      <Card>
        <div className={styles.tokenSection}>
          <Text weight="semibold">CSS Variables</Text>
          <div className={styles.tokenCode}>
            {cssTokens}
          </div>
        </div>
      </Card>

      <Card>
        <div className={styles.tokenSection}>
          <Text weight="semibold">JSON Tokens</Text>
          <Textarea
            value={jsonTokens}
            readOnly
            style={{
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              minHeight: '300px',
              resize: 'vertical'
            }}
          />
        </div>
      </Card>
    </div>
  )
}