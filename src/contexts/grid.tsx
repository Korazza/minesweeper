import { createContext, useEffect, useState } from 'react'

import { IDifficulty } from '../types/difficulty'
import { ICell } from '../types/cell'

interface Context {
	width: IDifficulty['width']
	height: IDifficulty['height']
	mines: IDifficulty['mines']
	grid: ICell[][]
	marks: number
	playing: boolean
	gameOver: boolean
	win: boolean
	reset: () => void
	reveal: (x: number, y: number) => void
	toggleMark: (e: React.MouseEvent, x: number, y: number) => void
}

export const GridContext = createContext<Context>({
	width: 0,
	height: 0,
	mines: 0,
	marks: 0,
	grid: [],
	playing: false,
	gameOver: false,
	win: false,
	reset: () => null,
	reveal: () => null,
	toggleMark: () => null,
})

interface GridProviderProps {
	width: IDifficulty['width']
	height: IDifficulty['height']
	mines: IDifficulty['mines']
}

const GridProvider: React.FC<GridProviderProps> = (props) => {
	const { width, height, mines } = props
	const [grid, setGrid] = useState<Context['grid']>([])
	const [marks, setMarks] = useState<Context['marks']>(0)
	const [playing, setPlaying] = useState<boolean>(false)
	const [gameOver, setGameOver] = useState<boolean>(false)
	const [win, setWin] = useState<boolean>(false)

	const reset = () => {
		setMarks(0)
		setPlaying(false)
		setGameOver(false)
		setWin(false)
		const newGrid: ICell[][] = Array(height)

		for (let i = 0; i < height; i++) {
			newGrid[i] = Array(width)
			for (let j = 0; j < width; j++) {
				newGrid[i][j] = {
					x: j,
					y: i,
					isMine: false,
					isMarked: false,
					isRevealed: false,
					neighbours: 0,
				}
			}
		}

		let minesPlaced = mines
		while (minesPlaced > 0) {
			const x = Math.floor(Math.random() * width)
			const y = Math.floor(Math.random() * height)
			if (!newGrid[y][x].isMine) {
				minesPlaced--
				newGrid[y][x].isMine = true
			}
		}

		for (let x = 0; x < width; x++)
			for (let y = 0; y < height; y++) {
				let count = 0
				for (let i = y - 1; i <= y + 1; i++)
					if (i >= 0 && i < height)
						for (let j = x - 1; j <= x + 1; j++)
							if (j >= 0 && j < width && newGrid[i][j].isMine) count++
				newGrid[y][x].neighbours = count
			}

		setGrid(newGrid)
	}

	useEffect(reset, [width, height, mines])

	useEffect(() => {
		if (!playing || grid.length !== height || grid[0].length !== width) return
		let cellsRevealed = 0
		for (let i = 0; i < height; i++)
			for (let j = 0; j < width; j++)
				if (grid[i][j].isRevealed && !grid[i][j].isMine) cellsRevealed++
		if (cellsRevealed === width * height - mines) {
			setPlaying(false)
			setWin(true)
		}
	}, [playing, width, height, mines, grid])

	useEffect(() => {
		if (!gameOver || grid.length !== height || grid[0].length !== width) return
		const timeouts: NodeJS.Timeout[] = []
		const speed = Math.round(300 / (width * height))
		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				if (grid[i][j].isMine && !grid[i][j].isRevealed) {
					timeouts.push(
						setTimeout(() => {
							setGrid((currentGrid) => {
								currentGrid[i][j].isMarked = false
								currentGrid[i][j].isRevealed = true
								return [...currentGrid]
							})
						}, (i + j + 1) * speed)
					)
				}
			}
		}

		return () => timeouts.forEach((timeout) => clearTimeout(timeout))
	}, [gameOver, width, height, mines, grid])

	const reveal = (x: number, y: number) => {
		if (gameOver || win || grid[y][x].isRevealed) return
		if (!playing) setPlaying(true)
		setGrid((currentGrid) => {
			currentGrid[y][x].isMarked = false
			currentGrid[y][x].isRevealed = true

			if (currentGrid[y][x].isMine) {
				setPlaying(false)
				setGameOver(true)
				return currentGrid
			}

			if (currentGrid[y][x].neighbours === 0)
				for (let i = y - 1; i <= y + 1; i++)
					if (i >= 0 && i < height)
						for (let j = x - 1; j <= x + 1; j++)
							if (j >= 0 && j < width) reveal(j, i)

			return [...currentGrid]
		})
	}

	const toggleMark = (e: React.MouseEvent, x: number, y: number) => {
		e.preventDefault()
		if (!playing) setPlaying(true)
		if (
			gameOver ||
			win ||
			grid[y][x].isRevealed ||
			(!grid[y][x].isMarked && mines - marks <= 0)
		)
			return
		setGrid((currentGrid) => {
			currentGrid[y][x].isMarked = !currentGrid[y][x].isMarked
			setMarks((currentMarks) =>
				currentGrid[y][x].isMarked ? currentMarks + 1 : currentMarks - 1
			)
			return [...currentGrid]
		})
	}

	return (
		<GridContext.Provider
			value={{
				width,
				height,
				mines,
				grid,
				marks,
				playing,
				gameOver,
				win,
				reset,
				reveal,
				toggleMark,
			}}
			{...props}
		/>
	)
}

export default GridProvider
