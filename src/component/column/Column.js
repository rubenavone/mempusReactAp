import React from "react";
import Card from "./card/Card";

const Column = (props) => {
  return (
    <section className="col">
      <div className="d-flex align-items-start">
        <button onClick={props.onClickAddCard} className="btn btn-success mr-2">
          +
        </button>
        <h2>{props.column.title}</h2>
      </div>
      {props.column.cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </section>
  );
};

export default Column;