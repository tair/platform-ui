angular.module('platform-ui.librariantool.role.consortium.institution').factory('ConsortiumInstitutionModel', [function () {
    return {
      title: 'INSTITUTION',
      institutions: [
        {
          'name': 'UC Berekeley',
          'partyId': 'Institution #1',
          'state': null
        },
        {
          'name': 'Stanford University',
          'partyId': 'Institution #2',
          'state': null
        },
        {
          'name': 'MIT',
          'partyId': 'Institution #3',
          'state': null
        },
        {
          'name': 'UCLA',
          'partyId': 'Institution #4',
          'state': null
        },
        {
          'name': 'UC Davis',
          'partyId': 'Institution #5',
          'state': null
        },
        {
          'name': 'UC San Diego',
          'partyId': 'Institution #6',
          'state': null
        },
        {
          'name': 'UC Santa Clara',
          'partyId': 'Institution #6',
          'state': null
        }
      ],
      sortings: [
        {
          predicate: 'partyId',
          reverse: false,
          text: 'ID'
        },
        {
          predicate: 'name',
          reverse: false,
          text: 'Name'
        }
      ]
    };
  }]);