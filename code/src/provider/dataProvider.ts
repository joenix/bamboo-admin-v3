// Use HttpClient
import { httpClient } from "../utils/kit";

// Use Api
import { api } from "../http/index";

// Test
import video from "../SampleVideo.mp4";

// AataProvider
export const dataProvider = {
  // 新建 - 返回新建的id
  create: async (resource, params) => {
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
      total: 2,
    };

    switch (resource) {
      case "Banner":
        // mock
        const d1 = {
          data: [
            {
              id: "111",
              content: "生鲜",
              img: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
              video,
              name: "生鲜类目",
              index: 0,
              used: true,
              link: "http://www.baidu.com",
              linkType: "1",
            },
            {
              id: "222",
              content: "户外",
              img: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
              video,
              name: "户外类目",
              index: 1,
              used: false,
              link: "wx/login",
              linkType: "2",
            },
            {
              id: "333",
              content: "亲子",
              img: "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
              video,
              name: "亲子类目",
              index: 2,
              used: true,
              link: "http://www.google.com",
              linkType: "1",
            },
          ],
          total: 3,
        };
        return Promise.resolve(d1);
      case "Material":
        // mock
        const d2 = {
          data: [
            {
              id: "111",
              type: "1",
              url: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
              name: "图片名字",
              content: "图片内容",
              createdAt: "2024/01/20",
              updatedAt: "2024/01/22",
            },
            {
              id: "222",
              type: "2",
              url: video,
              name: "视频名字",
              content: "视频内容",
              createdAt: "2024/01/20",
              updatedAt: "2024/01/22",
            },
          ],
          total: 3,
        };
        return Promise.resolve(d2);
      default:
        return Promise.resolve(data);
    }
  },

  // 获取某条数据
  getOne: (resource, params) => {
    console.log("params", params);
    switch (resource) {
      case "Banner":
        const { id } = params;
        // 走接口获取单个数据

        const data2 = [
          {
            id: "111",
            content: "生鲜",
            img: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
            video,
            name: "生鲜类目",
            index: 0,
            used: true,
            link: "http://www.baidu.com",
            linkType: "1",
          },
          {
            id: "222",
            content: "户外",
            img: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
            video,
            name: "户外类目",
            index: 1,
            used: false,
            link: "wx/login",
            linkType: "2",
          },
          {
            id: "333",
            content: "亲子",
            img: "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
            video,
            name: "亲子类目",
            index: 2,
            used: true,
            link: "http://www.google.com",
            linkType: "1",
          },
        ];
        const d = data2.find((x) => x.id === id);

        return Promise.resolve({ data: d });
      default:
        return Promise.resolve(data);
    }
  },
  getMany: (resource, params) => {
    return Promise.resolve();
  },
  getManyReference: (resource, params) => {
    return Promise.resolve();
  },
  update: (resource, params) => {
    console.log("update", params);
    const { data, id, previousData } = params;
    return Promise.resolve();
  },
  updateMany: (resource, params) => Promise.resolve(),

  // 删除单个
  delete: (resource, params) => {
    console.log("delete", params);
    switch (resource) {
      case "Banner":
        const { id } = params;
        // 删除单个接口
        return Promise.resolve();
      default:
        return Promise.resolve();
    }
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
