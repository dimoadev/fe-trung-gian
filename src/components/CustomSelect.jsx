import Select from "react-select";

export default function CustomSelect({ options, ...rest }) {
	return (
		<Select
			{...rest}
			options={options}
			styles={{
				control: (base, state) => ({
					...base,
					backgroundColor: "#fff",
					color: "#141619",
					borderColor: state.isFocused ? "#22d3ee" : "rgb(90, 219, 239)", // focus cyan
					boxShadow: state.isFocused ? "0 0 0 1px rgb(90, 219, 239)" : "none",
					"&:hover": { borderColor: "#22d3ee" },
				}),
				menu: (base) => ({
					...base,
					zIndex: 50,
					backgroundColor: "#fff",
					color: "#141619",
				}),
				option: (base, state) => ({
					...base,
					backgroundColor: state.isFocused
						? "#9ec1e6" // 🌈 màu khi hover
						: state.isSelected
						? "#9ec1e6" // 🌈 màu khi chọn
						: "#fff", // 🌈 màu mặc định
					color: "#141619",
					cursor: "pointer",
					"&:active": {
						backgroundColor: "#fff",
					},
				}),
				singleValue: (base) => ({
					...base,
					color: "#141619",
				  }),
			}}
		/>
	);
}
