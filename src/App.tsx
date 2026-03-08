import { useState } from 'react'
import { Button, Card, FluentProvider, teamsLightTheme, Text, Title1 } from '@fluentui/react-components'
import { ArrowRight24Regular } from '@fluentui/react-icons'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className="app-container">
        <Card>
          <div className="card-content">
            <Title1>Welcome to Fluent UI React v9</Title1>
            <Text>
              This is a modern React development environment with Microsoft's Fluent UI components.
            </Text>
            
            <div className="demo-section">
              <h2>Counter Demo</h2>
              <Button
                onClick={() => setCount((count) => count + 1)}
                appearance="primary"
                icon={<ArrowRight24Regular />}
              >
                Count: {count}
              </Button>
            </div>

            <div className="demo-section">
              <h2>Features</h2>
              <ul>
                <li>⚡ Vite for fast development</li>
                <li>🎨 Fluent UI React v9 components</li>
                <li>📘 TypeScript support</li>
                <li>🚀 Hot Module Reload (HMR)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </FluentProvider>
  )
}

export default App
