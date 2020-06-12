import React, { Component } from "react";
import Nav from "./nav/Nav";
import Column from "./column/Column";
import FormAddCard from "./FormAddCard";
import FetchData from "./../service/FetchData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      columns: [
        {
          id: 1,
          title: "A apprendre",
          cards: [],
        },
        {
          id: 2,
          title: "Je sais un peu",
          cards: [],
        },
        {
          id: 3,
          title: "Je sais bien",
          cards: [],
        },
        {
          id: 4,
          title: "Je sais parfaitement",
          cards: [],
        },
      ],
      //indexFormAddCard permet de savoir quelles est la colonne
      //-1 indique que l'on est en train ou non d'afficher un modal
      indexShowFormAddCard: -1,
    };
    //instanciation de fetch data
    this.fetchData = new FetchData("http://www.coopernet.fr/");
  }

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
  };

  successGetTerms = (terms) => {
    console.log("Dans successGetterms : ", terms);
    const copyState = { ...this.state };
    copyState.terms = terms;

    this.setState(copyState);
  };

  failGetTerms(error) {
    console.log("Dans failGetTerms erreur : ", error);
  }

  successGetcards = (cards) => {
    console.log("Dans successGetcards : ", cards);
  };

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

  failGetToken(error) {
    console.log("Dans failGetToken erreur : ", error);
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">MeMo</h1>
          <Nav
            terms={this.state.terms}
            // onClickTerm={() => {
            //   this.handleClickTerm();
            // }}
            onClickTerm={this.handleClickTerm}
          />
        </header>
        <main className="container-fluid">
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
        <footer>footer</footer>
      </div>
    );
  }
  componentDidMount() {
    //Récuperation des token
    this.fetchData.getToken((this.failGetToken, this.successGetToken));
  }
}

export default App;

/**
 * Pour lundi il faut faire en sorte que le code affiche lors du clique
 * d'une categorie les carte s'affiches
 */
