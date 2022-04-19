import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import classes from "./Carousel.module.css";

export default function Carousel(props) {
  const handleOnDragStart = e => e.preventDefault() 
  
  return (
    <AliceCarousel mouseTracking={true} disableButtonsControls={true}>
      <img src={props.image_1} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found" />
      <img src={props.image_2} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
      <img src={props.image_3} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
      <img src={props.image_4} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
      <img src={props.image_5} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
    </AliceCarousel>
  )
}