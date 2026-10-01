// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  //retries : 1,
  timeout : 100 * 1000,
  expect : {timeout : 70 * 1000,},
  reporter: 'html',
  
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure',
  },

});

