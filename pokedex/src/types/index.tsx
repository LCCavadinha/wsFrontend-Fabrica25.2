export type Pokemon = {
  // Definição do tipo
    id: number;
    name: string;
    weight: number;
    base_experience: number;
    sprites?: {
      front_default?: string;
      other?: {
        "official-artwork"?: { front_default?: string };
      };
    };
    types: { slot: number; type: { name: string } }[];
  };