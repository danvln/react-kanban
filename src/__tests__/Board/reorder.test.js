import { cloneDeep } from "lodash";
import { reorderCard } from "../../components/Board/reorder";

const columns = [
  {
    id: "group1",
    title: "group1",
    cards: [
      {
        id: "AAA",
        title: "AAA"
      }
    ]
  },
  {
    id: "group2",
    title: "group2",
    cards: [
      {
        id: "BBB",
        title: "BBB"
      },
      {
        id: "CCC",
        title: "CCC"
      }
    ]
  },
  {
    id: "group3",
    title: "group3",
    cards: []
  }
];

describe("should reorder", () => {
  it("move a card to the same column", () => {
    const cardMap = cloneDeep(columns);
    const source = {
      droppableId: "group2",
      index: 1
    };
    const destination = {
      droppableId: "group2",
      index: 0
    };

    const expectedResult = [
      {
        id: "group1",
        title: "group1",
        cards: [
          {
            id: "AAA",
            title: "AAA"
          }
        ]
      },
      {
        id: "group2",
        title: "group2",
        cards: [
          {
            id: "CCC",
            title: "CCC"
          },
          {
            id: "BBB",
            title: "BBB"
          }
        ]
      },
      {
        id: "group3",
        title: "group3",
        cards: []
      }
    ];

    const res = reorderCard({ cardMap, source, destination });
    expect(JSON.stringify(expectedResult) === JSON.stringify(res)).toBeTruthy();
  });

  it("move a card to another column", () => {
    const cardMap = cloneDeep(columns);
    const source = {
      droppableId: "group2",
      index: 1
    };
    const destination = {
      droppableId: "group1",
      index: 0
    };

    const expectedResult = [
      {
        id: "group1",
        title: "group1",
        cards: [
          {
            id: "CCC",
            title: "CCC"
          },
          {
            id: "AAA",
            title: "AAA"
          }
        ]
      },
      {
        id: "group2",
        title: "group2",
        cards: [
          {
            id: "BBB",
            title: "BBB"
          }
        ]
      },
      {
        id: "group3",
        title: "group3",
        cards: []
      }
    ];

    const res = reorderCard({ cardMap, source, destination });
    expect(JSON.stringify(expectedResult) === JSON.stringify(res)).toBeTruthy();
  });

  it("wrong destination", () => {
    const cardMap = cloneDeep(columns);
    const source = {
      droppableId: "group2",
      index: 1
    };
    const destination = {
      droppableId: "wrongId",
      index: 0
    };
    const res = reorderCard({ cardMap, source, destination });
    expect(JSON.stringify(cardMap) === JSON.stringify(res)).toBeTruthy();
  });
});
