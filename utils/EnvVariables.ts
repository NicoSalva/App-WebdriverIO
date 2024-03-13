require('dotenv').config({ path: './envs/.env' });

const configEnv = {
    DB_ACCUMULATOR: {
        USER: process.env.DB_ACCUMULATOR_USER || '',
        PASSWORD: process.env.DB_ACCUMULATOR_PASSWORD || '',
        HOST: process.env.DB_ACCUMULATOR_HOST || '',
        NAME: process.env.DB_ACCUMULATOR_NAME || ''
    },
    DB_CLIENTS: {
        USER: process.env.DB_CLIENTS_USER || '',
        PASSWORD: process.env.DB_CLIENTS_PASSWORD || '',
        HOST: process.env.DB_CLIENTS_HOST || '',
        NAME: process.env.DB_CLIENTS_NAME || ''
    },
    DB_PEPA: {
        USER: process.env.DB_PEPA_USER || '',
        PASSWORD: process.env.DB_PEPA_PASSWORD || '',
        HOST: process.env.DB_PEPA_HOST || '',
        NAME: process.env.DB_PEPA_NAME || ''
    },
    DB_BACKO: {
        USER: process.env.DB_BACKO_USER || '',
        PASSWORD: process.env.DB_BACKO_PASSWORD || '',
        HOST: process.env.DB_BACKO_HOST || '',
        NAME: process.env.DB_BACKO_NAME || ''
    },
    DB_FRAUD_RULES: {
        USER: process.env.DB_FRAUD_RULES_USER || '',
        PASSWORD: process.env.DB_FRAUD_RULES_PASSWORD || '',
        HOST: process.env.DB_FRAUD_RULES_HOST || '',
        NAME: process.env.DB_FRAUD_RULES_NAME || ''
    },
    DB_LEVEL: {
        USER: process.env.DB_LEVEL_USER || '',
        PASSWORD: process.env.DB_LEVEL_PASSWORD || '',
        HOST: process.env.DB_LEVEL_HOST || '',
        NAME: process.env.DB_LEVEL_NAME || ''
    },
    DB_PPAY_QA_PROMOTION: {
        USER: process.env.DB_PPAY_QA_PROMOTION_USER || '',
        PASSWORD: process.env.DB_PPAY_QA_PROMOTION_PASSWORD || '',
        HOST: process.env.DB_PPAY_QA_PROMOTION_HOST || '',
        NAME: process.env.DB_PPAY_QA_PROMOTION_NAME || ''
    },
    DB_B2B_PAYMENT_STORE_QA: {
        USER: process.env.DB_B2B_PAYMENT_STORE_QA_USER || '',
        PASSWORD: process.env.DB_B2B_PAYMENT_STORE_QA_PASSWORD || '',
        HOST: process.env.DB_B2B_PAYMENT_STORE_QA_HOST || '',
        NAME: process.env.DB_B2B_PAYMENT_STORE_QA_NAME || ''
    },
    DB_PPAY_QA_LOANS: {
        USER: process.env.DB_PPAY_QA_LOANS_USER || '',
        PASSWORD: process.env.DB_PPAY_QA_LOANS_PASSWORD || '',
        HOST: process.env.DB_PPAY_QA_LOANS_HOST || '',
        NAME: process.env.DB_PPAY_QA_LOANS_NAME || ''
    },
    DB_PPAY_QA_TYC: {
        USER: process.env.DB_PPAY_QA_TYC_USER || '',
        PASSWORD: process.env.DB_PPAY_QA_TYC_PASSWORD || '',
        HOST: process.env.DB_PPAY_QA_TYC_HOST || '',
        NAME: process.env.DB_PPAY_QA_TYC_NAME || ''
    },
    DB_DEBIN_QA: {
        USER: process.env.DB_DEBIN_QA_USER || '',
        PASSWORD: process.env.DB_DEBIN_QA_PASSWORD || '',
        HOST: process.env.DB_DEBIN_QA_HOST || '',
        NAME: process.env.DB_DEBIN_QA_NAME || ''
    },
    BROWSER_STACK: {
        USER: process.env.BROWSERSTACK_USERNAME || '',
        PASSWORD: process.env.BROWSERSTACK_ACCESS_KEY || ''
    },
    BACKO_SERVICE: {
        USER: process.env.BACKOSERVICE_USER || '',
        PASSWORD: process.env.BACKOSERVICE_PASSWORD || ''
    },
    DATADOG_API: {
        API_KEY: process.env.DDOG_API_KEY || '',
        APP_KEY: process.env.DDOG_APP_KEY || '',
        HOST: process.env.DDOG_HOST || '',
    },
    DB_PPAY_QA_FINANCIAL: {
        USER: process.env.DDB_PPAY_QA_FINANCIAL_USER || '',
        PASSWORD: process.env.DB_PPAY_QA_FINANCIAL_PASSWORD || '',
        HOST: process.env.DB_PPAY_QA_FINANCIAL_HOST || '',
        NAME: process.env.DB_PPAY_QA_FINANCIAL_NAME || ''
    }
};

export default configEnv;