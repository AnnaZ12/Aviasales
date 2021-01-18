import { ITicket, ISegments, IOutIn, ITicketNormalize } from './components/interfaces';

// Единая функция преобразования данных для конечного вывода на экран
export function ticketNormalize(arr0Ticket: ITicket[]) {
  return arr0Ticket.map((ticket): ITicketNormalize => {
    return {
      id: ticket.segments[0].date + ticket.segments[1].date,
      price: priceNormalize(ticket.price),
      carrier: `//pics.avs.io/99/36/${ticket.carrier}.png`,
      segments: outIn(ticket.segments),
    }
  });
}

// Функция преобразования цены билета в формат "ХХ ХХХ Р"
function priceNormalize(price: number): string {
  return price
    .toString()
    .split("") 
    .reverse() 
    .reduce((agrigation, char, i) => {
      if(i % 3 === 0) {
        return agrigation + " " + char;
      }
      return agrigation + char;
    }, "P")
    .split("")
    .reverse()
    .join("");
}

function outIn(arrOutIn: ISegments[]) {
  return arrOutIn.map((road): IOutIn => {
    return {   
      id: road.date,  
      out: `${road.origin} - ${road.destination}`,
      outTime: timeOutIn(road.date, road.duration),
      timeInTrack: timeInTrack(road.duration),
      stops: stops(road.stops.length),
      stopsC: road.stops.join(", "),
    }
  })
}

// Функция преобразования времени вылета и посадки
function timeOutIn(date: number, time: number): string {
  let dateOut = new Date(date); 
  const outHours = dateOut.getHours();
  const outMinutes = dateOut.getMinutes();
  const inHours = new Date(dateOut.setHours(dateOut.getHours() + Math.ceil(time / 60))).getHours();
  const inMinutes = new Date(dateOut.setMinutes(dateOut.getMinutes() + time)).getMinutes();

  return outHours + ":" + outMinutes + " - " + inHours + ":" +  inMinutes;
}

// Расчет и преобразование длительности перелета
function timeInTrack(duration: number) {
  return Math.ceil(duration / 60) + ":" + (duration % 60)
}

// Корректное отображение количества пересадок
function stops(stop: number) {
  switch (stop) {
    case 0:
      return "Без пересадок";
    case 1:
      return "1 ПЕРЕСАДКА";
    default: 
      return `${stop} ПЕРЕСАДКИ`
  }
}
