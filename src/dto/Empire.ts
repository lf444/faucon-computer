export interface Empire {
  countdown: number;
  bounty_hunter: BountyHunter[];
}

interface BountyHunter {
  planet: string;
  day: number;
}
