import React from "react";
import { CalendarView } from "../components/calendar/CalendarView";

export default function TestCalendar() {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Calendar Test
      </h1>

      <CalendarView />

    </div>
  );

}