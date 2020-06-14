import { convertColumnsData, convertSingleCardData } from "./dataConverters";

class FetchData {
  constructor(url, login = "navone_ruben", pwd = "navone_ruben", uid = 90) {
    this.url = url;
    this.login = login;
    this.uid = uid;
    this.pwd = pwd;
    this.token = "";
  }
  
  /**
   * @param  {function} success
   * @param  {function} failed
   */
  getToken = (success, failed) => {
    fetch(`${this.url}rest/session/token`) //End point , le poin d'entrée
      //il crée une prommesse qu'on ne voit pas
      //avec un retour
      .then((response) => {
        if (response.status !== 200) {
          // si ça c'est mal passé
          throw new Error(
            `Le serveur n'a pas répondu correctement erreur ${response.status}`
          );
        } else return response.text(); // renvoie une promesse
      })
      .then((token) => {
        // token correspond au retour du résolve (ici deux lignes au dessus)
        console.log("Token récupéré : ", token);
        this.token = token;
        success(token);
      })
      .catch((error) => {
        console.log("Erreur attrapée : ", error);
        failed(error);
      });
  };

  /*
   * @param  {function} success
   * @param  {function} failed
   */
  getTerms = (failed, success) => {
    fetch(`${this.url}memo/themes/${this.uid}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
      },
    })
      .then((response) => {
        console.log("data reçues dans createReqTerms avant json() :", response);
        if (response.status === 200) return response.json();
        else throw new Error("Problème de réponse ", response);
      })
      .then((data) => {
        console.log("data reçues dans geterms :", data);
        success(data);
      })
      .catch((error) => {
        failed(error);
      });
  };
 

  // getCards = (termId, failed, success) => {
  //  const queryCards = `${this.url}memo/list_cartes_term/${this.uid}/${termId}&_format=json&time=${Math.floor(Math.random() * 10000)}`;
   
  //   fetch(`${queryCards}`,
  //     {
  //       credentials: "same-origin",
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/hal+json",
  //         "X-CSRF-Token": this.token,
  //         Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       console.log("data reçues dans createReqTerms avant json() :", response, "url de la requete :", queryCards);
  //       if (response.status === 200) return response.json();
  //       else throw new Error("Problème de réponse ", response);
  //     })
  //     .then((data) => {
  //       console.log("data reçues dans getCards :", data);
  //       success(data);
  //     })
  //     .catch((error) => {
  //       failed(error);
  //     });
  // };


    getCards = (termId, failed, success) => {
    const queryCards = `${this.url}memo/list_cartes_term/${this.uid}/${termId}&_format=json&time=${Math.floor(Math.random() * 10000)}`;
   
    fetch(`${queryCards}`,
        {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": this.token,
          Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
        },
      })
      .then((response) => {
        console.log("data reçues dans getCards avant json() :", response);
        if (response.status === 200) return response.json();
        else throw new Error("Problème de réponse ", response);
      })
      .then((data) => {
        console.log('Data dans getCards : ', data);
        success(convertColumnsData(data)); // on convertie les clefs back-end pour les adapter au front-end
      })
      .catch((error) => {
        console.log('Erreur attrapée dans getCards', error);
        failed(error);
      });
    }
  }


export default FetchData;
