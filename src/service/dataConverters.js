/**
 * Permet de renommer les clefs reçues en Français depuis l'API drupal
 * columns > cards
 * A utiliser après le fetch en GET (getCards) des colonnes dans FetchData
 * (fonctionne)
 * @param {array} columns 
 */
export function convertColumnsData(columns) {
    const transformedColumns = columns.map(column => {
      return {
        id : column.id,
        title : column.name,
        cards : column.cartes.map(carte => {
          return {
            id : carte.id,
            question : carte.question,
            answer : carte.reponse,
            explanation: carte.explication,
          };
        }),
      };
    });
    return transformedColumns;
  }

/**
 * Permet de renommer les clefs d'une carte avant la soumission en POST
 * utiliser ce convertisseur juste avant d'envoyer les données à l'API dans FetchData
 * (à tester...)
 * @param {array} card 
 */
export function convertSingleCardData(card) {
      const transformedCard = card.map(param => {
      return {
            id : param.id,
            question : param.question,
            reponse : param.answer,
            explication: param.explanation
          };
    });
    return transformedCard;
  }

