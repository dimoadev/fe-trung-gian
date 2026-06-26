import { createContext, useContext, useEffect, useState } from "react";
import { getBalance } from "../api/money/action";

const MoneyContext = createContext();

export const MoneyProvider = ({ children }) => {
	const [money, setMoney] = useState(0);
	const [alreadyGet, setAlreadyGet] = useState(false);
	const [trig, setTrig] = useState(false);

	const updateMoney = (value) => {
		localStorage.setItem("mmxo", JSON.stringify(value));
		setMoney(value);
	};

	function trigger() {
		setAlreadyGet(false);
		setTrig(!trig);
	}

	const mmxo = JSON.parse(localStorage.getItem("mmxo") || "0");
	
	async function getDefault() {
		const user = JSON.parse(localStorage.getItem("axu") || "{}");
		if (user?.id) {
			const res = await getBalance();
			if (res?.status === "success") {
				updateMoney(Number(res?.data));
				setAlreadyGet(true);
			}
		}
	}

	useEffect(() => {
		if (mmxo) {
			setMoney(Number(mmxo));
		}
	}, [mmxo]);

	useEffect(() => {
		if (!alreadyGet) {
			getDefault();
		}
	}, [alreadyGet, trig]);

	return (
		<MoneyContext.Provider value={{ money, updateMoney, trigger }}>
			{children}
		</MoneyContext.Provider>
	);
};

// Hook cho tiện
export const useMoney = () => useContext(MoneyContext);
