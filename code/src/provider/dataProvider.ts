// Use HttpClient
import { httpClient } from "../utils/kit";

// Use Api
import { api } from "../http/index";

// AataProvider
export const dataProvider = {
  // 新建 - 返回新建的id
  create: async (resource, params) => {
    // Banner
    //     {
    //     "content":"wdwa",
    //     "img":"1",
    //     "video":"1",
    //     "name":"dwaadwaa",
    //     "index":1,
    //     "used":true
    // }
    // const res = await httpClient.post(api[resource].create, { data: params });

    // console.log("res", res);

    return Promise.resolve({
      data: {
        // id - required
        id: 123,
      },
    });
  },

  // 获取列表
  getList: async (resource, params) => {
    // const res = await httpClient.get(api[resource].getall);

    // console.log("res", res);

    const data = {
      data: [
        {
          id: 1,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
              lat: "-43.9509",
              lng: "-34.4618",
            },
          },
          phone: "010-692-6593 x09125",
          website: "http://www.baidu.com",
          company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
          },
          isAdult: false,
          rank: "A",
          birthday: "2024-03-02",
          avator:
            "https://wx4.sinaimg.cn/mw690/008bDdGsly1hrm34fxonfj30pf1co0wz.jpg",
          money: 27,
          signature: "<b style='color:red'>三思而后行</>",
          hobby: "nija",
          file: "https://example.com/files/doc1.pdf",
          tags: [
            { uid: 1, name: "admin" },
            { uid: 2, name: "user" },
          ],
        },
        {
          id: 2,
          name: "williamding",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
              lat: "-43.9509",
              lng: "-34.4618",
            },
          },
          phone: "010-692-6593 x09125",
          website: "http://www.baidu.com",
          company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
          },
          isAdult: false,
          rank: "A",
          birthday: "2024-03-02",
          avator:
            "https://wx4.sinaimg.cn/mw690/008bDdGsly1hrm34fxonfj30pf1co0wz.jpg",
          money: 27,
          signature: "<b style='color:red'>三思而后行</>",
          hobby: "nija",
          file: "https://example.com/files/doc1.pdf",
          tags: [
            { uid: 1, name: "admin" },
            { uid: 2, name: "user" },
          ],
        },
      ],
      total: 8,
    };

    return Promise.resolve(data);
  },
  getOne: (resource, params) => {
    return Promise.resolve();
  },
  getMany: (resource, params) => {
    return Promise.resolve();
  },
  getManyReference: (resource, params) => {
    return Promise.resolve();
  },
  updateMany: (resource, params) => Promise.resolve(),
  delete: (resource, params) => {
    return Promise.resolve();
  },

  // 批量删除 - 返回被删除的id
  deleteMany: (resource, params) => {
    return Promise.resolve({
      data: [
        {
          // id - required
          id: 123,
        },
      ],
    });
  },
};
