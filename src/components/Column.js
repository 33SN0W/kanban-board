import React from "react";
import Card from "./Card";
import { ReactComponent as AddIcon } from "../icons/add.svg";
import { ReactComponent as ThreeDotMenu } from "../icons/3 dot menu.svg";
import { ReactComponent as BacklogIcon } from "../icons/Backlog.svg";
import { ReactComponent as TodoIcon } from "../icons/To-do.svg";
import { ReactComponent as InProgressIcon } from "../icons/in-progress.svg";
import { ReactComponent as DoneIcon } from "../icons/Done.svg";
import { ReactComponent as CancelledIcon } from "../icons/Cancelled.svg";
import { ReactComponent as NoPriorityIcon } from "../icons/No-priority.svg";
import { ReactComponent as LowPriorityIcon } from "../icons/Img - Low Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "../icons/Img - Medium Priority.svg";
import { ReactComponent as HighPriorityIcon } from "../icons/Img - High Priority.svg";
import { ReactComponent as UrgentPriorityColorIcon } from "../icons/SVG - Urgent Priority colour.svg";

const priorityIcons = {
  0: <NoPriorityIcon className="priority-icon" />,
  1: <LowPriorityIcon className="priority-icon" />,
  2: <MediumPriorityIcon className="priority-icon" />,
  3: <HighPriorityIcon className="priority-icon" />,
  4: <UrgentPriorityColorIcon className="priority-icon" />,
};

const priorityTitles = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

function UserAvatar({ user }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="user-avatar">
      <div className="avatar-initials">{initials}</div>
      <div
        className={`availability-dot ${
          user.available ? "available" : "unavailable"
        }`}
      ></div>
    </div>
  );
}

export default function Column({ title, tickets, users, grouping }) {
  const user = grouping === "user" ? users.find((u) => u.id === title) : null;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return <BacklogIcon className="status-icon" />;
      case "todo":
        return <TodoIcon className="status-icon" />;
      case "in progress":
        return <InProgressIcon className="status-icon" />;
      case "done":
        return <DoneIcon className="status-icon" />;
      case "cancelled":
        return <CancelledIcon className="status-icon" />;
      default:
        return null;
    }
  };

  const columnTitle = () => {
    if (grouping === "priority") {
      const priorityKey = title; // Assuming title is the priority number
      return (
        <div className="priority-column-header">
          {priorityIcons[priorityKey]}
          {/* <span>{priorityTitles[priorityKey]}</span> */}
          <span>{priorityTitles[priorityKey]}</span>
          {/* Combine title and count */}
        </div>
      );
    }

    if (grouping === "user" && user) {
      return (
        <div className="user-column-header">
          <UserAvatar user={user} />
          <span>{user.name}</span>
        </div>
      );
    }

    return (
      <>
        {getStatusIcon(title)}
        {title}
      </>
    );
  };

  return (
    <div className="column">
      <div className="column-header">
        <h2>
          {columnTitle()}
          <span className="ticket-count"> {tickets.length}</span>{" "}
          {/* Remove brackets */}
        </h2>
        <div className="column-actions">
          <AddIcon className="add-icon" />
          <ThreeDotMenu className="three-dot-menu" />
        </div>
      </div>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          ticket={ticket}
          user={users.find((u) => u.id === ticket.userId)}
          grouping={grouping}
        />
      ))}
    </div>
  );
}
