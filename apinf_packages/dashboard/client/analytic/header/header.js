/* Copyright 2017 Apinf Oy
This file is covered by the EUPL license.
You may obtain a copy of the licence at
https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11 */

// Meteor packages imports
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

// Collection imports
import Apis from '/apinf_packages/apis/collection';
import Proxies from '/apinf_packages/proxies/collection';

Template.apiAnalyticPageHeader.helpers({
  api () {
    // Get ID
    const apiId = Template.instance().apiId;

    return Apis.findOne(apiId);
  },
  proxyName () {
    // Get ID
    const proxyId = Template.instance().proxyId;
    const proxy = Proxies.findOne(proxyId);

    if (proxy) {
      return proxy.name;
    }

    return '';
  },
});
