import React, {useState} from 'react'
import {Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem} from 'reactstrap'
import './admin-dashboard-component.css'

const items = [
  {
    src: 'https://wallpaperaccess.com/full/87270.jpg',
    altText: 'img',
    captionText: 'Start Your Learning Journey Today!',
    captionHeader: 'Welcome to iLearn',
    width: '100%',
    height: '850px'
  },
  {
    src: 'https://tojay.net/wp-content/uploads/2020/03/girl-with-computer-during-fall-495908462-5b71a54dc9e77c0082db32f8.jpg',
    altText: 'img',
    captionText: 'Start Your Learning Journey Today!',
    captionHeader: 'Welcome to iLearn',
    width: '100%',
    height: '850px'
  },
  {
    src: 'https://i.pinimg.com/originals/bf/15/e7/bf15e7df4c8b66d53f7076ddbf866e39.jpg',
    altText: 'img',
    captionText: 'Start Your Learning Journey Today!',
    captionHeader: 'Welcome to iLearn',
    width: '100%',
    height: '850px'
  }
]

const AdminDashboardComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) {
      return
    }
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) {
      return
    }
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) {
      return
    }
    setActiveIndex(newIndex)
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={item.src}>
        <img src={item.src}
             alt={item.altText}
             width={item.width}
             height={item.height}/>
        <CarouselCaption captionHeader={item.captionHeader}
                         captionText={item.captionText}/>
      </CarouselItem>
    )
  })

  return (
    <div>
      <Carousel activeIndex={activeIndex}
                next={next}
                previous={previous}>
        <CarouselIndicators items={items}
                            activeIndex={activeIndex}
                            onClickHandler={goToIndex}/>
        {slides}
        <CarouselControl direction='prev'
                         directionText='Previous'
                         onClickHandler={previous}/>
        <CarouselControl direction='next'
                         directionText='Next'
                         onClickHandler={next}/>
      </Carousel>
    </div>
  )
}

export default AdminDashboardComponent
