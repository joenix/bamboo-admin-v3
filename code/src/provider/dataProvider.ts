// Use HttpClient
import { httpClient } from "../utils/kit";

// Use Api
import { api } from "../http/index";

// Test
import video from "../static/video/SampleVideo.mp4";

const defaultData = {
  data: [],
  total: 0,
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

const UserData = {
  data: [
    {
      id: "111",
      name: "张三",
      phone: "13655555556",
      address: "上海市徐汇区",
    },
    {
      id: "222",
      name: "李四",
      phone: "13655555556",
      address: "上海市徐汇区",
      avator: "",
    },
  ],
  total: "",
};

const InformationData = {
  data: [
    {
      id: "1",
      content: `<p>一场私密的交流会，一次因材施教的教学</p> <p>对于下一个机遇的预测：抓重点，找方向，确定性，可持续发展。收获一群良师益友同路人，从“小市值成长为亿万级别”之路。</p> <img src="https://oss.lhdd.club/pic/article_sample_1.jpeg" /> <p>跟着仇老师到底学习什么？</p> <p>仇老师多次强调读书不是附庸风雅，是学习思维！穷人与富人最大的差异在思维上，因为“思路决定出路，态度决定高度，格局决定结局”。</p> <img src="https://oss.lhdd.club/pic/article_sample_2.jpeg" /> <p>仇老师读了四万多本书，20多年进出口贸易经验，用脚丈量世界多地。真正做到“读万卷书，行万里路”。</p> <p>仇老师最擅长读书，育人和赚钱！</p> <img src="https://oss.lhdd.club/pic/article_sample_3.jpeg" /> <p>仇老师说学习是为了生活，学习是为了能赚到钱，把家养好，把父母孝敬好。</p> <p>仇老师学富五车，通过学习实现了从1570元起家到财富自由，而今想把半生所学，和几十年的读书赚钱经验教给有缘的人。</p> <p>仇老师的目标是培养600个院士级别的人才和一万个亿万富翁！</p> <p>你是否想成为那个确定要“赢”的人？</p> <img src="https://oss.lhdd.club/pic/article_sample_4.jpeg" /> <p>仇老师之前分享的三气合一气即：体气+文气+才气=财气。</p> <p>财气由何而来？三气汇聚自然而生。</p> <p>功夫要落地，功夫要上身。</p> <img src="https://oss.lhdd.club/pic/article_sample_5.jpeg" /> <p>课堂上，老师讲的滔滔不绝，如“黄河之水天上来”；学员们沉浸其中，如“仙人抚我顶”，豁然开朗。</p> <img src="https://oss.lhdd.club/pic/article_sample_6.jpeg" /> <p>仇老师讲的都是肺腑之言，学员们听的深情投入。</p> <img src="https://oss.lhdd.club/pic/article_sample_7.jpeg" /> <p>老师授课传真本领，学员们十一假期来的超值！</p> <img src="https://oss.lhdd.club/pic/article_sample_8.jpeg" /> <p>各位学友，专注当下，沉醉其中！</p> <img src="https://oss.lhdd.club/pic/article_sample_9.jpeg" /> <img src="https://oss.lhdd.club/pic/article_sample_10.jpeg" /> <p>这个假期学员们收获满满，正能量爆棚。</p> <img src="https://oss.lhdd.club/pic/article_sample_11.jpeg" /> <p>线下学习，和仇老师面对面交流是得到老师传真本领的机会，能接收老师的高能量，真智慧，打开思维的大门。</p> <p>让我们相约下一期仇老师线下课，跟着老师长期熏习，改变思维方式，改变命运。</p>`,
      name: "生鲜类目",
      createTime: 1710965372429,
      updateTime: 1757308076757,
    },
    {
      id: "2",
      content: "户外",
      name: "户外类目",
      createTime: 1710965372429,
      updateTime: 1757308076757,
    },
  ],
  total: 2,
};

const BookData = {
  data: [
    {
      id: "111",
      content: "生鲜",
      image: {
        src: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      },
      bookName: "孔子",
      url: "http://www.mengzi.com",
    },
    {
      id: "222",
      content: "户外",
      image: {
        src: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      },
      bookName: "孟子",
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
      avatar: {
        src: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      },
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
      avatar: {
        src: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      },
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
      avatar: {
        src: "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
      },
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
      img: {
        src: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      },
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
      img: {
        src: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      },
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
      bookId: "111",
      bookName: "111",
      count: "10",
    },
    {
      id: "2",
      bookId: "222",
      bookName: "222",
      count: "4",
    },
  ],
  total: 2,
};

const GiftData = {
  data: [
    {
      id: "1",
      name: "礼品名称1",
      credit: "10",
      image: {
        src: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
        title: "礼品名称1",
      },
    },
    {
      id: "2",
      name: "礼品名称2",
      credit: "20",
      image: {
        src: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
        title: "礼品名称2",
      },
    },
  ],
  total: 2,
};

const GiftExchangeData = {
  data: [
    {
      id: "1",
      name: "张三",
      phone: "13655555556",
      address: "上海市徐汇区",
      giftId: "1",
      giftName: "礼品名称1",
    },
    {
      id: "2",
      name: "李四",
      phone: "13655555557",
      address: "上海市青浦区",
      giftId: "2",
      giftName: "礼品名称2",
    },
  ],
  total: 2,
};

// AataProvider
export const dataProvider = {
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
      case "Gift":
        return Promise.resolve(GiftData);
      case "GiftExchange":
        return Promise.resolve(GiftExchangeData);
      case "User":
        return Promise.resolve(UserData);
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
      case "Gift":
        _d = GiftData;
        return Promise.resolve({ data: _d.data.find((x) => x.id === id) });
      case "GiftExchange":
        _d = GiftExchangeData;
        return Promise.resolve({ data: _d.data.find((x) => x.id === id) });
      default:
        return Promise.resolve({ data: {} });
    }
  },
  getMany: (resource, params) => {
    return Promise.resolve();
  },
  getManyReference: (resource, params) => {
    return Promise.resolve();
  },
  // 新建
  create: async (resource, params) => {
    console.log("params", resource, params);
    const res = await httpClient.post(api[resource].create, params);

    console.log("create", res);

    return Promise.resolve({
      data: {
        // id - required
        id: "199999",
      },
    });
  },
  // 编辑
  update: async (resource, params) => {
    const { data, id, previousData } = params;
    console.log(1213, resource, params);
    await httpClient.post(`${api[resource].update}`, {
      data: {
        ...data,
        id,
      },
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
    console.log("delete", resource, params);
    await httpClient.post(`${api[resource].delete}`, {
      data: {
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
