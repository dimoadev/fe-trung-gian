import AppAPIInstance from "../baseApi";
import { API } from "../constants";

export const getListVideo = async (payload) => {
  const { params } = payload;
  return await AppAPIInstance.get(API.VIDEO.LIST, {params:
    {...params, order: "created_date desc"},
  });
};

export const createVideo = async (data) => {
  const newData = { ...data };
  return await AppAPIInstance.post(API.VIDEO.CREATE, newData);
};

export const getVideoDetail = async (id) => {
  return await AppAPIInstance.get(API.VIDEO.DETAIL(id));
};

export const deleteVideo = async (id) => {
  return await AppAPIInstance.delete(API.VIDEO.DELETE(id));
};

export const editVideo = async (payload) => {
  const { id, data } = payload;
  return await AppAPIInstance.put(API.VIDEO.EDIT(id), data);
};