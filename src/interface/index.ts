export interface iEvObject {
  id: number;
  name: string;
  img: string;
}

export interface iPokemonCard {
  name: string;
  url: string;
}

export interface iPokemonDetail {
  id: number;
  names: { [index: number]: { language: { name: string; url: string }; name: string } };
  flavor_text_entries: {
    [index: number]: {
      flavor_text: string;
      laguage: { name: string; url: string };
      version: { name: string; url: string };
    };
  };
}
export interface iPokemonInfo {
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
  };
  slot: number;
  type: {
    name: string;
    url: string;
  };
  height: string;
  weight: string;
}

export interface iExplanationKoItem {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}
export interface iTypeObject {
  language: { name: string; url: string };
  name: string;
}

export interface iPokeList {
  name: string;
  url: string;
  img: string;
}
