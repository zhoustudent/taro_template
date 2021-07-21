import Taro from '@tarojs/taro';

interface IConfig {
  baseURL?: string;
  timeout?: number;
  withCredentials?: boolean;
}

const defaultClientConfig = {
  baseURL: '',
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

  get(url: string, params: any = {}, option: any = {}) {
    console.log('ssss');
    const curOption: any = {
      url: `${this.client.baseURL}${url}`,
      timeout: this.client.timeout,
      data: params,
      method: 'GET',
      ...option,
    };
    this.request(curOption);
  }

  request(option: any) {
    console.log(option);
    return Taro.request(option);
  }
}

// Taro.addInterceptor(() => {})  Taro拦截器

export default Client;
