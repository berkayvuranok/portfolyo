export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  topics: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
  description: string;
  matchKeys: string[];
}

export interface Certificate {
  provider: string;
  items: string[];
}

export interface Tab {
  id: string;
  label: string;
}
