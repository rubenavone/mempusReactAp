import React from "react";

const Nav = (props) => {
  /**
   *
   * @param {Boolean} selected
   */
  function getBtnClass(selected) {
    //operateur ternaire
    return selected ? "btn-warning" : "btn-secondary";
  }

  // function randomizer() {
  //   return Math.random() * 100 - 1;
  // }
  function hello() {
    console.log("hello");
  }
  return (
    <nav>
      <ul className="list-unstyled d-flex justify-content-center">
        {props.terms.map((term) => (
          <li
            key={term.id}
            className={`btn ${getBtnClass(term.selected)} mr-4 p-4`}
            id={term.id}
            // onClick={props.onClickTerm}
            onClick={(event) => {
              props.onClickTerm(event, term.id);
            }}
          >
            {term.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
