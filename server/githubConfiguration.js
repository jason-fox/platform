ServiceConfiguration.configurations.remove({
  // removing existing configurations
  service: 'github'
});

// If settings are already in Settings collection
if ( Settings.findOne() ) {

  ServiceConfiguration.configurations.insert({
    service: 'github',
    clientId: Settings.findOne().githubConfiguration.clientId,
    secret: Settings.findOne().githubConfiguration.secret
  });

  // If settings are available in Meteor.settings.private
} else if (Meteor.settings.private) {
  ServiceConfiguration.configurations.insert({
    /*extend settings.json with Client ID and Client Secret:
  "githubConfiguration": {
    "clientId" : "xxxx",
    "secret" : "xxxx"
  }*/
    service: 'github',
    clientId: Meteor.settings.private.githubConfiguration.clientId,
    secret: Meteor.settings.private.githubConfiguration.secret
  });

} try {

  ServiceConfiguration.configurations.insert({
    /*extend settings.json with Client ID and Client Secret:
  "githubConfiguration": {
    "clientId" : "xxxx",
    "secret" : "xxxx"
  }*/
    service: 'github',
    clientId: Meteor.settings.private.githubConfiguration.clientId,
    secret: Meteor.settings.private.githubConfiguration.secret
  });
  // otherwise show an error
} catch (_error) {
  e = _error;
}
