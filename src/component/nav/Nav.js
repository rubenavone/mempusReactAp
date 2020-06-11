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

  return (
    <nav>
      <ul className="list-unstyled d-flex justify-content-center">
        {props.terms.map((term) => (
          <li
            key={term.id}
            className={`btn ${getBtnClass(term.selected)} mg-4 p-2`}
          >
            {term.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
