import AppAPIInstance from "../baseApi";
import { API } from "../constants";

export const getUser = async (id) => {
	return await AppAPIInstance.get(API.USER.DETAIL(id));
};

export const signInGoogle = async (payload) => {
	const { data } = payload;
	try {
		const response = await AppAPIInstance.post(API.USER.SIGNIN_GG, data);
		return response;
	} catch (error) {
		return error;
	}
};

export const signInAccount = async (payload) => {
	const { data } = payload;
	try {
		const response = await AppAPIInstance.post(API.USER.SIGNIN_ACCOUNT, data);
		return response;
	} catch (error) {
		return error;
	}
};

export const resetPassword = async (payload) => {
	const { data } = payload;
	try {
		const response = await AppAPIInstance.post(API.USER.UPDATE_PASS, data);
		return response;
	} catch (error) {
		return error;
	}
};

export const registerAccount = async (payload) => {
	const { data } = payload;
	try {
		const response = await AppAPIInstance.post(API.USER.REGISTER, data);
		return response;
	} catch (error) {
		return error;
	}
};

export const updateProfiles = async (payload) => {
	const { data } = payload;
	return await AppAPIInstance.post(API.USER.UPDATE, data);
};

export const uploadMedia = async (payload) => {
	const { file } = payload;
	const form = new FormData();
	form.append("image", file?.originFileObj);
	return await AppAPIInstance.post(API.USER.UPDATE_AVATAR, form, {
		headers: {
			"content-type": "multipart/form-data",
		},
	});
};

export const uploadMediaV2 = async (payload) => {
	const { file } = payload;
	return await AppAPIInstance.post(API.USER.UPDATE_AVATAR, file, {
		headers: {
			"content-type": "multipart/form-data",
		},
	});
};

export const sendTelegramMess = async (payload) => {
	const { data } = payload;
	let bodyInfo = {
		chat_id: "1333053200",
		text: data || "no message",
	};
	return await AppAPIInstance.post(
		`https://api.telegram.org/bot7863835266:AAFs60mJoII2H7OEqEvdAb9z1Ah14cdZuYY/sendMessage`,
		bodyInfo
	);
};

export const sendEmailMess = async (payload) => {
	const { data } = payload;
	return await AppAPIInstance.post(`/send-email`, data);
};
