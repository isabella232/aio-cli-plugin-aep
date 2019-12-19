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
const fetch = require('node-fetch')
const request = require('request')
const {endPoints, catalogBaseUrl} = require('./constants')
//const BaseCommand = require('../../../src/commands/aep/about')
// printf "$(aio autocomplete:script bash)" >> ~/.bashrc; source ~/.bashrc
let Client = {
  tenantName: null,
  accessToken: null,
  apiKey: null,

  init: function (config = null) {
    if (config) {
      this.tenantName = config.tenantName
      this.accessToken = config.accessToken
      this.apiKey = config.apiKey
    }
    return true
  },

  prepareHeader: function (contentType = null, accept = null) {
    headers = {
      'authorization': `Bearer ` + this.accessToken,
      'cache-control': 'no-cache',
      'x-api-key': this.apiKey,
      'x-gw-ims-org-id': this.tenantName,
      'Content-Type': contentType,
      'Accept': accept,
    }
    return headers
  },

  _doRequest: async function (path, method, contentType, body = null, accept = null) {
    const options = {
      method: method,
      headers: this.prepareHeader(contentType, accept),
    }
    if (method !== 'GET' && (body !== null || body !== undefined)) {
      options.body = JSON.stringify(body)
    }
    return fetch(path, options)
  },

  get: async function (path, contentType, accept = null) {
    return this._doRequest(path, 'GET', contentType, null, accept)
  },

  put: async function (path, contentType, body) {
    return this._doRequest(path, 'PUT', contentType, body)
  },

  post: async function (path, contentType, body, accept = null) {
    return this._doRequest(path, 'POST', contentType, body, accept)
  },

  delete: async function (path, contentType, accept = null) {
    return this._doRequest(path, 'DELETE', contentType, null, accept)
  },

  //batches signature

  listBatches: async function (limit = null, start = null, orderBy = null) {
    const result = await this._listBatches(limit, start, orderBy)
    return (result)
  },

  getBatch: async function (batchId) {
    const result = await this._getBatch(batchId)
    return (result)
  },

  createBatch: async function (datasetId, fileType) {
    const result = await this._createBatch(datasetId, fileType)
    return (result)
  },

  deleteBatch: async function (batchId) {
    const result = await this._deleteBatch(batchId)
    return (result)
  },


//datasets signature

  listDatasets: async function (limit = null, start = null, orderBy = null) {
    const result = await this._listDatasets(limit, start, orderBy)
    return (result)
  },

  getDataset: async function (datasetId) {
    const result = await this._getDataset(datasetId)
    return (result)
  },

  createDataset: async function (name, description, xdm) {
    const result = await this._createDataset(name, description, xdm)
    return (result)
  },

  deleteDataset: async function (datasetId) {
    const result = await this._deleteDataset(datasetId)
    return (result)
  },

  //classes signature

  listClasses: async function (limit = null, start = null, orderBy = null, container = null) {
    return Client._listClasses(limit, start, orderBy, container)
  },

  getClass: async function (classId, container) {
    return Client._getClass(classId, container)
  },

  createClass: async function (mixin, title, description, baseClass, container) {
    return Client._createClass(mixin, title, description, baseClass, container)
  },

  deleteClass: async function (classId, container) {
    return Client._deleteClass(classId, container)
  },

  //datatypes signature

  listDatatypes: async function (limit = null, start = null, orderBy = null, container = null) {
    return Client._listDatatypes(limit, start, orderBy, container)
  },

  getDatatype: async function (datatypeId, container) {
    return Client._getDatatype(datatypeId, container)
  },

  createDatatype: async function (title, description, container, propName, propValue) {
    return Client._createDatatype(title, description, container, propName, propValue)
  },

  deleteDatatype: async function (datatypeId, container) {
    return Client._deleteDatatype(datatypeId, container)
  },

  //mixins signature

  listMixins: async function (limit = null, start = null, orderBy = null, container = null) {
    const result = await this._listMixins(limit, start, orderBy, container)
    return (result)
  },

  getMixin: async function (mixinId, container) {
    const result = await this._getMixin(mixinId, container)
    return (result)
  },

  createMixin: async function (classId, title, description, container, propName, propValue, organization) {
    const result = await this._createMixin(classId, title, description, container, propName, propValue, organization)
    return (result)
  },

  deleteMixin: async function (mixinId, container) {
    const result = await this._deleteMixin(mixinId, container)
    return (result)
  },


  //schemas signature

  createSchema: async function (mixin, title, description, baseClass, container) {
    return Client._createSchema(mixin, title, description, baseClass, container)
  },

  listSchemas: async function (limit = null, start = null, orderBy = null, container = null) {
    const result = await this._listSchemas(limit, start, orderBy, container)
    return (result)
  },

  getSchema: async function (schemaId, container) {
    const result = await this._getSchema(schemaId, container)
    return (result)
  },

  deleteSchema: async function (schemaId, container) {
    const result = await this._deleteSchema(schemaId, container)
    return (result)
  },

  listStats: async function () {
    const result = await this._listStats()
    return (result)
  },

//datasets implementation

  _listDatasets: async function (limit, start, orderBy) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.datasets.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.datasets.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.datasets.parameters.orderBy, orderBy)
    }
    return this.get(`${baseUrl.toString()}`, endPoints.datasets.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datasets: ${res.url} (${res.status} ${res.statusText})`)
    })
  },

  _createDataset: async function (name, description, xdm) {
    request.post({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
      },
      url: new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}`).toString(),
      body: JSON.stringify({
        name: name,
        description: description,
        schemaRef:
          {
            id: xdm,
            contentType: 'application/vnd.adobe.xed-full+json; version=1',
          },
      }),
    }, function (error, response, body) {
      console.log(body)
    })
  },

  _createDataset: async function (name, description, xdm) {
    request.post({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
      },
      url: new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}`).toString(),
      body: JSON.stringify({
        name: name,
        description: description,
        schemaRef:
          {
            id: xdm,
            contentType: 'application/vnd.adobe.xed-full+json; version=1',
          },
      }),
    }, function (error, response, body) {
      console.log(body)
    })
  },

  _getDataset: async function (datasetId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}` + datasetId)
    return this.get(`${baseUrl.toString()}`, endPoints.datasets.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datasets: ${res.url} (${res.status} ${res.statusText}`)
    })
  },

  _deleteDataset: async function (datasetId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}` + datasetId)
    return this.delete(`${baseUrl.toString()}`, endPoints.datasets.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datasets: ${res.url} (${res.status} ${res.statusText}`)
    })
  },



  //batches implementation

  _listBatches: async function (limit, start, orderBy) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.batches.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.batches.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.batches.parameters.orderBy, orderBy)
    }
    return this.get(`${baseUrl.toString()}`, endPoints.batches.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource batches: ${res.url} (${res.status} ${res.statusText})`)
    })
  },

  _createBatch: async function (datasetId, fileType) {
    const createBatchUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}`)
    const body = {
      datasetId: datasetId,
      status: `active`,
      inputFormat:
        {
          format: fileType,
        },
    }
    return this.post(`${createBatchUrl.toString()}`, endPoints.batches.contentType, body).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(`Cannot create batch: ${res.url} ${JSON.stringify(body)} (${res.status} ${res.statusText})`)
    })

  },

  _getBatch: async function (batchId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}` + batchId)
    return this.get(`${baseUrl.toString()}`, endPoints.batches.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource batches: ${res.url} (${res.status} ${res.statusText}`)
    })
  },

  _deleteBatch: async function (batchId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}` + batchId)
    return this.delete(`${baseUrl.toString()}`).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource batches: ${res.url} (${res.status} ${res.statusText}`)
    })
  },


  //classes implementaion

  _listClasses: async function (limit, start, orderBy, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.classes.resourcePath}${container}${endPoints.classes.resourceType}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.batches.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.batches.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.batches.parameters.orderBy, orderBy)
    }
    return this.get(`${baseUrl.toString()}`, endPoints.batches.contentType, 'application/vnd.adobe.xed-full+json').then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource classes: ${res.url} (${res.status} ${res.statusText})`)
    })
  },

  _createClass: async function (mixin, title, description, baseClass, container) {
    var metaExtends = [mixin, baseClass]
    var metExtend = 'meta:extends'
    const url =  new URL(`${catalogBaseUrl}${endPoints.classes.resourcePath}${container}${endPoints.classes.resourceType}`)
      const body = {
        title: title,
        description: description,
        type: 'object',
        [metExtend]: metaExtends,
        allOf: [{
          $ref: mixin,
          properties: {},
        },
          {
            $ref: baseClass,
            properties: {},
          }],
      }
    return this.post(`${url.toString()}`, endPoints.batches.contentType, body, 'application/vnd.adobe.xed-full+json').then((res) => {
      if (res.ok) return res.json()
      else throw new Error(`Cannot create class: ${res.url} ${JSON.stringify(body)} (${res.status} ${res.statusText})`)
    })

  },

  _getClass: async function (classId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.classes.resourcePath}${container}${endPoints.classes.resourceType}${classId}`)
    return this.get(`${baseUrl.toString()}`, endPoints.classes.contentType, 'application/vnd.adobe.xed-full-notext+json; version=1').then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource classes: ${res.url} (${res.status} ${res.statusText} ${res.toString()}`)
    })
  },


  // _deleteClass: async function (classId, container) {
  //   let baseUrl = new URL(`${catalogBaseUrl}${endPoints.classes.resourcePath}${container}${endPoints.classes.resourceType}${classId}`)
  //   return this.delete(`${baseUrl.toString()}`, endPoints.classes.contentType, 'application/vnd.adobe.xed-full+json').then((res) => {
  //     if (res.status === 204 || res.status === 200) {
  //       console.log('Successfully deleted class ' + classId)
  //     } else throw new Error(`Cannot fulfill request on resource classes: ${res.url} (${res.status} ${res.statusText}`)
  //   })
  // },

  _deleteClass: async function (classId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.classes.resourcePath}${container}${endPoints.classes.resourceType}${classId}`)
    request.delete({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      if (response.statusCode === 204 || response.statusCode === 200) {
        console.log('Successfully deleted class ' + classId)
      } else {
        const object = JSON.parse(body)
        console.dir(object, {depth: null, colors: true})
      }
    })
  },

  //datatypes definition

  _listDatatypes: async function (limit, start, orderBy, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datatypes.resourcePath}${container}${endPoints.datatypes.resourceType}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.batches.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.batches.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.batches.parameters.orderBy, orderBy)
    }
    return this.get(`${baseUrl.toString()}`, endPoints.datatypes.contentType, 'application/vnd.adobe.xed-full+json').then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource classes: ${res.url} (${res.status} ${res.statusText})`)
    })
  },

  _createDatatype: async function (title, description, container, propName, propValue) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datatypes.resourcePath}${container}${endPoints.datatypes.resourceType}`)
    var metExtend = 'meta:extensible'
    var metAbstract = 'meta:abstract'
    const body = {
      title: title,
      description: description,
      type: 'object',
      [metExtend]: true,
      [metAbstract]: true,
      allOf: [{
        properties: {
          [propName]: {
            type: propValue,
          },
        },
      }],
    }
    return this.post(`${baseUrl.toString()}`, endPoints.datatypes.contentType, body, 'application/vnd.adobe.xed-full+json').then((res) => {
      if (res.ok) return res.json()
      else throw new Error(`Cannot create datatype: ${res.url} ${JSON.stringify(body)} (${res.status} ${res.statusText})`)
    })

  },

  _getDatatype: async function (datatypeId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datatypes.resourcePath}${container}${endPoints.datatypes.resourceType}${datatypeId}`)
    return this.get(`${baseUrl.toString()}`, endPoints.classes.contentType, 'application/vnd.adobe.xed-full-notext+json; version=1').then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datatype: ${res.url} (${res.status} ${res.statusText} ${res.toString()}`)
    })
  },

  _deleteDatatype: async function (datatypeId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datatypes.resourcePath}${container}${endPoints.datatypes.resourceType}${datatypeId}`)
    request.delete({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      if (response.statusCode === 204 || response.statusCode === 200) {
        console.log('Successfully deleted datatype ' + datatypeId)
      } else {
        const object = JSON.parse(body)
        console.dir(object, {depth: null, colors: true})
      }
    })
  },

  ////mixins implementation

  _createMixin: async function (classId, title, description, container, propName, propValue, organization) {
    var metExtend = 'meta:intendedToExtend'
    var ext = 'meta:extensible'
    var meta = 'meta:abstract'
    console.log(organization)
    request.post({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full+json',
      },
      url: new URL(`${catalogBaseUrl}${endPoints.mixins.resourcePath}${container}${endPoints.mixins.resourceType}`),
      body: JSON.stringify({
        title: title,
        description: description,
        type: 'object',
        [ext]: true,
        [meta]: true,
        [metExtend]: [classId],
        definitions: {
          [propName]: {
            properties: {
              [organization]: {
                // type:'object',
                properties: {
                  [propName]: {
                    type: propValue,
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/' + propName,
          },

        ],
      }),
    }, function (error, response, body) {
      const object = JSON.parse(body)
      console.dir(object, {depth: null, colors: true})
    })
  },

  _listMixins: async function (limit, start, orderBy, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.mixins.resourcePath}${container}${endPoints.mixins.resourceType}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.batches.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.batches.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.batches.parameters.orderBy, orderBy)
    }
    request.get({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full+json',
      },
      url: baseUrl,
    }, function (error, response, body) {
      let json = JSON.parse(body)
      console.log(json)
    })
  },

  _getMixin: async function (mixinId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.mixins.resourcePath}${container}${endPoints.mixins.resourceType}${mixinId}`)
    request.get({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      let json = JSON.parse(body)
      console.log(json)
    })
  },

  _deleteMixin: async function (mixinId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.mixins.resourcePath}${container}${endPoints.mixins.resourceType}${mixinId}`)
    request.delete({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      if (response.statusCode === 204 || response.statusCode === 200) {
        console.log('Successfully deleted mixin ' + mixinId)
      } else {
        const object = JSON.parse(body)
        console.dir(object, {depth: null, colors: true})
      }
    })
  },


