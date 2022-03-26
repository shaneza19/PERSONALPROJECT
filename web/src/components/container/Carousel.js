import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import classes from "./Carousel.module.css";

export default function Carousel(props) {
  const handleOnDragStart = e => e.preventDefault() 
  
  return (
    <AliceCarousel mouseTracking={true} disableButtonsControls={true}>
      <img src={props.image_url1} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found" />
      <img src={props.image_url2} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
      <img src={props.image_url3} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
      <img src={props.image_url4} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
      <img src={props.image_url5} onDragStart={handleOnDragStart} className={classes.CarouselImage} alt="not found"/>
    </AliceCarousel>
  )
}