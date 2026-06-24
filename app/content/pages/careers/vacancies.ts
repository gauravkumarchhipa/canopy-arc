import raw from "./vacancies.json";

export type Vacancy = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
};

export const vacancies = raw as Vacancy[];
