// Use dep
import { QueryClient, Resource, fetchUtils } from "./dep";

import { host } from "../http";

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

// 创建 httpClient 对象
export const httpClient = {
  // Get
  get: (url, { params, headers = {} } = {}) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const options = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        ...headers,
        // Authorization: `Bearer ${yourAuthToken}`, // 示例认证头
      }),
    };
    return fetchUtils.fetchJson(`${host}${url}${queryString}`, options);
  },

  // Post
  post: (url, { data, headers } = {}) => {
    const options = {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
        // Authorization: `Bearer ${yourAuthToken}`, // 示例认证头
      }),
      body: JSON.stringify(data),
    };
    return fetchUtils.fetchJson(`${host}${url}`, options);
  },
};
