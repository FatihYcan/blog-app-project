import {
  fetchStart,
  getBlogSuccess,
  getCategorySuccess,
  getDetailSuccess,
  getUserSuccess,
  fetchFail,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";

const useBlogCalls = () => {
  const { axiosWithToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();

  const getBlogs = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(url);
      const apiData = data.data;
      const pagination = data.details;
      dispatch(getBlogSuccess({ apiData, pagination }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postBlogs = async (url = "blogs", postData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`/${url}/`, postData);
      const apiData = data.data;
      getBlogs(url);
      dispatch(getBlogSuccess({ apiData, url }));
      toastSuccessNotify(`${url} kayıdı eklenmiştir.`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} kayıdı kaydi eklenemiştir.`);
    }
  };

  const putBlogs = async (url = "blogs", post_id, data) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/${url}/${post_id}`, data);
      toastSuccessNotify(`${url} kayıdı güncellenmiştir..`);
      getBlogs(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} kaydi güncelenememiştir.`);
    }
  };

  const deleteBlogs = async (url = "blogs", post_id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/${url}/${post_id}/`);
      toastSuccessNotify(`${url} bilgisi silinmiştir.`);
      getBlogs(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} silinemedi`);
    }
  };

  const getCategories = async (url = "blogs") => {
    const { data } = await axiosWithToken(`/${url}/`);
    const apiData = data.data;
    dispatch(getCategorySuccess({ apiData, url }));
  };

  const postLikes = async (url = "blogs", post_id, detail = false) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/${post_id}/postLike/`, null);
      if (detail) {
        getDetails(post_id);
      } else {
        getBlogs(url);
      }
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getDetails = async (url = "blogs", post) => {
    const { data } = await axiosWithToken(`/${url}/${post.id}/`);
    const apiData = data.data;
    dispatch(getDetailSuccess({ apiData, url, post }));
  };

  const getUsers = async (url = "blogs", user) => {
    const { data } = await axiosWithToken(`/${url}?author=${user.id}`);
    const apiData = data.data;
    const pagination = data.details;
    dispatch(getUserSuccess({ apiData, url, pagination }));
  };

  const postComments = async (url = "blogs", data) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/`, data);
      toastSuccessNotify("Yorum yapılmıştır.");
      getBlogs(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login olmadığınız için yorum yapılamamıştır");
    }
  };

  return {
    getBlogs,
    postBlogs,
    putBlogs,
    deleteBlogs,
    getCategories,
    postLikes,
    getDetails,
    getUsers,
    postComments,
  };
};

export default useBlogCalls;
