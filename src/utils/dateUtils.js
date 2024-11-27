// dateUtils.js
export function SendDueDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:00`;
}

export function ShowFormatedDueDateOnDateField(dateString) {
  if (!dateString) {
    return "";
  }

  const dateTimeString = dateString.split("+")[0];
  // Parse the date and time string into a Date object
  const targetDate = new Date(dateTimeString);

  const formattedDate = targetDate.toLocaleString(); // Adjust the formatting as needed

  return formattedDate;
}

export function FormattedDateToShowProperly(inputDateTime) {
  const date = new Date(inputDateTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

export const dateFormat = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export function SendDateFormat(dateString) {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function convertToIST(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  };
  const istDate = date.toLocaleString("en-IN", options);
  return istDate;
}
export const dateTimeFormat = (dateString) => {
  if (!dateString) {
    return " ";
  }

  const date = new Date(dateString);

  if (isNaN(date)) {
    return " ";
  }

  return date.toLocaleString();
};

export const formatTime = (dateTimeString) => {
  if (!dateTimeString) {
    return "";
  }
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) {
    return "";
  }
  let hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};



export const convertTo12HourFormat = (time) => {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? 'PM' : 'AM';
  const formattedHour = hourInt % 12 || 12; 
  return `${formattedHour}:${minute} ${period}`;
};

export const formatShiftTime = (shiftStartTime, shiftEndTime) => {
  return `${convertTo12HourFormat(shiftStartTime)} - ${convertTo12HourFormat(shiftEndTime)}`;
};
