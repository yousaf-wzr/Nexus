import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { useCalendar } from "../../context/CalendarContext";
import { useAuth } from "../../context/AuthContext";

export const CalendarView = () => {
  const {
    availability,
    meetings,
    addAvailability,
    deleteAvailability, 
    requestMeeting,
    updateMeetingStatus,
  } = useCalendar();

  const { user } = useAuth();

  const handleSelect = (info: DateSelectArg) => {
    if (!user) return;

    if (user.role === "entrepreneur") {
      // In a month view, startStr is just the date. 
      // FullCalendar handles the formatting for us.
      addAvailability(info.startStr, info.endStr);
    }

    if (user.role === "investor") {
      requestMeeting(info.startStr, info.endStr);
    }
  };

  const handleEventClick = (info: EventClickArg) => {
    // 1. Handle Availability Deletion (Background events)
    if (info.event.display === 'background' || !info.event.title) {
      const confirmDelete = window.confirm("Do you want to remove this availability slot?");
      if (confirmDelete) {
        deleteAvailability(info.event.id);
      }
      return;
    }

    // 2. Handle Meeting Actions
    const meeting = meetings.find((m) => m.id === info.event.id);
    if (!meeting || user?.role !== "entrepreneur") return;

    const action = window.prompt("Meeting Action:\n1 → Accept\n2 → Decline");
    if (action === "1") updateMeetingStatus(meeting.id, "accepted");
    if (action === "2") updateMeetingStatus(meeting.id, "declined");
  };

  // Map availability to background events
  const availabilityEvents = availability.map((slot) => ({
    id: slot.id,
    start: slot.start,
    end: slot.end,
    display: "background" as const,
    backgroundColor: "#dbeafe", 
  }));

  // Map meetings to standard events
  const meetingEvents = meetings.map((m) => ({
    id: m.id,
    start: m.start,
    end: m.end,
    title: m.status === "pending" ? "Pending Pitch" : `Pitch (${m.status})`,
    backgroundColor:
      m.status === "accepted"
        ? "#22c55e"
        : m.status === "declined"
        ? "#ef4444"
        : "#f59e0b",
    borderColor: "transparent",
    textColor: m.status === "pending" ? "#000" : "#fff",
  }));

  return (
    <div className="calendar-container h-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable={true}
        select={handleSelect}
        eventClick={handleEventClick}
        events={[...availabilityEvents, ...meetingEvents]}
        height="100%"
        contentHeight="auto"
        aspectRatio={1.35}
        nowIndicator={true}
        expandRows={true}
        slotMinTime="08:00:00" 
        slotMaxTime="20:00:00"
        allDaySlot={false}
      />
    </div>
  );
};