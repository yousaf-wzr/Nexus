export type AvailabilitySlot = {
  id: string;
  start: string; // ISO string
  end: string;
};

export type MeetingStatus = "pending" | "accepted" | "declined";

export type MeetingRequest = {
  id: string;
  start: string;
  end: string;
  status: MeetingStatus;
};
