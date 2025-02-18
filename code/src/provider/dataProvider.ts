// Use HttpClient
import { httpClient } from "../utils/kit";

// Use Api
import { api } from "../http/index";

// Test
import video from "../static/video/SampleVideo.mp4";

const defaultData = {
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

const BannerData = {
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

let MaterialData = {
  data: [],
  total: "",
};

const InformationData = {
  data: [
    {
      id: "111",
      content: "生鲜",
      img: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      video,
      name: "生鲜类目",
    },
    {
      id: "222",
      content: "户外",
      img: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      video,
      name: "户外类目",
    },
    {
      id: "333",
      content: "亲子",
      img: "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
      video,
      name: "亲子类目",
    },
  ],
  total: 3,
};

const BookData = {
  data: [
    {
      id: "111",
      content: "生鲜",
      img: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      name: "孔子",
      url: "http://www.mengzi.com",
    },
    {
      id: "222",
      content: "户外",
      img: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      name: "孟子",
      url: "http://www.mengzi.com",
    },
  ],
  total: 2,
};

const TeachData = {
  data: [
    {
      id: "1",
      type: "1",
      name: "章三",
      age: 20,
      province: "上海",
      city: "上海市",
      area: "宝山区",
      gender: "1",
      content: "我是教体育的..",
      avatar:
        "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
    },
    {
      id: "2",
      type: "2",
      name: "李四",
      age: 34,
      province: "上海",
      city: "上海市",
      area: "嘉定区",
      gender: "1",
      content: "我是教柔道的..",
      avatar:
        "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
    },
    {
      id: "3",
      type: "3",
      name: "王五",
      age: 29,
      province: "上海",
      city: "上海市",
      area: "静安区",
      gender: "0",
      content: "我是教芭蕾舞的..",
      avatar:
        "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
    },
  ],
  total: 3,
};

const SchoolData = {
  data: [
    {
      id: "1",
      type: "1",
      name: "新东方培训",
      province: "上海",
      city: "上海市",
      area: "宝山区",
      content: "我是机构",
      nature: "",
      school_type: "",
      img: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
    },
    {
      id: "2",
      type: "2",
      name: "清华",
      province: "上海",
      city: "上海市",
      area: "嘉定区",
      content: "我是学校",
      nature: "211大学",
      school_type: "公立学校",
      img: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
    },
  ],
  total: 2,
};

const TipsData = {
  data: [
    {
      id: "1",
      name: "tip1",
      content: "我是tip1",
      img: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      video,
    },
    {
      id: "2",
      name: "tip2",
      content: "我是tip2",
      img: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      video,
    },
  ],
  total: 2,
};

const RoleData = {
  data: [
    {
      id: "1",
      name: "张三",
      description: "体育老师",
    },
    {
      id: "2",
      name: "李四",
      description: "化学老师",
    },
  ],
  total: 2,
};

const CodeData = {
  data: [
    {
      id: "1",
      bookid: "111",
      count: "10",
    },
    {
      id: "2",
      bookid: "222",
      count: "4",
    },
  ],
  total: 2,
};

// AataProvider
export const dataProvider = {
  // 新建
  create: async (resource, params) => {
    console.log("params", params);
    const res = await httpClient.post(api[resource].create, params);

    console.log("create", res);

    return Promise.resolve({
      data: {
        // id - required
        id: "199999",
      },
    });
  },

  // 获取列表
  getList: async (resource, params) => {
    // const { msg } = await httpClient.post(api[resource].getall);

    // const data = { data: msg.data, total: msg.totalPages };

    switch (resource) {
      case "Banner":
        return Promise.resolve(BannerData);
      case "Material":
        const { msg } = await httpClient.post(api[resource].getall);

        const data = { data: msg.data, total: msg.totalPages };
        MaterialData = data;
        return Promise.resolve(data);
      case "Information":
        return Promise.resolve(InformationData);
      case "Book":
        return Promise.resolve(BookData);
      case "Teach":
        return Promise.resolve(TeachData);
      case "School":
        return Promise.resolve(SchoolData);
      case "Tips":
        return Promise.resolve(TipsData);
      case "Role":
        return Promise.resolve(RoleData);
      case "Code":
        return Promise.resolve(CodeData);
      default:
        return Promise.resolve(defaultData);
    }
  },

  // 获取某条数据
  getOne: async (resource, params) => {
    const { id } = params;

    let _d = null;
    switch (resource) {
      case "Banner":
        _d = BannerData;
        return Promise.resolve({ data: _d.data.find((x) => x.id == id) });
      case "Material":
        _d = MaterialData;
        return Promise.resolve({ data: _d?.data?.find((x) => x.id == id) });
      case "Information":
        _d = InformationData;
        return Promise.resolve({ data: _d.data.find((x) => x.id == id) });
      case "Book":
        _d = BookData;
        return Promise.resolve({ data: _d.data.find((x) => x.id == id) });
      case "Teach":
        _d = TeachData;
        return Promise.resolve({ data: _d.data.find((x) => x.id == id) });
      case "School":
        _d = SchoolData;
        return Promise.resolve({ data: _d.data.find((x) => x.id == id) });
      case "Tips":
        _d = TipsData;
        return Promise.resolve({ data: _d.data.find((x) => x.id === id) });
      case "Role":
        _d = RoleData;
        return Promise.resolve({ data: _d.data.find((x) => x.id === id) });
      case "Code":
        _d = CodeData;
        return Promise.resolve({ data: _d.data.find((x) => x.id === id) });
      default:
        return Promise.resolve(defaultData);
    }
  },
  getMany: (resource, params) => {
    return Promise.resolve();
  },
  getManyReference: (resource, params) => {
    return Promise.resolve();
  },
  // 编辑
  update: async (resource, params) => {
    const { data, id, previousData } = params;

    await httpClient.post(`${api[resource].update}?id=${id}`, {
      data,
    });

    return Promise.resolve({
      data: {
        // id - required
        id,
      },
    });
  },
  updateMany: (resource, params) => Promise.resolve(),

  // 删除单个
  delete: async (resource, params) => {
    const { id } = params;

    await httpClient.post(`${api[resource].update}?id=${id}`, {
      data: {
        delete: true,
        id,
      },
    });

    return Promise.resolve({
      id,
    });
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
