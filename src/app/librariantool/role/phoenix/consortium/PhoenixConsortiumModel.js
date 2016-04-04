angular.module('platform-ui.librariantool.role.phoenix.consortium').factory('PhoenixConsortiumModel', [function () {
    return {
      title: 'CONSORTIUM',
      newConsortium: {
        'name': null,
        'country': null
      },
      consortiums: [
        {
          'partyId': 31272,
          'partyType': 'consortium',
          'name': 'UC consortium',
          'country': 219,
          'display': true,
          'consortium': null,
          'state': null
        },
        {
          'partyId': 31273,
          'partyType': 'consortium',
          'name': 'Unbelievable Consortium',
          'country': 219,
          'display': true,
          'consortium': null,
          'state': null
        }
      ],
      sortings: [
        {
          predicate: 'name',
          reverse: false,
          text: 'Name'
        },
        {
          predicate: 'partyId',
          reverse: false,
          text: 'Party ID'
        }
      ]
    };
  }]);