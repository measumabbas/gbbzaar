import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";

export const getCalendarData = () => {
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(startDate);

  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const monthName = format(currentDate, "MMMM"); // Full month name (e.g., "February")
  const data = daysInMonth.map((day) => ({
    date: day,
    dayOfMonth: format(day, "d"),
    dayOfWeek: format(day, "EEEE"), // Full day name (e.g., "Monday")
  }));
//   console.log(data)
  return {
    monthName: monthName,
    calendarData: data,
  };
};
