import { useContext } from 'react'

import { GridContext } from '../contexts/grid'

const useGrid = () => useContext(GridContext)

export default useGrid
