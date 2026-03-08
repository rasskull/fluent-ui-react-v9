import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import { ExampleComponents } from './ExampleComponents'

export function DarkExampleComponents() {
  return (
    <FluentProvider theme={webDarkTheme}>
      <ExampleComponents />
    </FluentProvider>
  )
}