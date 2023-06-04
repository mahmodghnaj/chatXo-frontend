export const getChatDate = (t: Date): string => {
  const currentTime: Date = new Date();
  const timestamp: number = new Date(t).getTime();
  const currentTimestamp: number = currentTime.getTime() / 1000;
  const timeDifference: number = currentTimestamp - timestamp;

  if (timeDifference <= 0) {
    return currentTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (timeDifference <= 86400) {
    // 1 day in seconds
    const yesterday: Date = new Date(currentTime);
    yesterday.setDate(currentTime.getDate() - 1);
    return "Yesterday";
  }

  if (timeDifference <= 604800) {
    // 7 days in seconds
    return currentTime.toLocaleDateString([], { weekday: "long" });
  }

  const futureDate: Date = new Date(currentTime);
  futureDate.setDate(currentTime.getDate() + 7);
  return futureDate.toISOString().split("T")[0];
};
export const getLastSeen = (data: Date): string => {
  const lastSeen = new Date(data);
  const now = new Date();
  const timeDiff = now.getTime() - lastSeen.getTime();

  // Calculate the time difference in minutes, hours, days, and weeks
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

  if (minutes < 1) {
    return `Last seen just now`;
  } else if (minutes < 60) {
    if (minutes <= 5) {
      return `Last seen a few minutes ago`;
    } else {
      return `Last seen  ${minutes} minutes ago`;
    }
  } else if (hours < 24) {
    return `Last seen ${hours} hours ago`;
  } else if (days === 1) {
    return `Last seen yesterday`;
  } else if (days < 7) {
    const dayOfWeek = lastSeen.toLocaleDateString("en-US", { weekday: "long" });
    return `Last seen on ${dayOfWeek}`;
  } else {
    const lastSeenDate = lastSeen.toLocaleDateString(); // Get the date string
    return `Last seen on ${lastSeenDate}`;
  }
};
export const getMessageLabel = (date: Date): string => {
  const currentDate = new Date();
  const formattedDate = new Date(date).toISOString().split("T")[0];

  if (
    date.toDateString() === currentDate.toDateString() ||
    (date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear())
  ) {
    return "Today";
  }

  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  if (date.toDateString() === yesterdayDate.toDateString()) {
    return "Yesterday";
  }

  if (date >= currentDate) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }

  return formattedDate;
};
export const getTime12 = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
};
