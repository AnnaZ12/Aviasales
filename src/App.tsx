import React, { useEffect, useState, useCallback } from 'react';
import logo from './logo.png';
import { ticketNormalize } from './utils';
import Filter from './components/Filter';
import Tabs from './components/Tabs';
import Ticket from './components/Ticket';
import { ITicket, IFilter, ISort, ITicketNormalize} from './components/interfaces';

const App: React.FC = () => {
  const [searchId, setSearchId] = useState<string>('');
  const [stop, setStop] = useState<boolean>(false);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [sortTickets, setSortTickets] = useState<ITicketNormalize[]>([]);
  const [filter, setfilter] = useState<IFilter>({ all: true, without: false, one: false, two: false, three: false });
  const [sorterActive, setSorterActive] = useState<ISort>({ cheep: true, fast: false });

  // получили searchId
  useEffect(() => {
    try {
      fetch('https://front-test.beta.aviasales.ru/search')
        .then((res) => res.json())
        .then((res) => setSearchId(res.searchId))
    } catch (error) {
      console.log(`ошибка получения searchId ${error}`);
    };
  }, []);

  // по searchId получаем пачки билетов
  useEffect(() => {
      if (searchId && stop === false) {
      let subscribe = async function() {
      
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
          .then((data) => {
            if (data.status === 500 || data.status === 404) {
              subscribe();
            } else {
              return data.json();
            }
          })
          .then((ticketPart) => {
            if (ticketPart.stop) {
              setStop(true)
            }
            setTickets([...tickets, ...ticketPart.tickets])
          })
          .catch((e) => console.log(`ошибка получения пачки билетов ${e}`))
    }
    subscribe();
  }
  }, [searchId, tickets, stop])

  const allSorter = useCallback(
    (tickets1) => {
      const myTickets = [...tickets1];
      if (sorterActive.cheep) {
        return myTickets.sort((a, b) => a.price - b.price);
      }
      if (sorterActive.fast) {
        return myTickets.sort((a, b) => {
          return a.segments[0].duration + a.segments[1].duration - b.segments[0].duration + b.segments[1].duration;
        })
      }
      return myTickets;
    },
    [sorterActive],
  );

  const filteredTickets = useCallback(
    (tickArr) => {
      return tickArr.filter((current: any) => {
        if (filter.all) return current;
        if (filter.without && current.segments[0].stops.length === 0 && current.segments[1].stops.length === 0) return true;
        if (filter.one && current.segments[0].stops.length === 1 && current.segments[1].stops.length === 1) return true;
        if (filter.two && current.segments[0].stops.length === 2 && current.segments[1].stops.length === 2) return true;
        if (filter.three && current.segments[0].stops.length === 3 && current.segments[1].stops.length === 3) return true;
        return false;
      })
    },
    [filter],
  )

  // вывод конечного списка на экран пользователя
  useEffect(() => {
    if (stop === true) {
      setSortTickets(ticketNormalize(allSorter(filteredTickets(tickets.slice(0, 4)))));
    }
  }, [stop, tickets, allSorter, filteredTickets])

  // сортировка билетов в табе
  const sortHandler = useCallback(
    (sortedButton) => {
      // if (sorterActive[sortedButton]) return;
      if (sorterActive.sortedButton) return;
      setSorterActive({cheep: !sorterActive["cheep"], fast: !sorterActive["fast"]})
    },
    [sorterActive],
  )

  // фильтр билетов в сайдбаре
  const allHandler = (fill: string) => {
    let newFilter: any = {...filter};
    newFilter[fill] = !newFilter[fill];
    if (fill === "all") {
      newFilter = Object.fromEntries(
        Object.keys(newFilter).map((current) => {
          return [current, newFilter[fill]]
        })
      )
    } else {
      if (Object.keys(newFilter).some((key) => newFilter[key] === false)) {
        newFilter["all"] = false;
      }
      if (Object.keys(newFilter).every((key) => {
        if (key === "all") return true;
        return newFilter[key] === true;})) {
        newFilter["all"] = true;
      }
    }
    setfilter({ ...newFilter })
  }

  return (
    <div className="App">
      <header className="header">
        <img alt="" src={logo} />
      </header>
      <main>
        <Filter filter={filter} allHandler={allHandler} />
        <div className="main">
          <Tabs sortHandler={sortHandler} sorterActive={sorterActive}/>
          <Ticket sortTickets={sortTickets} />
        </div>
      </main>
    </div>
  );
}

export default App;
