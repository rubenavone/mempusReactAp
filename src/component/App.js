import React, { Component } from "react";
import Nav from "./nav/Nav";
import Column from "./column/Column";
import FormAddCard from "./FormAddCard";

class App extends Component {
  state = {
    terms: [
      {
        id: 1,
        name: "Bootstrap",
        selected: false,
      },
      {
        id: 2,
        name: "HTML",
        selected: true,
      },
      {
        id: 3,
        name: "CSS",
        selected: false,
      },
    ],
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
    indexShowFormAddCard: -1,
  };

  getlastCardId() {
    let lastId = 0;

    for (let i = 0; i < this.state.columns.length; i++) {
      lastId += this.state.columns[i].cards.length;
    }
    console.log(`la taille du tableau est actuellement à ${lastId}`);
    return lastId;
  }

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

  // compenentDidMount() {
  //   console.log("this is compenentDidMount");
  // }

  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">MeMo</h1>
          <Nav terms={this.state.terms} />
        </header>
        <main className="container-fluid">
          {this.state.indexShowFormAddCard !== -1 && (
            <FormAddCard
              addCard={this.addCard}
              index={this.state.indexShowFormAddCard}
            />
          )}

          <section className="row">
            {this.state.columns.map((column, index) => (
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
}

export default App;
