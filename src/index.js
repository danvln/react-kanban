import React, { Component, Fragment } from "react";
import { cloneDeep } from "lodash";
import "./index.css";
import Board from "./components/Board"

class BoardLib extends Component {
  constructor(props) {
    super(props)
  }

  render() {

const {
  groups=[],
  locked=true,
  updatedDatas=null,
  deletable= false,
  columnsWidth= 250,
  cardsHeight= 50,
  columnsAction=null
} = this.props;

    return (
      <>
        <Board
        className="o2xp-react-kanban"
          groups={groups}
          locked={locked}
          updatedDatas={updatedDatas}
          columnsWidth={columnsWidth}
          cardsHeight={cardsHeight}
          columnsAction={columnsAction}

        />
      </>
    );
  }
}

export { BoardLib };