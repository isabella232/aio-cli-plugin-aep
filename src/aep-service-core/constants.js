/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const {getEnv} = require('./helpers')
var url = getEnv()
module.exports = {
  catalogBaseUrl: url,
  endPoints: {
    datasets: {
      resourcePath: '/catalog/dataSets/',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    batches: {
      resourcePath: '/catalog/batches/',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    classes: {
      resourcePath: '/schemaregistry/',
      resourceType: '/classes/',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    datatypes: {
      resourcePath: '/schemaregistry/',
      resourceType: '/datatypes/',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    mixins: {
      resourcePath: '/schemaregistry/',
      resourceType: '/mixins/',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    schemas: {
      resourcePath: '/schemaregistry/',
      resourceType: '/schemas/',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    stats: {
      resourcePath: '/schemaregistry/',
      resourceType: 'stats',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    sandboxes: {
      resourcePath: '/sandbox-management/',
      resourceType: 'sandboxes',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
    bulkUploads: {
      resourcePath: '/import/',
      resourcePathExport: '/export/',
      datasetPath: '/datasets/',
      pewviewPath: '/preview',
      resourceType: 'batches/',
      contentType: 'application/json',
      contentTypeBinary: 'application/octet-stream',
      parameters: {
        start: 'START',
        complete: 'COMPLETE',
        abort: 'ABORT',
        revert: 'REVERT'

      },
    },
    mappingSets: {
      resourcePath: '/conversion/',
      resourceType: 'mappingSets/',
      mappingsPath: '/mappings/',
      functionsRootPath: 'languages/el/',
      functionsValidate :'validate',
      functionsGetPath : 'functions',
      contentType: 'application/json',
      parameters: {
        limit: 'limit',
        start: 'start',
        orderBy: 'orderBy',
      },
    },
  },
}
