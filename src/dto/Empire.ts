export interface Empire {
  countdown: number;
  bounty_hunter: BountyHunter[];
}

export interface BountyHunter {
  planet: string;
  day: number;
}
