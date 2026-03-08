import { useState } from 'react'
import { Card, FluentProvider, webLightTheme, Text, Title1, TabList, Tab } from '@fluentui/react-components'
import type { TabValue } from '@fluentui/react-components'
import { ArrowRight24Regular, Document24Regular, Color24Regular, Play24Regular, Add24Regular, DarkTheme24Regular, SlideContent24Regular } from '@fluentui/react-icons'
import { FigmaAuth } from './components/FigmaAuth'
import { FigmaProjectSelector } from './components/FigmaProjectSelector'
import { FigmaFiles } from './components/FigmaFiles'
import { FigmaTokens } from './components/FigmaTokens'
import { FigmaPrototypes } from './components/FigmaPrototypes'
import { figmaAPI } from './services/figmaAPI'
import type { FigmaFile } from './services/figmaAPI'

// examples page
import { ExampleComponents } from './examples/ExampleComponents'
import { DarkExampleComponents } from './examples/DarkExampleComponents'
import { CarouselExample } from './examples/CarouselExample'
import './App.css'

function App() {
  // look for ?project=<id> in URL
  const params = new URLSearchParams(window.location.search)
  const initialProject = params.get('project') || ''

  const [selectedTab, setSelectedTab] = useState<TabValue>(initialProject ? 'files' : 'auth')
  const [isAuthenticated, setIsAuthenticated] = useState(!!figmaAPI.getToken())
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProject)
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
    <FluentProvider theme={webLightTheme}>
      <div className="app-container">
        <Card>
          <div className="card-content">
            <Title1>🎉 Hello World!</Title1>
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
              <Tab value="examples" icon={<Add24Regular />}>
                Examples
              </Tab>
              <Tab value="dark-examples" icon={<DarkTheme24Regular />}>
                Dark Examples
              </Tab>
              <Tab value="carousel" icon={<SlideContent24Regular />}>
                Carousel
              </Tab>
            </TabList>

            <div style={{ marginTop: '1rem' }}>
              {selectedTab === 'auth' && (
                <FigmaAuth onAuthenticated={handleAuthenticated} />
              )}

              {isAuthenticated && selectedTab !== 'auth' && !selectedProjectId && (
                <FigmaProjectSelector onProjectSelect={setSelectedProjectId} />
              )}

              {selectedTab === 'files' && selectedProjectId && (
                <FigmaFiles projectId={selectedProjectId} onFileSelect={handleFileSelect} />
              )}

              {selectedTab === 'tokens' && selectedFile && (
                <FigmaTokens fileKey={selectedFile.key} />
              )}

              {selectedTab === 'prototypes' && (
                <FigmaPrototypes fileKey={selectedFile?.key} />
              )}

              {selectedTab === 'examples' && (
                <ExampleComponents />
              )}

              {selectedTab === 'dark-examples' && (
                <DarkExampleComponents />
              )}

              {selectedTab === 'carousel' && (
                <CarouselExample />
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
