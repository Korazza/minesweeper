export interface IDifficulty {
	width: number
	height: number
	mines: number
}

export enum DifficultyName {
	Beginner = 'Beginner',
	Intermediate = 'Intermediate',
	Expert = 'Expert',
}

export const Difficulty: Record<DifficultyName, IDifficulty> = {
	[DifficultyName.Beginner]: {
		width: 9,
		height: 9,
		mines: 10,
	},
	[DifficultyName.Intermediate]: {
		width: 16,
		height: 16,
		mines: 40,
	},
	[DifficultyName.Expert]: {
		width: 30,
		height: 16,
		mines: 99,
	},
}
