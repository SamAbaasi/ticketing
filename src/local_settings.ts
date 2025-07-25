// Please make sure to inform >>CI/CD<< team before modifing this sample
// And equivalent environment value
const envKey = 'preprod' // dev

const environment = {
  local: {
    cdnBasePath: 'https://cdn-cmp.mtnirancell.ir/assets/',
    apiBasePath: 'http://10.235.96.154:8003/',
    appBasePath: 'https://cmp.mtnirancell.ir',
  },
  dev: {
    cdnBasePath: 'https://dev-cdn-cmp.mtnirancell.ir/assets/',
    apiBasePath: 'https://cmp.mtnirancell.ir/api',
    appBasePath: 'https://cmp.mtnirancell.ir',
  },
  preprod: {
    cdnBasePath: 'https://preprd-cdn-cmp.irancell.ir/assets/',
    apiBasePath: 'https://cmp-preprd.irancell.ir/api',
    appBasePath: 'https://cmp-preprd.irancell.ir',
  },
  production: {
    cdnBasePath: 'https://prd-cdn-cmp.irancell.ir/assets/',
    apiBasePath: 'https://mybusiness.irancell.ir/api',
    appBasePath: 'https://mybusiness.irancell.ir',
  },
}
const CONFIG = {
  env: envKey,
  ...environment[envKey],
}

export default CONFIG
export const { env, apiBasePath, cdnBasePath } = CONFIG
