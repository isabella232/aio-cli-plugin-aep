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
const nodeFetch = jest.requireActual('node-fetch')
const fetchMock = require('fetch-mock').sandbox()

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
})
module.exports = fetchMock

function mockResponseWithMethod(url, method, response) {
  fetchMock.mock((u, opts) => u === url && opts.method === method, response)
}

function mockResponseWithMethodBody(url, method, body, response) {
  fetchMock.mock((u, opts) => u === url && opts.method === method && opts.body === body, response)
}

let mockResponseForApi = {
  'abc': {
    'status': 'active',
    'inputFormat': {
      'format': 'parquet',
    },
    'createdUser': 'abc@techacct.adobe.com',
    'imsOrg': 'abc@AdobeOrg',
    'createdClient': 'abc',
    'updatedUser': 'abc@techacct.adobe.com',
    'version': '1.0.0',
    'created': 1576108528538,
    'updated': 1576108528538,
  },
}
mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/batches/', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/batches/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.get('https://platform.adobe.io/data/foundation/catalog/batches/abc', mockResponseForApi)
fetchMock.delete('https://platform.adobe.io/data/foundation/catalog/batches/abc', mockResponseForApi)
fetchMock.post('https://platform.adobe.io/data/foundation/catalog/batches/', mockResponseForApi)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/abc', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post('https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes/', mockResponseForApi)
fetchMock.delete('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/abc', mockResponseForApi)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/datatypes/', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/datatypes/abc', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/datatypes/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post('https://platform.adobe.io/data/foundation/schemaregistry/tenant/datatypes/', mockResponseForApi)
fetchMock.delete('https://platform.adobe.io/data/foundation/schemaregistry/global/datatypes/abc', mockResponseForApi)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/mixins/', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/mixins/abc', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/mixins/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post('https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/', mockResponseForApi)
fetchMock.delete('https://platform.adobe.io/data/foundation/schemaregistry/global/mixins/abc', mockResponseForApi)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/schemas/', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/schemas/abc', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/schemas/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post('https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/', mockResponseForApi)
fetchMock.delete('https://platform.adobe.io/data/foundation/schemaregistry/global/schemas/abc', mockResponseForApi)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/dataSets/', 'GET', mockResponseForApi)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/dataSets/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.get('https://platform.adobe.io/data/foundation/catalog/dataSets/abc', mockResponseForApi)
fetchMock.delete('https://platform.adobe.io/data/foundation/catalog/dataSets/abc', mockResponseForApi)
fetchMock.post('https://platform.adobe.io/data/foundation/catalog/dataSets/', mockResponseForApi)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/stats', 'GET', mockResponseForApi)


