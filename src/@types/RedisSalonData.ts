interface WorkingHours {
  start: string;
  end: string;
}

interface Option {
  name: string;
  price: number;
}

interface Artist {
  id: string;
  name: string;
  age: number;
  city: string;
  services: Service[];
  working_hours: WorkingHours;
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  options: Option[]; // Define the structure for options if known, otherwise use any[]
  score: number;
}

export interface Salon {
  id: string;
  name: string;
  age: number;
  city: string;
  artists: Artist[];
  services: Service[];
}

export type Salons = Salon[];
