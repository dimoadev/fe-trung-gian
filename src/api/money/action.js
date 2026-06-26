import AppAPIInstance from "../baseApi";
import { API } from "../constants";

export const createSession = async (payload) => {
	try {
		return await AppAPIInstance.post(API.MONEY.SESSION, payload);
	} catch (err) {
		console.log(err);
	}
};

export const getSessionByCode = async (payload) => {
	try {
		return await AppAPIInstance.get(API.MONEY.DETAIL_SESSION(payload));
	} catch (err) {
		console.log(err);
	}
};

export const getBalance = async () => {
	try {
		return await AppAPIInstance.get(API.MONEY.DETAIL_BALANCE);
	} catch (err) {
		console.log(err);
	}
};

export const createRequestOut = async (payload) => {
	try {
		return await AppAPIInstance.post(API.MONEY.REQUEST_OUT, payload);
	} catch (err) {
		console.log(err);
	}
};

export const historyIn = async (payload) => {
	const {page} = payload;
	try {
		return await AppAPIInstance.get(`${API.MONEY.HISTORY_IN}?page=${page}`);
	} catch (err) {
		console.log(err);
	}
};

export const historyOut = async (payload) => {
	const {page} = payload;
	try {
		return await AppAPIInstance.get(`${API.MONEY.HISTORY_OUT}?page=${page}`);
	} catch (err) {
		console.log(err);
	}
};

export const historyJoined = async (payload) => {
	const {page} = payload;
	try {
		return await AppAPIInstance.get(`${API.MONEY.HISTORY_JOINED}?page=${page}`);
	} catch (err) {
		console.log(err);
	}
};

export const historyWin = async (payload) => {
	const {page} = payload;
	try {
		return await AppAPIInstance.get(`${API.MONEY.HISTORY_WIN}?page=${page}`);
	} catch (err) {
		console.log(err);
	}
};

export const historyOutAdmin = async (payload) => {
	const {page} = payload;
	try {
		return await AppAPIInstance.get(`${API.MONEY.HISTORY_OUT_ADMIN}?page=${page}`);
	} catch (err) {
		console.log(err);
	}
};

export const saveBank = async (payload) => {
	const {data} = payload;
	try {
		return await AppAPIInstance.post(`${API.MONEY.USER_BANK}`, data);
	} catch (err) {
		console.log(err);
	}
};

export const getBank = async () => {
	try {
		return await AppAPIInstance.get(`${API.MONEY.USER_ME_BANK}`,);
	} catch (err) {
		console.log(err);
	}
};

export const getBankAdmin = async (id) => {
	try {
		return await AppAPIInstance.get(API.MONEY.BANK_ADMIN(id));
	} catch (err) {
		console.log(err);
	}
};

export const confirmRequestOut = async (payload) => {
	try {
		return await AppAPIInstance.post(API.MONEY.CONFIRM_OUT, payload);
	} catch (err) {
		console.log(err);
	}
};