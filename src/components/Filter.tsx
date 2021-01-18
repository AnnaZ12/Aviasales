import React from 'react'
import { IFilter } from './interfaces';

interface IFilterProps {
  allHandler: (fill: string) => void;
  filter: IFilter;
}

const Filter: React.FC<IFilterProps> = ({allHandler, filter}) => {
  return (
    <div className="sidebar">
      <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <form>
        <label>
          <input type="checkbox" className="input visually-hidden" onChange={() => allHandler("all")} checked={filter.all}/>
          <span className="checker"></span>
          Все
        </label>
        <label>
          <input type="checkbox" className="input visually-hidden" onChange={() => allHandler("without")} checked={filter.without} />
          <span className="checker"></span>
          БЕЗ ПЕРЕСАДОК
        </label>
        <label>
          <input type="checkbox" className="input visually-hidden" onChange={() => allHandler("one")} checked={filter.one} />
          <span className="checker"></span>1 пересадка
        </label>
        <label>
          <input type="checkbox" className="input visually-hidden" onChange={() => allHandler("two")} checked={filter.two} />
          <span className="checker"></span>2 пересадки
        </label>
        <label>
          <input type="checkbox" className="input visually-hidden" onChange={() => allHandler("three")} checked={filter.three}/>
          <span className="checker"></span>3 пересадки
        </label>
      </form>
    </div>
  )
};

export default Filter;
