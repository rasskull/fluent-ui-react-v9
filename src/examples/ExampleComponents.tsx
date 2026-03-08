import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Input,
  Text,
  Tooltip,
  makeStyles,
  Slider,
  RadioGroup,
  Radio,
  Switch,
  Spinner,
} from '@fluentui/react-components'
import {
  Add24Regular,
  Alert24Regular,
  Edit24Regular,
  Share24Regular,
} from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
})

export function ExampleComponents() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Text weight="semibold" size={400}>
        Avatar
      </Text>
      <Avatar name="Jane Doe" size={48} />

      <Divider />

      <Text weight="semibold" size={400}>
        Buttons
      </Text>
      <div className={styles.row}>
        <Button appearance="primary" icon={<Add24Regular />}>
          Primary
        </Button>
        <Button appearance="outline" icon={<Edit24Regular />}>
          Outline
        </Button>
        <Button appearance="subtle" icon={<Share24Regular />}>
          Subtle
        </Button>
        <Button appearance="transparent" icon={<Alert24Regular />}
          aria-label="alert"
        />
      </div>

      <Divider />

      <Text weight="semibold" size={400}>
        Form controls
      </Text>
      <div className={styles.row}>
        <Input placeholder="Type here" />
        <Checkbox label="Check me" />
        <Switch label="Toggle" />
        <RadioGroup aria-label="Options" defaultValue="a">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
        <Slider defaultValue={50} max={100} />
      </div>

      <Divider />
      <Text weight="semibold" size={400}>
        Tooltip example
      </Text>
      <div className={styles.row}>
        <Tooltip content="Helpful tip" relationship="label" withArrow>
          <Button appearance="outline">Hover me</Button>
        </Tooltip>
      </div>

      <Divider />
      <Text weight="semibold" size={400}>
        Loading
      </Text>
      <Spinner size="large" label="Loading..." />
    </div>
  )
}
