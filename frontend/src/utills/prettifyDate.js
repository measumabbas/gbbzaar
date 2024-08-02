export const prettifyDate = (dateValue) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", options);
};

export function convertToAMPM(time) {
  var splitTime = time.split(":");
  var hours = parseInt(splitTime[0]);
  var minutes = splitTime[1];
  var period = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === 0 ? 12 : hours;
  var time12 = hours + ":" + minutes + " " + period;

  return time12;
}

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function deriveDayInfo(inputDate) {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Check if the date is valid
  if (isNaN(parsedDate)) {
    return { error: "Invalid date" };
  }

  // Derive the day of the week and day of the month
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[parsedDate.getDay()];
  const dayOfMonth = parsedDate.getDate();

  return {
    dayOfWeek: dayOfWeek,
    dayOfMonth: dayOfMonth,
  };
}

export const transformDuration = (inputDuration) => {
  // Split the input duration into hours and minutes
  const [hours, minutes] = inputDuration.split(":").map(Number);

  // Format hours and minutes based on the specified conditions
  const formattedHours =
    hours === 0 ? null : hours < 10 ? String(hours) : hours;
  const formattedMinutes =
    minutes === 0 ? null : minutes < 10 ? `0${minutes}` : minutes;

  // Build the final formatted string
  console.log(formattedMinutes);
  let result = "";
  if (formattedHours !== null) {
    result += `${formattedHours} hour${formattedHours === 1 ? "" : "s"}`;
  }

  if (formattedMinutes === undefined || formattedMinutes === null) {
  } else {
    if (result.length > 0) {
      result += " ";
    }
    result += `${formattedMinutes} minute${formattedMinutes === 1 ? "" : "s"}`;
  }

  return result.trim();
};


export function calculateEndTime12Hour(startTime, duration) {
  // Parse start time
  var [start, period] = startTime.split(' ');
  var [startHour12, startMinute12] = start.split(':').map(Number);

  // Convert 12-hour format to 24-hour format
  var startHour24 = (period === "AM" ? startHour12 : startHour12 + 12) % 24;

  // Parse duration
  var [durationHour, durationMinute] = duration.split(':').map(Number);

  // Calculate end time
  var endHour = startHour24 + durationHour;
  var endMinute = startMinute12 + durationMinute;

  // Adjust for overflow
  if (endMinute >= 60) {
      endHour += Math.floor(endMinute / 60);
      endMinute %= 60;
  }

  // Adjust for 12-hour format
  var endPeriod = (endHour < 12) ? "AM" : "PM";
  endHour %= 12;
  if (endHour === 0) {
      endHour = 12; // Convert 0 to 12 in 12-hour format
  }

  // Format the result
  var formattedEndTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')} ${endPeriod}`;

  return formattedEndTime;
}

export function getFormattedDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
  var day = today.getDate().toString().padStart(2, '0');

  var formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


export function timeDifference(createdAt) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate - createdDate;

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}m`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}min`;

  return "Just now";
}