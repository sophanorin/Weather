export const milisecondToAmPm = (miliseconds, timezone) => {
  return moment
    .utc(miliseconds, "X")
    .add(timezone, "seconds")
    .format("hh:mm A");
  // return moment(25200).format("hh:mm A");
};

export const milisecondsToDay = (miliseconds, timezone) => {
  return moment(miliseconds * 1000).format("dddd");
  // return moment(25200).format("dddd");
};

export const milisecondsToMonth = (miliseconds, timezone) => {
  return moment(miliseconds * 1000).format("MMMM");
};

export const timeFromXtoX = (milisecondsFrom, milisecondsTo) => {
  var x = moment(milisecondsTo * 1000).diff(moment(milisecondsFrom * 1000));
  var d = moment.duration(x, "milliseconds");
  var hours = Math.floor(d.asHours());
  var mins = Math.floor(d.asMinutes()) - hours * 60;
  return hours + "h " + mins + "m";
};
