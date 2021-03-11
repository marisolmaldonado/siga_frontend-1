// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// export const URL = 'http://192.168.0.184:8000/';
export const URL = 'http://laravel-dev-backend.test/';

export const environment = {
    production: false,
    STORAGE_URL: URL + 'storage/',
    API_URL_AUTHENTICATION: URL + 'v1/authentication/',
    API_URL_IGNUG: URL + 'v1/ignug/',
    API_URL_ATTENDANCE: URL + 'v1/attendance/',
    API_URL_JOB_BOARD: URL + 'v1/job_board/',
    API_URL_WEB: URL + 'v1/web/',
    API_URL_TEACHER_EVAL: URL + 'v1/teacher_eval/',
    API_URL_COMMUNITY: URL + 'v1/community/',

    CLIENT_ID: '2',
    CLIENT_SECRET: 'aWutjlzle2OXOovBeCMR8aHY4h2CKM6B1Il87rW4',
    GRANT_TYPE: 'password',

    APP_ACRONYM: 'IGNUG',
    APP_NAME: 'SISTEMA DE GESTIÓN ACADÉMICO - ADMINISTRATIVO',
    APP_VERSION: '1.2.1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
