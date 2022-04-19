import classes from "./RealEstateCard.module.css";

function RealEstateCard(props) {
  return (
    <div className={classes.card}>
      <img src={props.image_1} alt={props.title} />
      <div className={classes.container}>
        <h6 className={classes.title}>{props.product_title.substring(0, 30)}</h6>
        <h6>{props.province}</h6>
        <button className={classes.button}>{props.category}</button>
        <button className={classes.button2}>{props.type}</button>
        <h6>
          {props.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          &nbsp;บาท
        </h6>
      </div>
    </div>
  );
}

export default RealEstateCard;
