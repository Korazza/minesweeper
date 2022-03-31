import useGrid from '../hooks/useGrid'
import Cell from './Cell'
import './Field.css'

const Field = () => {
	const { width, height, grid } = useGrid()

	return (
		<div
			className='field'
			style={{
				gridTemplate: `repeat(${height}, 2em) / repeat(${width}, 2em)`,
			}}
		>
			{grid.map((row, y) =>
				row.map((cell, x) => <Cell key={`${x}:${y}`} cell={cell} />)
			)}
		</div>
	)
}

export default Field
