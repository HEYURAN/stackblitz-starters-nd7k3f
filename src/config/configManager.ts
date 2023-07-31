import ConfigFactory, { Config, Env } from '.';

// 单例模式管理环境配置实例
class ConfigManager {
  private static instance: ConfigManager;
  private config: Config;
  private defualtEnv: Env = 'LOCAL';

  private constructor() {
    // 默认使用LOCAL环境的配置
    this.config = ConfigFactory.createConfig(this.defualtEnv);
  }

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  setConfig(config: Config) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}

export default ConfigManager;
