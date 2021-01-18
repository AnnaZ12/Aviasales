import React from 'react'
import { ITicketNormalize } from './interfaces';

interface ITicketProps {
  sortTickets: ITicketNormalize[];
}

const Ticket: React.FC<ITicketProps> = ({ sortTickets }) => {
  return (
    <div className="tickets">
      {sortTickets.map(({ id, price, carrier, segments }) => (
        <div className="ticket" key={id}>
          <div className="ticket__header">
            <h1>{price}</h1>
            <img alt="" src={carrier} />
          </div>
          {segments.map(({ id, out, outTime, timeInTrack, stops, stopsC }) => (
            <div className="tickets__there" key={id}>
              <div>
                <h2>{out}</h2>
                <p>{outTime}</p>
              </div>
              <div>
                <h2>В ПУТИ</h2>
                <p>{timeInTrack}</p>
              </div>
              <div>
                <h2>{stops}</h2>
                <p>{stopsC}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default Ticket;
