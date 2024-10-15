import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as DisplayIcon } from "../icons/Display.svg";
import { ReactComponent as DownIcon } from "../icons/down.svg";

export default function Header({
  grouping,
  ordering,
  onGroupingChange,
  onOrderingChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="header">
      <div className="display-dropdown" ref={dropdownRef}>
        <div onClick={() => setIsOpen(!isOpen)} className="display-button">
          <DisplayIcon className="display-icon" />
          <span>Display</span>
          <DownIcon className="down-icon" />
        </div>
        {isOpen && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select
                value={grouping}
                onChange={(e) => onGroupingChange(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select
                value={ordering}
                onChange={(e) => onOrderingChange(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
