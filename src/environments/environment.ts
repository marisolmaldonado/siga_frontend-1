// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const URL_API = 'http://siga_backend.test/v1/';
export const URL = 'http://siga_backend.test/';
export const WEB = 'http://127.0.0.1:8000/';

export const environment = {
    production: false,
    STORAGE_URL: 'http://siga_backend.test/storage/',
    WEB,
    API_URL_AUTHENTICATION: URL_API + 'authentication/',
    API_URL_APP: URL_API + 'app/',
    API_URL_ATTENDANCE: URL_API + 'attendance/',
    API_URL_JOB_BOARD: URL_API + 'job-board/',
    API_URL_WEB: URL_API + 'web/',
    API_URL_TEACHER_EVAL: URL_API + 'teacher_eval/',
    API_URL_COMMUNITY: URL_API + 'community/',
    SYSTEM_ID: 1,
    CLIENT_ID: '1',
    CLIENT_SECRET: 'nwgtM5Cvn1Q2BvVMfuG0FgWHwIpPEhppCytkldO5',

    GRANT_TYPE: 'password',

    SITE_KEY: 'QpKtUkaJ40HNd1Di74B0pKC6asgKzAxuTx69L9Nb',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
