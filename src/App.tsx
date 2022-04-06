import React from 'react'

import GridProvider from './contexts/grid'
import Field from './components/Field'
import Select, { Option } from './components/Select'
import Score from './components/Score'
import useLocalStorage from './hooks/useLocalStorage'
import { Difficulty, DifficultyName } from './types/difficulty'
import './App.css'

const options: Option[] = Object.values(DifficultyName).map(
	(difficultyName): Option => ({
		label: `${difficultyName} (${Difficulty[difficultyName].width} x ${Difficulty[difficultyName].height})`,
		value: difficultyName,
	})
)

const App = () => {
	const [difficulty, setDifficulty] = useLocalStorage(
		'difficulty',
		DifficultyName.Beginner
	)

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
