// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// export const URL = 'http://192.168.0.184:8000/';
export const URL = 'http://laravel-dev-backend.test/';

export const environment = {
    production: false,
    STORAGE_URL: URL + 'storage/',
    API_URL_AUTHENTICATION: URL + 'v1/authentication/',
    API_URL_APP: URL + 'v1/app/',
    API_URL_ATTENDANCE: URL + 'v1/attendance/',
    API_URL_JOB_BOARD: URL + 'v1/job_board/',
    API_URL_WEB: URL + 'v1/web/',
    API_URL_TEACHER_EVAL: URL + 'v1/teacher_eval/',
    API_URL_COMMUNITY: URL + 'v1/community/',

    SYSTEM_ID: 1,
    CLIENT_ID: '1',
    CLIENT_SECRET: 'Mu2Y8xrDRwtDKxyz3pbazxpcEA5ljp8fJYDUpTYi',
    GRANT_TYPE: 'password',

    SITE_KEY: '6LcY8xAaAAAAAOTR95-UJ_zAeP9OWYPhlWg4_iFC',

    PUSHER_KEY: 'ASD1234FG',
    PUSHER_HOST: 'laravel-dev-backend.test',
    PUSHER_CLUSTER: 'mt1',
    PUSHER_PORT: '6001',
    PUSHER_URL: URL + 'api/broadcasting/auth',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
