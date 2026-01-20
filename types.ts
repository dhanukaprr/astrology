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
  Aries = "Aries",
  Taurus = "Taurus",
  Gemini = "Gemini",
  Cancer = "Cancer",
  Leo = "Leo",
  Virgo = "Virgo",
  Libra = "Libra",
  Scorpio = "Scorpio",
  Sagittarius = "Sagittarius",
  Capricorn = "Capricorn",
  Aquarius = "Aquarius",
  Pisces = "Pisces"
}