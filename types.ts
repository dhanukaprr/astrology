
export interface BirthInfo {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export interface LagnaReading {
  lagna: string;
  summary: string;
  predictions: {
    health: string;
    wealth: string;
    career: string;
    love: string;
  };
  luckyNumbers: number[];
  luckyColor: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum Lagna {
  Mesha = "මේෂ",
  Vrushabha = "වෘෂභ",
  Mithuna = "මිථුන",
  Kataka = "කටක",
  Sinha = "සිංහ",
  Kanya = "කන්‍යා",
  Thula = "තුලා",
  Vrushchika = "වෘශ්චික",
  Dhanu = "ධනු",
  Makara = "මකර",
  Kumbha = "කුම්භ",
  Meena = "මීන"
}
