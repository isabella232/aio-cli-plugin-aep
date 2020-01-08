/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const ListMixinsCommand = require('../../../../src/commands/aep/mixins/list')
const GetMixinsCommand = require('../../../../src/commands/aep/mixins/get')
const CreateMixinsCommand = require('../../../../src/commands/aep/mixins/create')
const DeleteMixinsCommand = require('../../../../src/commands/aep/mixins/delete')
const config = require('@adobe/aio-cli-config')

let mockedClassPayload = {}

let mockConfig = {
  client_id: 'aep-clientId',
  access_token: 'aep-accessToken',
  tenantName: 'aep-tenantName',
}

let mockMixinsPayload = {
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

test('list-mixins - missing config', async () => {
  expect.assertions(2)
  let runResult = ListMixinsCommand.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('list-and-get-mixin-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return mockConfig
  })
  expect.assertions(2)
  let runResult = ListMixinsCommand.run([])
  await expect(runResult).resolves.toEqual(mockMixinsPayload)
  runResult = GetMixinsCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(mockMixinsPayload)
})

test('create-mixin-success', async () => {
  config.get.mockImplementation(() => {
    return mockConfig
  })
  let runResult = CreateMixinsCommand.run(['-c=tenant', '-i=https://ns.adobe.com/xdm/context/profile', '-p=location*string', '-o=abc', '-t=title', '-d=description'])
  await expect(runResult).resolves.toEqual(mockMixinsPayload)
})

test('delete-mixin-success', async () => {
  config.get.mockImplementation(() => {
    return mockConfig
  })
  runResult = DeleteMixinsCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual()
})