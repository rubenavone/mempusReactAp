import React from "react";

function FormAddCard(props) {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("dans handleSubmit de formAddCard");
    //Récuperation des input
    const question = event.target.querySelector("#input-question").value;
    const answer = event.target.querySelector("#input-question").value;
    console.log(`question = ${question} | reponse = ${answer} `);

    props.addCard(question, answer, props.index);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question :
        <input id="input-question" defaultValue="" type="text" />{" "}
      </label>

      <label>
        Réponse :
        <input id="input-answer" defaultValue="" type="text" />{" "}
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
}

export default FormAddCard;