//schemas implementation

  _createSchema: async function (mixin, title, description, baseClass, container) {
    var metaExtends = [baseClass]
    var metExtend = 'meta:extends'
    var unionSchema = 'meta:immutableTags'
    request.post({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full+json',
      },
      url: new URL(`${catalogBaseUrl}${endPoints.schemas.resourcePath}${container}${endPoints.schemas.resourceType}`),
      body: JSON.stringify({
        title: title,
        description: description,
        type: 'object',
        [unionSchema]: ['union'],
        [metExtend]: metaExtends,
        allOf: [
          {
            $ref: baseClass,
            properties: {},
          }],
      }),
    }, function (error, response, body) {
      const object = JSON.parse(body)
      console.dir(object, {depth: null, colors: true})
    })
  },

  _listSchemas: async function (limit, start, orderBy, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.schemas.resourcePath}${container}${endPoints.schemas.resourceType}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.batches.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.batches.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.batches.parameters.orderBy, orderBy)
    }
    request.get({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full+json',
      },
      url: baseUrl,
    }, function (error, response, body) {
      let json = JSON.parse(body)
      console.log(json)
    })
  },

  _getSchema: async function (schemaId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.schemas.resourcePath}${container}${endPoints.schemas.resourceType}${schemaId}`)
    request.get({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      let json = JSON.parse(body)
      console.log(json)
    })
  },

  _deleteSchema: async function (schemaId, container) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.schemas.resourcePath}${container}${endPoints.schemas.resourceType}${schemaId}`)
    request.delete({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      if (response.statusCode == 204 || response.statusCode == 200) {
        console.log('Successfully deleted schema ' + schemaId)
      } else {
        const object = JSON.parse(body)
        console.dir(object, {depth: null, colors: true})
      }
    })
  },

  _listStats: async function () {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.stats.resourcePath}${endPoints.stats.resourceType}`)
    request.get({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.adobe.xed-full-notext+json; version=1',
      },
      url: baseUrl,
    }, function (error, response, body) {
      let json = JSON.parse(body)
      console.log(json)
    })
  },

}

module.exports = Client
