/* Copyright 2017 Apinf Oy
This file is covered by the EUPL license.
You may obtain a copy of the licence at
https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11 */

// Meteor packages imports
import { Template } from 'meteor/templating';

// Collection imports
import { MonitoringSettings } from '/apinf_packages/monitoring/collection';

// APInf import
import convertStatusCode from '/apinf_packages/apis/client/profile/status/convert_status_code';

Template.apiMonitoring.onCreated(function () {
  // Get reference of template instance
  const instance = this;

  // Get api id
  const apiId = instance.data.api._id;

  // Subscribe on Monitoring collection
  instance.subscribe('monitoringSettings', apiId);
});

Template.apiMonitoring.onRendered(() => {
  // Show a small popup on clicking the help icon
  $('[data-toggle="popover"]').popover();

  // Init tooltip
  $('[data-toggle="tooltip"]').tooltip();
});

Template.apiMonitoring.helpers({
  apiMonitoringSettings () {
    // Get api id
    const apiId = this.api._id;

    // Get api monitoring document
    return MonitoringSettings.findOne({ apiId });
  },
  monitoringCollection () {
    // Collection for autoform
    return MonitoringSettings;
  },
  formType () {
    // Get API ID
    const apiId = this.api._id;

    // Look for existing monitoring document for this API
    const existingSettings = MonitoringSettings.findOne({ apiId });

    if (existingSettings) {
      return 'update';
    }

    return 'insert';
  },
  classList () {
    // Get api
    const api = Template.currentData().api;
    // Get class name depending on the api status code
    const { className } = convertStatusCode(api.latestMonitoringStatusCode);

    // Create a new line using join
    return [
      `api-status-indicator-${api._id}`,
      className,
    ].join(' ');
  },
  originalTitle () {
    // Get api
    const api = Template.currentData().api;

    // Get original title depending on the api status code
    const { statusText } = convertStatusCode(api.latestMonitoringStatusCode);

    return statusText;
  },
  statusIcon () {
    // Get api
    const api = Template.currentData().api;

    const { statusIcon } = convertStatusCode(api.latestMonitoringStatusCode);

    return statusIcon;
  },
});
