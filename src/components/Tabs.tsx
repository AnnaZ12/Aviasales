import React from 'react';
import { ISort } from './interfaces';

interface ITabsProps {
  sortHandler: (sortedButton: any) => void;
  sorterActive: ISort;
}

const Tabs: React.FC<ITabsProps> = ({sortHandler, sorterActive}) => {
  return (
    <div className="tabs">
      <div className={sorterActive.cheep ? "tabs__cheep tabs__active" : "tabs__cheep"}
      onClick={() => sortHandler("cheep")}>Самый дешевый</div>
      <div className={sorterActive.fast ? "tabs__fast tabs__active" : "tabs__fast"} onClick={() => sortHandler("fast")}>Самый быстрый</div>
    </div>
  )
};

export default Tabs;
