import React from "react";

const Error = (props) => {
  return (
    <main className="container">
      <div className="row">
        <div className="col mb-5">
          <h2>Erreur</h2>
          <p>
            Une erreur est survenue Contactez l'administrateur <br />
            {props.location.state.error}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Error;
