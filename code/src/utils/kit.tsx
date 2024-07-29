// Use dep
import { QueryClient, Resource, fetchUtils } from "./dep";

import { host } from "../http";

import authProvider from "../provider/authProvider";

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
        Authorization: `Bearer ${token}`,
      }),
    };
    return fetchUtils.fetchJson(`${host}${url}${queryString}`, options);
  },

  // Post
  post: async (url, { data, headers } = {}) => {
    const token = await getToken();

    const options = {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify(data),
    };
    return fetchUtils.fetchJson(`${host}${url}`, options);
  },
};
