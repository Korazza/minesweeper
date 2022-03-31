import useGrid from '../hooks/useGrid'
import { ICell } from '../types/cell'
import './Cell.css'

interface CellProps {
	cell: ICell
}

const Cell: React.FC<CellProps> = ({ cell }) => {
	const { x, y, isMine, isMarked, isRevealed, neighbours } = cell
	const { reveal, toggleMark } = useGrid()

	return (
		<button
			className={`cell${
				isRevealed ? (isMine ? ' mine-revealed' : ' revealed') : ' hidden'
			}`}
			style={{
				color:
					((isMarked || isMine) && 'black') ||
					(neighbours === 1 && 'blue') ||
					(neighbours === 2 && 'green') ||
					(neighbours === 3 && 'red') ||
					(neighbours === 4 && 'purple') ||
					(neighbours === 5 && 'brown') ||
					(neighbours === 6 && 'turquoise') ||
					(neighbours === 7 && 'black') ||
					(neighbours === 8 && 'gray') ||
					'black',
			}}
			onClick={() => reveal(x, y)}
			onContextMenu={(e) => toggleMark(e, x, y)}
		>
			{isRevealed ? (
				isMine ? (
					<img
						src={`${process.env.PUBLIC_URL}mine.png`}
						alt='Mine'
						width={30}
					/>
				) : neighbours === 0 ? (
					''
				) : (
					<span>{neighbours}</span>
				)
			) : isMarked ? (
				<img src={`${process.env.PUBLIC_URL}flag.png`} alt='Flag' width={30} />
			) : (
				''
			)}
		</button>
	)
}

export default Cell
