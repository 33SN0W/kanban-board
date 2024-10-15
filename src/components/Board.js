import React from "react";
import Column from "./Column";
import { groupTickets, orderTickets } from "../utils";

export default function Board({ tickets, users, grouping, ordering }) {
  const groupedTickets = groupTickets(tickets, grouping);
  const orderedTickets = orderTickets(groupedTickets, ordering);

  return (
    <div className="board">
      {Object.entries(orderedTickets).map(([key, columnTickets]) => (
        <Column
          key={key}
          title={key}
          tickets={columnTickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
}
