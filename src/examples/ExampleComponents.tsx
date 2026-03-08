import {
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardHeader,
  CardPreview,
  Checkbox,
  Combobox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Dropdown,
  Field,
  InfoButton,
  Input,
  Label,
  Link,
  makeStyles,
  MessageBar,
  MessageBarBody,
  Option,
  Persona,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  ProgressBar,
  Radio,
  RadioGroup,
  SearchBox,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tag,
  Text,
  Textarea,
  Toolbar,
  ToolbarButton,
  Tooltip,
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

      <Divider />
      <Text weight="semibold" size={400}>
        Badge and Tag
      </Text>
      <div className={styles.row}>
        <Badge appearance="filled" color="brand">Brand</Badge>
        <Badge appearance="outline" color="danger">Danger</Badge>
        <Tag>Default Tag</Tag>
        <Tag appearance="brand">Brand Tag</Tag>
      </div>

      <Divider />
      <Text weight="semibold" size={400}>
        Breadcrumb
      </Text>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/docs">Docs</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>

      <Divider />
      <Text weight="semibold" size={400}>
        Card
      </Text>
      <Card>
        <CardHeader header={<Text weight="semibold">Card Title</Text>} />
        <CardPreview>
          <div style={{ height: '100px', background: '#f3f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Card Preview</Text>
          </div>
        </CardPreview>
      </Card>

      <Divider />
      <Text weight="semibold" size={400}>
        Combobox and Select
      </Text>
      <div className={styles.row}>
        <Combobox placeholder="Select an option">
          <Option>Option 1</Option>
          <Option>Option 2</Option>
          <Option>Option 3</Option>
        </Combobox>
        <Select>
          <Option>Option A</Option>
          <Option>Option B</Option>
        </Select>
      </div>

      <Divider />
      <Text weight="semibold" size={400}>
        Dialog
      </Text>
      <Dialog>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>This is the dialog content.</DialogContent>
            <DialogActions>
              <Button appearance="secondary">Close</Button>
              <Button appearance="primary">Save</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Divider />
      <Text weight="semibold" size={400}>
        Drawer
      </Text>
      <Drawer>
        <DialogTrigger>
          <Button>Open Drawer</Button>
        </DialogTrigger>
        <DialogSurface>
          <DrawerHeader>
            <DrawerHeaderTitle>Drawer Title</DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>This is the drawer content.</DrawerBody>
        </DialogSurface>
      </Drawer>

      <Divider />
      <Text weight="semibold" size={400}>
        Dropdown
      </Text>
      <Dropdown placeholder="Select">
        <Option>Option 1</Option>
        <Option>Option 2</Option>
      </Dropdown>

      <Divider />
      <Text weight="semibold" size={400}>
        Field and Label
      </Text>
      <div className={styles.row}>
        <Field label="Field Label">
          <Input placeholder="Input" />
        </Field>
        <Label>Standalone Label</Label>
        <InfoButton info="This is additional information" />
      </div>

      <Divider />
      <Text weight="semibold" size={400}>
        Link
      </Text>
      <Link href="#">This is a link</Link>

      <Divider />
      <Text weight="semibold" size={400}>
        MessageBar
      </Text>
      <MessageBar>
        <MessageBarBody>This is a message</MessageBarBody>
      </MessageBar>

      <Divider />
      <Text weight="semibold" size={400}>
        Persona
      </Text>
      <Persona name="John Doe" secondaryText="Software Engineer" />

      <Divider />
      <Text weight="semibold" size={400}>
        Popover
      </Text>
      <Popover>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverSurface>This is popover content</PopoverSurface>
      </Popover>

      <Divider />
      <Text weight="semibold" size={400}>
        ProgressBar
      </Text>
      <ProgressBar value={0.7} />

      <Divider />
      <Text weight="semibold" size={400}>
        SearchBox
      </Text>
      <SearchBox placeholder="Search" />

      <Divider />
      <Text weight="semibold" size={400}>
        Skeleton
      </Text>
      <Skeleton />

      <Divider />
      <Text weight="semibold" size={400}>
        Table
      </Text>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Column 1</TableHeaderCell>
            <TableHeaderCell>Column 2</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider />
      <Text weight="semibold" size={400}>
        Textarea
      </Text>
      <Textarea placeholder="Type here" />

      <Divider />
      <Text weight="semibold" size={400}>
        Toolbar
      </Text>
      <Toolbar>
        <ToolbarButton icon={<Add24Regular />} />
        <ToolbarButton icon={<Edit24Regular />} />
        <ToolbarButton icon={<Share24Regular />} />
      </Toolbar>
    </div>
  )
}
