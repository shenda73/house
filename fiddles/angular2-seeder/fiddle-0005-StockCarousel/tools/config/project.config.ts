import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;


    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      {src: 'jszip/dist/jszip.min.js', inject: true, vendor: true},
      {src: 'bootswatch/dist/darkly/bootstrap.min.css', inject: true, vendor: true }
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)

    this.SYSTEM_CONFIG_DEV.paths['@ng-bootstrap/ng-bootstrap'] =
      `${this.APP_BASE}node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js`;

    this.SYSTEM_BUILDER_CONFIG.packages['@ng-bootstrap/ng-bootstrap'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(
      join('node_modules', '@ng-bootstrap', '*', 'package.json')
    );

    this.SYSTEM_BUILDER_CONFIG.packages['devextreme-angular'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
