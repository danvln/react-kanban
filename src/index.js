import React, { Component, Fragment } from "react";
import "./index.css";
import Board from "./components/Board";

class BoardLib extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      groups = [],
      locked = true,
      updatedDatas = null,
      columnsWidth = 250,
      cardsHeight = 50,
      columnsAction = null
    } = this.props;

    return (
      <>
        <Board className="o2xp-react-kanban" {...this.props} />
      </>
    );
  }
}

export { BoardLib };
