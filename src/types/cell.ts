export interface ICell {
	x: number
	y: number
	isMine: boolean
	isMarked: boolean
	isRevealed: boolean
	neighbours: number
}
