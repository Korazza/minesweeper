import './Select.css'

export interface Option {
	label: string
	value: string
}

interface SelectProps {
	label?: string
	options: Option[]
}

const Select: React.FC<
	SelectProps &
		React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		>
> = (props) => {
	const { label, options } = props
	return (
		<div className='select-container'>
			{label && (
				<label className='select-label' htmlFor={label}>
					{label}
				</label>
			)}
			<select id={label} {...props} className='select'>
				{options.map((option) => (
					<option key={option.label} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export default Select
