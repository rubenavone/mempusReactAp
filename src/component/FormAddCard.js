import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalBody from "react-bootstrap/ModalBody";

function FormAddCard(props) {
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log("dans handleSubmit de formAddCard");
    //Récuperation des input
    const question = event.target.querySelector("#input-question").value;
    const answer = event.target.querySelector("#input-answer").value;
    console.log(`question = ${question} | reponse = ${answer} `);

    props.addCard(question, answer, props.index);
  }

  const handleClose = () => {
    console.log("Je suis dans handleClose");
    //Appel de la méthode qui cachera le formulaire
    props.hideFormAddCard();
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une Question</Modal.Title>
      </Modal.Header>
      <ModalBody>
        
          <label>
            Question :
            <input id="input-question" defaultValue="" type="text" />{" "}
          </label>

          <label>
            Réponse :
            <input id="input-answer" defaultValue="" type="text" />{" "}
          </label>
         
        
      </ModalBody>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <input type="submit" value="Envoyer" className="btn btn-success"/>
      </Modal.Footer>
      </form>
    </Modal>
  );
}

export default FormAddCard;
