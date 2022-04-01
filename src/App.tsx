import React, { useState } from 'react'

import GridProvider from './contexts/grid'
import Field from './components/Field'
import Select, { Option } from './components/Select'
import Score from './components/Score'
import { Difficulty, DifficultyName } from './types/difficulty'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage'

const App = () => {
	const [difficulty, setDifficulty] = useLocalStorage(
		'difficulty',
		DifficultyName.Beginner
	)
	const [options] = useState<Option[]>([
		{
			label: `${DifficultyName.Beginner} (${Difficulty.Beginner.width} x ${Difficulty.Beginner.height})`,
			value: DifficultyName.Beginner,
		},
		{
			label: `${DifficultyName.Intermediate} (${Difficulty.Intermediate.width} x ${Difficulty.Intermediate.height})`,
			value: DifficultyName.Intermediate,
		},
		{
			label: `${DifficultyName.Expert} (${Difficulty.Expert.width} x ${Difficulty.Expert.height})`,
			value: DifficultyName.Expert,
		},
	])

	const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDifficulty(e.target.value as DifficultyName)
	}

	return (
		<GridProvider {...Difficulty[difficulty]}>
			<div className='container'>
				<div className='top'>
					<h1 className='title'>Minesweeper</h1>
					<Select
						label='Difficulty'
						value={difficulty}
						onChange={handleSelection}
						options={options}
					/>
					<Score />
				</div>
				<Field />
			</div>
		</GridProvider>
	)
}

export default App
