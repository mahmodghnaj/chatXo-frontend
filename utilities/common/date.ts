export const getChatDate = (chatDate: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDate: string;

  if (chatDate.toDateString() === today.toDateString()) {
    formattedDate = "Today";
  } else if (chatDate.toDateString() === yesterday.toDateString()) {
    formattedDate = "Yesterday";
  } else if (
    chatDate >=
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)
  ) {
    formattedDate = daysOfWeek[chatDate.getDay()];
  } else {
    formattedDate = chatDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  return formattedDate;
};
