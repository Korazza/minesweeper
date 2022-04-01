import { useState, useEffect } from 'react'

const useLocalStorage = <T>(
	key: string,
	defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		const saved = localStorage.getItem(key)
		return saved ? (JSON.parse(saved) as T) : defaultValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default useLocalStorage
