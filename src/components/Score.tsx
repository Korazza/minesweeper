import { useEffect, useRef, useState } from 'react'

import useGrid from '../hooks/useGrid'
import { ReactComponent as Reset } from './reset.svg'
import './Score.css'

const Score = () => {
	const { mines, marks, playing, reset } = useGrid()
	const [minesLeft, setMinesLeft] = useState<number>(mines)
	const [start, setStart] = useState<Date>()
	const [elapsed, setElapsed] = useState<number>(0)
	const interval = useRef<NodeJS.Timer>()

	useEffect(() => setMinesLeft(mines - marks), [mines, marks])

	useEffect(() => {
		if (playing) setStart(new Date())
		else {
			if (interval.current) clearInterval(interval.current)
			setStart(undefined)
		}
	}, [playing])

	useEffect(() => {
		if (!start) return
		interval.current = setInterval(
			() =>
				setElapsed(Math.round((new Date().valueOf() - start.valueOf()) / 1000)),
			1000
		)
	}, [start])

	return (
		<div className='score-container'>
			<div className='score'>
				<span>Mines</span>
				<span className='value'>{`${minesLeft - 100 < 0 ? 0 : ''}${
					minesLeft - 10 < 0 ? 0 : ''
				}${minesLeft}`}</span>
			</div>
			<button
				className='reset'
				onClick={() => {
					setElapsed(0)
					reset()
				}}
			>
				<Reset />
			</button>
			<div className='score'>
				<span>Time</span>
				<span className='value'>
					{`${elapsed - 100 < 0 ? 0 : ''}${
						elapsed - 10 < 0 ? 0 : ''
					}${elapsed}`}
				</span>
			</div>
		</div>
	)
}

export default Score
