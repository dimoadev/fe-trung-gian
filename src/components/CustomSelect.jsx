import Select from "react-select";

export default function CustomSelect({ options, ...rest }) {
	return (
		<Select
			{...rest}
			options={options}
			styles={{
				control: (base, state) => ({
					...base,
					backgroundColor: "#232623",
					color: "#fff",
					borderColor: state.isFocused ? "#22d3ee" : "#d1d5db", // focus cyan
					boxShadow: state.isFocused ? "0 0 0 1px rgb(90, 219, 239)" : "none",
					"&:hover": { borderColor: "#22d3ee" },
				}),
				menu: (base) => ({
					...base,
					zIndex: 50,
					backgroundColor: "#232623",
					color: "#fff",
				}),
				option: (base, state) => ({
					...base,
					backgroundColor: state.isFocused
						? "#3A3F3A" // 🌈 màu khi hover
						: state.isSelected
						? "#2B2F2B" // 🌈 màu khi chọn
						: "#232623", // 🌈 màu mặc định
					color: "#fff",
					cursor: "pointer",
					"&:active": {
						backgroundColor: "#232623",
					},
				}),
				singleValue: (base) => ({
					...base,
					color: "#fff",
				  }),
			}}
		/>
	);
}
