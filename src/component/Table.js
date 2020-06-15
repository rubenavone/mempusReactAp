import React, { Component } from "react";
import Nav from "./nav/Nav";
import Column from "./column/Column";
import FormAddCard from "./FormAddCard";
import FetchData from "../service/FetchData";
import "./App.css";

import { Redirect } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      columns: [],
      //indexFormAddCard permet de savoir quelles est la colonne
      //-1 indique que l'on est en train ou non d'afficher un modal
      indexShowFormAddCard: -1,
      error: false,
    };
    //instanciation de fetch data
    this.fetchData = new FetchData();
  }

  // redirectIfFail = () => {
  //   this.props.history.push("/Error");
  // };
  /**
   *  permet de récupérer le dernier id des cartes
   */
  getlastCardId() {
    let lastId = 0;

    for (let i = 0; i < this.state.columns.length; i++) {
      lastId += this.state.columns[i].cards.length;
    }
    console.log(`la taille du tableau est actuellement à ${lastId}`);
    return lastId;
  }
  /**
   *
   * @param {String} question
   * @param {String} answer
   * @param {Number} index
   */
  addCard = (question, answer, index) => {
    //Copie du state
    const copyState = { ...this.state };
    console.log(this.state);
    console.log(`dans add card ${(question, answer, index)} `);

    //Modification de la copie
    copyState.columns[index].cards.push({
      id: this.getlastCardId(),
      question: question,
      answer: answer,
    });

    copyState.indexShowFormAddCard = -1;

    //Modification eventuelle du state
    this.setState(copyState);
  };

  /**
   *
   */
  hideFormAddCard = () => {
    console.log("Dans hideFormAddCard");
    //Copie du state
    const copyState = { ...this.state };

    copyState.indexShowFormAddCard = -1;

    //Modification eventuelle du state
    this.setState(copyState);
  };

  /**
   * Gestion de l'évènement
   * @param {*} event
   */
  handleClickAddCard(index) {
    //Copie du state
    const copyState = { ...this.state };

    //Modification de la copie du state
    copyState.indexShowFormAddCard = index;

    //comparaison et eventuelle modification du state
    //S'il ya une différence, la méthode render sera appelé
    this.setState(copyState);
  }
  /**
   * Gestion de l'évenement pour l'affichage des cartes lors du clique sur une des catégorie
   * @param {} event
   */
  handleClickTerm = (event, termId) => {
    console.log("Je suis dans handleClickTerm", termId);
    //Récuperation des carte
    this.fetchData.getCards(termId, this.failGetcards, this.successGetcards);

    const copyState = { ...this.state };

    //Ajout de la propriété selected dans l'objet term
    copyState.terms.forEach((term) => {
      if (term.id === termId) {
        term.selected = true;
      } else {
        term.selected = false;
      }
    });
    this.setState(copyState);
  };
  /**
   *
   * @param {*} terms
   */
  successGetTerms = (terms) => {
    console.log("Dans successGetterms : ", terms);
    const copyState = { ...this.state };
    copyState.terms = terms;

    this.setState(copyState);
  };
  /**
   *
   * @param {*} error
   */
  failGetTerms = (error) => {
    console.log("Dans failGetTerms erreur : ", error);
  };

  /**
   * @param {*} cards
   */
  successGetcards = (cards) => {
    /* Tris dans le cas ou les colonnes ne sont pas dans le bon ordres
        changement éffectué ensuite via drupal */
    // cards.sort((a, b) => {
    //   return a.id - b.id;
    // });

    // /** Un autre algo qui lui modifie l'emplacement des index dans le tableau
    //  * @param  {Array} arr
    //  * @param  {Number} old_index
    //  * @param  {Number} new_index
    //  */
    // function arrayMove(arr, old_index, new_index) {
    //   if (new_index >= arr.length) {
    //     let k = new_index - arr.length + 1;
    //     while (k--) {
    //       arr.push(undefined);
    //     }
    //   }
    //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    // }

    // arrayMove(copyState.columns, 3, 1);
    console.log("Dans successGetcards : ", cards, "this : ", this.state);
    console.log("l'objet est égale :", this.state, cards);
    const copyState = { ...this.state };

    copyState.columns = cards;

    console.log("old state :", this.state);
    this.setState(copyState);
    console.log("new state : ", this.state);
  };
  /**
   *
   * @param {*} error
   */
  failGetcards(error) {
    console.log("Dans failGetcards erreur : ", error);
  }
  /**
   *
   * @param {String} token
   */
  successGetToken = (token) => {
    console.log("Dans successGetToken : ", token);
    this.fetchData.getTerms(this.failGetTerms, this.successGetTerms);
  };
  /**
   *
   * @param {*} error
   */
  failGetToken = (error) => {
    console.log("Dans failGetToken erreur : ", error);
    console.log("this:", this);
    const copyState = { ...this.state };
    copyState.error = error;
    this.setState(copyState);
  };

  /**
   *
   */
  render() {
    return (
      <div>
        {this.state.error && (
          <Redirect
            to={{
              pathname: "/error",
              state: { error: this.state.error.message },
            }}
          />
        )}
        <main className="container-fluid">
          <div className="row">
            <div className="col">
              <Nav
                terms={this.state.terms}
                // onClickTerm={() => {
                //   this.handleClickTerm();
                // }}
                onClickTerm={this.handleClickTerm}
              />
            </div>
          </div>
          {this.state.indexShowFormAddCard !== -1 && (
            //Appel de formAddCard c'est ici que l'on envoie les argument
            <FormAddCard
              addCard={this.addCard}
              index={this.state.indexShowFormAddCard}
              hideFormAddCard={this.hideFormAddCard} //Attention c'est une évènement on ne l'execute pas avec les () on lui envoie juste la référence
            />
          )}

          <section className="row">
            {this.state.columns.map((column, index) => (
              //Appel de Column c'est ici que l'on envoie les argument

              <Column
                key={column.id}
                column={column}
                onClickAddCard={() => {
                  this.handleClickAddCard(index);
                }}
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
  componentDidMount() {
    //Premier fetch
    //Récuperation des token
    this.fetchData.getToken((this.failGetToken, this.successGetToken));
  }
}

export default Table;

/**
 * Pour lundi il faut faire en sorte que le code affiche lors du clique
 * d'une categorie les carte s'affiches
 */
