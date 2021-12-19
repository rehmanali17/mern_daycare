import { PLANS_LOADING, FETCH_SUCCESS, FETCH_FAIL } from "./types";
import { getPostsApi } from "../api/api";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: PLANS_LOADING, payload: {} });
  let response = await getPostsApi();
  response.status === 200
    ? dispatch({ type: FETCH_SUCCESS, payload: response.data.plans })
    : dispatch({ type: FETCH_FAIL, payload: {} });
};
