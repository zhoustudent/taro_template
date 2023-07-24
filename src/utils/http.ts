import Taro from '@tarojs/taro';

interface IConfig {
  baseURL?: string;
  timeout?: number;
  withCredentials?: boolean;
}

const defaultClientConfig = {
  baseURL: 'https://fk.jztgh.com:8081/api',
  timeout: 600000,
  withCredentials: true,
};

export class Client {
  private client: any;
  constructor(config: IConfig) {
    this.client = {
      ...defaultClientConfig,
      ...config,
    };
  }

  get(url: string, params: any = {}, option: any = {}, header?: any) {
    const curOption: any = {
      url: `${this.client.baseURL}${url}`,
      timeout: this.client.timeout,
      data: params,
      method: 'GET',
      ...this.setOption(url, params, option, header),
    };
    this.request(curOption);
  }

  post(url: string, params: any = {}, option: any = {}, header?: any) {
    
    const curOption = {
      method: 'POST',
      ...this.setOption(url, params, option, header),
    };
    return this.request(curOption);
  }

  request(option: any) {
    return Taro.request(option);
  }

  setOption(url: string, params?: any, option?: any, header?: any) {
    let _params = {};
    // 剔除无效参数
    for (let [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        _params[key] = value;
      }
    }

    return {
      url: `${this.client.baseURL}${url}`,
      timeout: this.client.timeout,
      credentials: 'include',
      data: _params,
      params: _params,
      header: {
        ...header,
      },
      headers: {
        ...header,
      },
      ...option,
    };
  }
}

// Taro.addInterceptor(() => {})  Taro拦截器

export default Client;
