import * as _ from 'moment';
const moment = (_ as any).default;

export const getDatesForMonth = (month, year) => {
  const startOfMonth = moment(`01/${month}/${year}`, 'DD/MM/YYYY').get('day') + 1;
  const buffers = startOfMonth - 1;
  const daysInCurrentMonth = moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
  const dateSpace: any = new Array(daysInCurrentMonth + buffers);
  let dates = [];
  let date = 1;
  while (date <= dateSpace.length) {
    if (date <= daysInCurrentMonth) {
      dates.push(date);
    } else {
      dates.unshift(null);
    }
    date += 1;
  }
  return dates;
};

export const getDatesForNextNDays = (startDate, days, events) => {
  let dates = [];
  let counter = 0;
  while (counter < days) {
    dates.push({
      date: moment(startDate).add(counter,'day').get('date'),
      month: moment(startDate).add(counter,'day').get('month'),
      year: moment(startDate).add(counter,'day').get('year'),
      day: moment(startDate).add(counter,'day').get('day'),
      hasEvent: events.includes(moment(startDate).add(counter,'day').format("DD/MM/YYYY")),
    });
    counter++;
  }
  return dates;
};



export const isDateBetween = (currentDate, startDate, endDate, month, year) => {
  const dateBetween = getMomentDate(currentDate, month, year);
  return dateBetween >= moment(startDate, 'DD/MM/YYYY') && dateBetween <= moment(endDate, 'DD/MM/YYYY');
};

export const getMomentDateWithoutFormat = (date, month, year) => moment(`${date}/${month}/${year}`, 'DD/MM/YYYY');

export const getMomentDate = (date, month, year) => moment(`${date}/${month}/${year}`, 'DD/MM/YYYY');

export const formatDate = date => moment(date).format('DD/MM/YYYY');
