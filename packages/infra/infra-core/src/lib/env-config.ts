declare const process: {
  env: {
    SHIPFAST_BASIC_AUTH: string;
    SHIPFAST_DOMAIN_API: string;
    SHIPFAST_DOMAIN_WEB_APP: string;
    SHIPFAST_DOMAIN_CDN: string;
    SHIPFAST_DOMAIN_DOCS: string;
    SHIPFAST_DOMAIN_WWW: string;
    SHIPFAST_DOMAIN_ADMIN_PANEL: string;
    SHIPFAST_CLOUDFRONT_CERTIFICATE_ARN: string;
    SHIPFAST_CERTIFICATE_DOMAIN: string;
    SHIPFAST_LOAD_BALANCER_CERTIFICATE_ARN: string;
    SHIPFAST_HOSTED_ZONE_ID: string;
    SHIPFAST_HOSTED_ZONE_NAME: string;
    SHIPFAST_DEPLOY_BRANCHES: string;
    PROJECT_NAME: string;
    ENV_STAGE: string;
    VERSION: string;
    PROJECT_ROOT_DIR: string;
    SHIPFAST_TOOLS_ENABLED: string;
    SHIPFAST_TOOLS_BASIC_AUTH: string;
    SHIPFAST_TOOLS_HOSTED_ZONE_NAME: string;
    SHIPFAST_TOOLS_HOSTED_ZONE_ID: string;
    SHIPFAST_TOOLS_DOMAIN_VERSION_MATRIX: string;
    SHIPFAST_BACKEND_BASE_IMAGE: string;
    SHIPFAST_WORKERS_BASE_IMAGE: string;
  };
};

export interface EnvConfigHostedZone {
  id: string;
  name: string;
}

interface EnvConfigFileDomains {
  adminPanel: string;
  api: string;
  webApp: string;
  docs: string;
  www: string;
  cdn: string;
}

interface ToolsDomains {
  versionMatrix: string | undefined;
}

export interface ToolsConfig {
  enabled: boolean;
  basicAuth: string | undefined;
  hostedZone: EnvConfigHostedZone;
  domains: ToolsDomains;
}

interface CertificatesConfig {
  cloudfrontCertificateArn: string;
  loadBalancerCertificateArn: string;
  domain: string;
}

interface EnvironmentVariables {
  [name: string]: string;
}

interface WebAppConfig {
  envVariables: EnvironmentVariables;
}

interface DockerImages {
  backendBaseImage: string;
  workersBaseImage: string;
}

export interface EnvironmentSettings {
  appBasicAuth: string | null | undefined;
  deployBranches: Array<string>;
  domains: EnvConfigFileDomains;
  envStage: string;
  hostedZone: EnvConfigHostedZone;
  projectRootDir: string;
  projectName: string;
  projectEnvName: string;
  tools: ToolsConfig;
  version: string;
  webAppEnvVariables: EnvironmentVariables;
  certificates: CertificatesConfig;
  dockerImages: DockerImages;
}

interface ConfigFileContent {
  toolsConfig: ToolsConfig;
  webAppConfig: WebAppConfig;
}

export interface EnvConfigFileContent {
  deployBranches: Array<string>;
  hostedZone: EnvConfigHostedZone;
  basicAuth: string | null | undefined;
  domains: EnvConfigFileDomains;
  webAppConfig: WebAppConfig;
  certificates: CertificatesConfig;
  dockerImages: DockerImages;
}

async function readConfig(): Promise<ConfigFileContent> {
  return {
    webAppConfig: {
      envVariables: {},
    },
    toolsConfig: {
      enabled: process.env.SHIPFAST_TOOLS_ENABLED === 'true',
      basicAuth: process.env.SHIPFAST_TOOLS_BASIC_AUTH,
      hostedZone: {
        id: process.env.SHIPFAST_TOOLS_HOSTED_ZONE_ID || '',
        name: process.env.SHIPFAST_TOOLS_HOSTED_ZONE_NAME || '',
      },
      domains: {
        versionMatrix: process.env.SHIPFAST_TOOLS_DOMAIN_VERSION_MATRIX,
      },
    },
  };
}

async function readEnvConfig(): Promise<EnvConfigFileContent> {
  return {
    webAppConfig: {
      envVariables: {},
    },
    basicAuth: process.env.SHIPFAST_BASIC_AUTH,
    domains: {
      api: process.env.SHIPFAST_DOMAIN_API ?? '',
      webApp: process.env.SHIPFAST_DOMAIN_WEB_APP ?? '',
      cdn: process.env.SHIPFAST_DOMAIN_CDN ?? '',
      docs: process.env.SHIPFAST_DOMAIN_DOCS ?? '',
      www: process.env.SHIPFAST_DOMAIN_WWW ?? '',
      adminPanel: process.env.SHIPFAST_DOMAIN_ADMIN_PANEL ?? '',
    },
    certificates: {
      cloudfrontCertificateArn: process.env.SHIPFAST_CLOUDFRONT_CERTIFICATE_ARN ?? '',
      domain: process.env.SHIPFAST_CERTIFICATE_DOMAIN ?? '',
      loadBalancerCertificateArn:
        process.env.SHIPFAST_LOAD_BALANCER_CERTIFICATE_ARN ?? '',
    },
    hostedZone: {
      id: process.env.SHIPFAST_HOSTED_ZONE_ID ?? '',
      name: process.env.SHIPFAST_HOSTED_ZONE_NAME ?? '',
    },
    deployBranches: process.env.SHIPFAST_DEPLOY_BRANCHES?.split(',') ?? [],
    dockerImages: {
      backendBaseImage: process.env.SHIPFAST_BACKEND_BASE_IMAGE ?? '',
      workersBaseImage: process.env.SHIPFAST_WORKERS_BASE_IMAGE ?? '',
    },
  };
}

export async function loadEnvSettings(): Promise<EnvironmentSettings> {
  const projectName = process.env.PROJECT_NAME;
  const envStage = process.env.ENV_STAGE;
  const version = process.env.VERSION;

  if (!envStage) {
    throw new Error('Environmental variable ENV_STAGE is undefined!');
  }

  if (!version) {
    throw new Error('Environmental variable VERSION is undefined!');
  }

  const config = await readConfig();
  const envConfig = await readEnvConfig();

  return {
    envStage,
    projectName,
    version,
    projectEnvName: `${projectName}-${envStage}`,
    projectRootDir: process.env.PROJECT_ROOT_DIR,
    tools: config.toolsConfig,
    appBasicAuth: envConfig.basicAuth,
    hostedZone: envConfig.hostedZone,
    domains: envConfig.domains,
    deployBranches: envConfig.deployBranches,
    webAppEnvVariables: {
      ...(config?.webAppConfig?.envVariables || {}),
      ...(envConfig?.webAppConfig?.envVariables || {}),
    },
    certificates: envConfig.certificates,
    dockerImages: envConfig.dockerImages,
  };
}
