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
const BaseCommand = require('../about')
const {flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class CreateClassesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateClassesCommand)
    let result

    try {
      result = await this.createClass(flags.mixin, flags.title, flags.description, flags.base_class, flags.container)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createClass(mixin, title, description, baseClass, container) {
    return this.getAdobeAep().createClass(mixin, title, description, baseClass, container)
  }
}

CreateClassesCommand.description = 'Create a class. '
CreateClassesCommand.hidden = false
CreateClassesCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  mixin: flags.string({
    char: 'm',
    description: 'The type of mixin. One of   https://ns.adobe.com/xdm/data/record,  https://ns.adobe.com/xdm/data/time-series,  https://ns.adobe.com/xdm/data/adhoc',
    options: ['https://ns.adobe.com/xdm/data/record', 'https://ns.adobe.com/xdm/data/time-series', 'https://ns.adobe.com/xdm/data/adhoc'],
    default: 'https://ns.adobe.com/xdm/data/record',
    required: false,
  }),
  title: flags.string({char: 't', description: 'Title of class.', required: true}),
  description: flags.string({char: 'd', description: 'Description of class.', required: true}),
  base_class: flags.string({char: 'b', description: 'Base class id.', required: false}),
  container: flags.string({
    char: 'c',
    description: 'The type of container. One of  global, tenant',
    options: ['global', 'tenant'],
    default: 'global',
    required: false,
  }),
}

CreateClassesCommand.aliases = [
  'aep:classes:create',
  'aep:classes:new']
module.exports = CreateClassesCommand
