// Use dep
import { QueryClient, Resource, fetchUtils, useNotify } from "./dep";

import { HttpError } from "react-admin";

import { host } from "../http";

import authProvider from "../provider/authProvider";

import store, { setLoading, setNotify } from "../store";

/**
 * @param permissions
 * @returns
 * ====== ====== ======
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 接口重试
      retry: false,
      structuralSharing: false,
    },
    mutations: {
      retryDelay: 10000,
    },
  },
});

/**
 *
 * @param permissions
 * @returns
 * ====== ====== ======
 */
export const fetchResources = (permissions: any) => {
  console.log("permissions", permissions);
  // 1. 获取权限
  return fetch("https://myapi/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(permissions),
  })
    .then((response) => response.json())
    .then((json) =>
      // 动态生成source
      knownResources.filter((resource) =>
        json.resources.includes(resource.props.name)
      )
    );
};

// export const knownResources = [
//   <Resource
//     name="banners"
//     list={banner.List}
//     edit={<div>edit</div>}
//     show={<div>show</div>}
//     create={<div>create</div>}
//   />,
// ];

// 获取token
const getToken = async () => {
  const identity = await authProvider.getIdentity();

  if (identity === null) return null;

  const { token } = identity;

  return token;
};

// 创建 httpClient 对象
export const httpClient = {
  // Get
  get: async (url, { params, headers = {} } = {}) => {
    const token = await getToken();

    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const options = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        ...headers,
        Token: token,
      }),
    };
    return fetchUtils.fetchJson(`${host}${url}${queryString}`, options);
  },

  // Post
  post: async (url, { data, headers } = {}) => {
    // Get  Token
    const token = await getToken();

    // Check if data is an instance of FormData
    const isFormData = data instanceof FormData;

    // Create the headers object, conditionally setting Content-Type
    const finalHeaders = new Headers({
      Accept: "application/json",
      ...headers,
      Token: token,
    });

    // Only set Content-Type if not FormData
    if (!isFormData) {
      finalHeaders.set("Content-Type", "application/json");
    }

    const options = {
      method: "POST",
      headers: finalHeaders,
      body: isFormData ? data : JSON.stringify(data),
    };

    // Show Loading
    store.dispatch(setLoading(true));

    const result = await fetchUtils.fetchJson(`${host}${url}`, options);

    // Hide Loading
    store.dispatch(setLoading(false));

    const { status, error, ...res } = result?.json;

    if (status === 200) {
      return res;
    }

    // Show Nofify
    store.dispatch(
      setNotify({
        content: error,
        type: "error",
        visible: true,
      })
    );

    // Hide Notify
    setTimeout(() => {
      store.dispatch(
        setNotify({
          visible: false,
        })
      );
    }, 2000);

    return Promise.reject();
  },
};
