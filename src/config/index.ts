export type Env = 'SAT' | 'SIT' | 'UAT' | 'LOCAL';

// 工厂模式创建配置对象
class ConfigFactory {
  static createConfig(env: Env) {
    switch (env) {
      case 'SAT':
        return new SatConfig();
      case 'SIT':
        return new SitConfig();
      case 'UAT':
        return new UatConfig();
      case 'LOCAL':
        return new LocalConfig();
      default:
        throw new Error('Invalid environment');
    }
  }
}

// 配置接口
export interface Config {
  getWebparaURL(): string;
  getParaInfoURL(): string;
  getDomain(): string;
}

// 具体环境配置类
class SatConfig implements Config {
  getWebparaURL() {
    return '/test/getWebpara';
  }

  getParaInfoURL() {
    return '/test2/getParaInfo';
  }

  getDomain() {
    return 'http://www.test-sat.com';
  }
}

class SitConfig implements Config {
  getWebparaURL() {
    return '/test/getWebpara3';
  }

  getParaInfoURL() {
    return '/test2/getParaInfo3';
  }

  getDomain() {
    return 'http://www.test-sit.com';
  }
}

class UatConfig implements Config {
  getWebparaURL() {
    return '/test/getWebpara4';
  }

  getParaInfoURL() {
    return '/test2/getParaInfo4';
  }

  getDomain() {
    return 'http://www.test-uat.com';
  }
}

// LOCAL环境的配置类
class LocalConfig implements Config {
  getWebparaURL() {
    return '/test/getWebparaLocal';
  }

  getParaInfoURL() {
    return '/test2/getParaInfoLocal';
  }

  getDomain() {
    return 'http://localhost';
  }
}

export default ConfigFactory;
