import React from "react";

const Card = (props) => {

  let visible = "hide";

  const handlehHidenAnswer = () => {
    visible = "visible"
    console.log("appel de la fonction visible", visible)
    return visible
  }

  return (
    <article className="bg-secondary rounded p-4 text-light shadow mb-3">
      <h3 className="font-weight-bold">{props.card.question}</h3>
      <h4 className={`${visible}`}>{props.card.answer}</h4>
      <button className=" btn btn-warning"> Proposer une réponse </button>
      <button className=" btn btn-warning ml-5" onClick={handlehHidenAnswer}> Voir la réponse </button>
    </article>
  );
};

export default Card;
