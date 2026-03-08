import {
  Carousel,
  CarouselCard,
  CarouselButton,
  CarouselSlider,
  CarouselViewport,
  Image,
  Text,
  makeStyles,
} from '@fluentui/react-components'
import { tokens } from '@fluentui/tokens'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',
  },
  carouselContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  cardContent: {
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusMedium,
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'center',
    marginTop: tokens.spacingVerticalM,
  }
})

const carouselData = [
  {
    id: 1,
    title: 'Beautiful Landscape',
    description: 'A stunning mountain landscape at sunset',
    image: 'https://picsum.photos/400/200?random=1',
  },
  {
    id: 2,
    title: 'Urban Architecture',
    description: 'Modern city skyline with contemporary buildings',
    image: 'https://picsum.photos/400/200?random=2',
  },
  {
    id: 3,
    title: 'Nature Close-up',
    description: 'Detailed view of natural textures and patterns',
    image: 'https://picsum.photos/400/200?random=3',
  },
  {
    id: 4,
    title: 'Abstract Art',
    description: 'Colorful abstract composition with geometric shapes',
    image: 'https://picsum.photos/400/200?random=4',
  },
  {
    id: 5,
    title: 'Minimalist Design',
    description: 'Clean and simple design with focus on essentials',
    image: 'https://picsum.photos/400/200?random=5',
  },
]

export function CarouselExample() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Text weight="semibold" size={400}>
        Fluent UI Carousel Example
      </Text>

      <div className={styles.carouselContainer}>
        <Carousel defaultValue="item-1">
          <CarouselViewport>
            <CarouselSlider>
              {carouselData.map((item) => (
                <CarouselCard key={item.id} id={`item-${item.id}`}>
                  <div className={styles.cardContent}>
                    <div className={styles.imageContainer}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fit="cover"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <Text weight="semibold" size={300}>
                      {item.title}
                    </Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                      {item.description}
                    </Text>
                  </div>
                </CarouselCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>

          <div className={styles.controls}>
            <CarouselButton navType="prev" />
            <CarouselButton navType="next" />
          </div>
        </Carousel>
      </div>

      <Text size={200} style={{ color: tokens.colorNeutralForeground2, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        This carousel example demonstrates Fluent UI's Carousel components with navigation controls,
        multiple slides, and responsive design. Use the arrow buttons or navigation dots to browse through the images.
      </Text>
    </div>
  )
}