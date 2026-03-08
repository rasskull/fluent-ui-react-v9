import { useState } from 'react'
import { Card, FluentProvider, teamsLightTheme, Text, Title1, TabList, Tab } from '@fluentui/react-components'
import type { TabValue } from '@fluentui/react-components'
import { ArrowRight24Regular, Document24Regular, Color24Regular, Play24Regular } from '@fluentui/react-icons'
import { FigmaAuth } from './components/FigmaAuth'
import { FigmaFiles } from './components/FigmaFiles'
import { FigmaTokens } from './components/FigmaTokens'
import { FigmaPrototypes } from './components/FigmaPrototypes'
import { figmaAPI } from './services/figmaAPI'
import type { FigmaFile } from './services/figmaAPI'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState<TabValue>('auth')
  const [isAuthenticated, setIsAuthenticated] = useState(!!figmaAPI.getToken())
  const [selectedFile, setSelectedFile] = useState<FigmaFile | null>(null)

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    setSelectedTab('files')
  }

  const handleFileSelect = (file: FigmaFile) => {
    setSelectedFile(file)
    setSelectedTab('tokens')
  }

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className="app-container">
        <Card>
          <div className="card-content">
            <Title1>Fluent UI + Figma Integration</Title1>
            <Text>
              Connect to Figma, access your design files, extract design tokens, and create prototypes.
            </Text>

            <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value)}>
              <Tab value="auth" icon={<ArrowRight24Regular />}>
                Authentication
              </Tab>
              <Tab value="files" icon={<Document24Regular />} disabled={!isAuthenticated}>
                Files
              </Tab>
              <Tab value="tokens" icon={<Color24Regular />} disabled={!isAuthenticated || !selectedFile}>
                Design Tokens
              </Tab>
              <Tab value="prototypes" icon={<Play24Regular />} disabled={!isAuthenticated}>
                Prototypes
              </Tab>
            </TabList>

            <div style={{ marginTop: '1rem' }}>
              {selectedTab === 'auth' && (
                <FigmaAuth onAuthenticated={handleAuthenticated} />
              )}

              {selectedTab === 'files' && (
                <FigmaFiles onFileSelect={handleFileSelect} />
              )}

              {selectedTab === 'tokens' && selectedFile && (
                <FigmaTokens fileKey={selectedFile.key} />
              )}

              {selectedTab === 'prototypes' && (
                <FigmaPrototypes fileKey={selectedFile?.key} />
              )}
            </div>

            {selectedFile && (
              <Card style={{ marginTop: '1rem' }}>
                <Text weight="semibold">Selected File: {selectedFile.name}</Text>
                <Text size={200}>Key: {selectedFile.key}</Text>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </FluentProvider>
  )
}

export default App
