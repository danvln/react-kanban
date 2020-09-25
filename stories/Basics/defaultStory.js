import React from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import Button from "@material-ui/core/Button";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { cloneDeep } from "lodash";

import { BoardLib } from "../../src/index";

const defaultStory = () => {
  const [data, setData] = React.useState([
    {
      id: "noGroupAssigned",
      title: "Unassigned",
      cards: []
    },
    {
      id: "632d51a8-0e81-466b-871e-34fc5e21a78a",
      title: "Group1",
      cards: [
        {
          id: "AED",
          title: "AED",
          content: "Anim culpa est ea quis cillum magna."
        },
        {
          id: "AMD",
          title: "AMD"
        },
        {
          id: "AOA",
          title: "AOA"
        }
      ]
    },
    {
      id: "50df5344-5c90-474d-af50-06ab6a307577",
      title: "Group2",
      cards: [
        {
          id: "BOB",
          title: "BOB"
        },
        {
          id: "BRL",
          title: "BRL"
        },
        {
          id: "BWP",
          title: "BWP"
        }
      ]
    },
    {
      id: "5b2ae0bb-68ba-419a-a395-d8ce2eb7769a",
      title: "Group3",
      cards: [
        {
          id: "EUR",
          title: "EUR"
        },
        {
          id: "USD",
          title: "USD"
        }
      ]
    },
    {
      id: "b7bcdc58-41e1-41e7-bcef-7be4c012298e",
      title: "Group4",
      cards: []
    }
  ]);
  let changedDatas = data;

  const deleteColumn = column => {
    const newData = cloneDeep(data);
    const defaultColumn = newData.find(col => col.id === "noGroupAssigned");
    if (defaultColumn) {
      // Reassign cards from deleted group to default group
      const defaultCards = column.cards.concat(...defaultColumn.cards);
      defaultColumn.cards = defaultCards;

      // Remove group
      const index = newData.findIndex(col => col.id === column.id);
      newData.splice(index, 1);

      // Update displayed data
      setData(newData);
    }
  };

  const columnsAction = column => {
    const actions = [
      {
        icon: (
          <DeleteIcon
            style={{ width: 25, height: 25 }}
            onClick={() => deleteColumn(column)}
          />
        ),
        name: "Delete"
      },
      {
        icon: (
          <EditIcon
            style={{ width: 25, height: 25 }}
            onClick={() => console.log("edit")}
          />
        ),
        name: "Edit"
      }
    ];
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };
    return (
      <div>
        <SpeedDial
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="down"
          style={{
            zIndex: 1000,
            position: "relative",
            top: 10,
            right: 0,
            height: 48
          }}
          FabProps={{ style: { width: 36, height: 36 } }}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
              FabProps={{ style: { backgroundColor: "#3f51b5", color: "#fff" } }}
            />
          ))}
        </SpeedDial>
      </div>
    );
  };

  const prop = {
    groups: data,
    locked: false, // locked
    updatedDatas: datas => {
      changedDatas = datas;
    },
    columnsWidth: 250,
    cardsHeight: 60,
    columnsAction
  };

  return (
    <>
      <BoardLib {...prop} noCardButton />
      <Button variant="outlined" onClick={() => console.log(changedDatas)}>
        display
      </Button>
    </>
  );
};

export default defaultStory;
