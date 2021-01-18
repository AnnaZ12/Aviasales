export interface ITicket {
  id?: number;
  price: number;
  carrier: string;
  segments: ISegments[];
}

export interface ISegments {
  origin: string;
  destination: string;
  date: any;
  stops: [];
  duration: number;
}

export interface IOutIn {
  id: string | number;  
  out: string;
  outTime: string;
  timeInTrack: string;
  stops: string;
  stopsC: string;
}

export interface IFilter {
  all: boolean; 
  without: boolean; 
  one: boolean; 
  two: boolean; 
  three: boolean;
}

export interface ISort {
  cheep: boolean;
  fast: boolean;
  sortedButton?: boolean;
}

export interface ITicketNormalize {
  id: string | number;
  price: string;
  carrier: string;
  segments: IOutIn[];
}
