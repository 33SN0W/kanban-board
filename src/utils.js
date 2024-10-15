export function groupTickets(tickets, grouping) {
  const groups = tickets.reduce((acc, ticket) => {
    const key =
      grouping === "user"
        ? ticket.userId
        : grouping === "priority"
        ? ticket.priority.toString()
        : ticket.status;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});

  if (grouping === "status") {
    const allStatuses = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
    allStatuses.forEach((status) => {
      if (!groups[status]) {
        groups[status] = [];
      }
    });
  }

  return groups;
}

export function orderTickets(groupedTickets, ordering) {
  const sortFn =
    ordering === "priority"
      ? (a, b) => b.priority - a.priority
      : (a, b) => a.title.localeCompare(b.title);

  return Object.fromEntries(
    Object.entries(groupedTickets).map(([key, tickets]) => [
      key,
      tickets.sort(sortFn),
    ])
  );
}
