import React from "react";
import { ReactComponent as BacklogIcon } from "../icons/Backlog.svg";
import { ReactComponent as CancelledIcon } from "../icons/Cancelled.svg";
import { ReactComponent as DoneIcon } from "../icons/Done.svg";
import { ReactComponent as TodoIcon } from "../icons/To-do.svg";
import { ReactComponent as InProgressIcon } from "../icons/in-progress.svg";
import { ReactComponent as UrgentPriorityColorIcon } from "../icons/SVG - Urgent Priority colour.svg";
import { ReactComponent as HighPriorityIcon } from "../icons/Img - High Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "../icons/Img - Medium Priority.svg";
import { ReactComponent as LowPriorityIcon } from "../icons/Img - Low Priority.svg";
import { ReactComponent as NoPriorityIcon } from "../icons/No-priority.svg";
import { ReactComponent as CheckIcon } from "../icons/Done.svg";

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

export default function Card({ ticket, user, grouping }) {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return <BacklogIcon className="status-icon" />;
      case "cancelled":
        return <CancelledIcon className="status-icon" />;
      case "done":
        return <DoneIcon className="status-icon" />;
      case "todo":
        return <TodoIcon className="status-icon" />;
      case "in progress":
        return <InProgressIcon className="status-icon" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    const icons = [
      <NoPriorityIcon className="priority-icon" />,
      <LowPriorityIcon className="priority-icon" />,
      <MediumPriorityIcon className="priority-icon" />,
      <HighPriorityIcon className="priority-icon" />,
      <UrgentPriorityColorIcon className="priority-icon" />,
    ];
    return icons[priority];
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">
          {ticket.status.toLowerCase() === "done" && (
            <CheckIcon className="check-icon" />
          )}
          {ticket.id}
        </span>
        {grouping !== "user" && <UserAvatar user={user} />}
      </div>
      <div className="card-title-container">
        <div className="random-card">
          {grouping !== "status" && getStatusIcon(ticket.status)}{" "}
        </div>
        {/* Render Status Icon */}
        <h3 className="ticket-title">{ticket.title}</h3> {/* Title */}
      </div>
      <div className="card-footer">
        <div className="card-tags">
          {grouping !== "priority" && getPriorityIcon(ticket.priority)}
          <span className="feature-request">
            <div className="circle-icon"></div>Feature Request
          </span>
        </div>
      </div>
    </div>
  );
}
