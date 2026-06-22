import { CaseStudy } from './services';

export function study(
  id: string,
  title: string,
  client: string,
  description: string,
  challenge: string,
  solution: string,
  outcome: string,
  scope: string,
  deliverables: string[],
  technologies: string[],
  year = 2024,
  duration = '3 months',
): CaseStudy {
  return { id, title, client, description, challenge, solution, outcome, scope, deliverables, technologies, year, duration };
}
