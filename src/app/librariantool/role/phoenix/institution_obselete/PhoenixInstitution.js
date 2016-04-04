angular.module('platform-ui.librariantool.role.phoenix.institution.obselete').factory('PhoenixInstitutionModelobs', [function () {
    return {
      title: 'INSTITUTION',
      newRange: {
        'name': null,
        'start': null,
        'end': null
      },
      newConsortium: {
        'name': null,
        'partyId': null
      },
      foundConsortium: {
        'partyId': null,
        'name': null,
        'state': null
      },
      newSubscription: {
        'partnerId': null,
        'start': null,
        'end': null
      },
      newInstitution: {
        'partyType': 'organization',
        'name': null,
        'username': null
      },
      consSubList: [],
      institutions: [
        {
          'partyId': 10,
          'partyType': 'organization',
          'name': 'Tibet Academy of Agricultural Research Institute',
          'country': 126,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 11,
          'partyType': 'organization',
          'name': 'Wuhan Institue of Botany, CAS',
          'country': 126,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 12,
          'partyType': 'organization',
          'name': 'Yunnan Academy of Agricutural Sciences',
          'country': 126,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 13,
          'partyType': 'organization',
          'name': 'Zhejiang Normal University',
          'country': 126,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 14,
          'partyType': 'organization',
          'name': 'Targenomix',
          'country': null,
          'display': false,
          'consortium': null
        },
        {
          'partyId': 15,
          'partyType': 'organization',
          'name': 'James Madison University',
          'country': 169,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 16,
          'partyType': 'organization',
          'name': 'University of Colorado at Boulder',
          'country': 169,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 17,
          'partyType': 'organization',
          'name': 'University of Lausanne',
          'country': 158,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 18,
          'partyType': 'organization',
          'name': 'Beijing University of Agriculture',
          'country': 126,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 19,
          'partyType': 'organization',
          'name': 'China University of Science and Technology',
          'country': 126,
          'display': true,
          'consortium': null
        },
        {
          'partyId': 20,
          'partyType': 'organization',
          'name': 'Cibus LLC',
          'country': 126,
          'display': true,
          'consortium': null
        }
      ],
      ipranges: [
        {
          'name': 'Randomly Randomized Randomness',
          'start': '123.45.67',
          'end': '89.12.345',
          'state': null
        },
        {
          'name': 'Organized Orange Organs',
          'start': '123.45.67',
          'end': '89.12.345',
          'state': null
        },
        {
          'name': 'Cathy Catches Cats',
          'start': '123.45.67',
          'end': '89.12.345',
          'state': null
        },
        {
          'name': 'Ben Bends Benches',
          'start': '123.45.67',
          'end': '89.12.345',
          'state': null
        },
        {
          'name': 'James Jams Jams',
          'start': '123.45.67',
          'end': '89.12.345',
          'state': null
        },
        {
          'name': 'Andy And Andrew',
          'start': '132.42.34',
          'end': '12.123.3.52',
          'state': null
        },
        {
          'name': 'Cats Are Awesome',
          'start': '132.42.34',
          'end': '12.123.3.52',
          'state': null
        },
        {
          'name': 'Cat Catches Catfish',
          'start': '132.42.34',
          'end': '12.123.3.52',
          'state': null
        },
        {
          'name': 'Catastrophically Catalized Cataclysm',
          'start': '132.42.34',
          'end': '12.123.3.52',
          'state': null
        }
      ],
      partners: [],
      activeSubscriptions: {},
      consortiumSubscriptions: {},
      uiparams: {
        'partnercolwidth': 'col-xs-5',
        'expcolwidth': 'col-xs-3',
        'actionscolwidth': 'col-xs-4'
      },
      sortings: [
        {
          sortField: 'start',
          reverse: false,
          text: 'start IP'
        },
        {
          sortField: 'name',
          reverse: false,
          text: 'Label'
        }
      ],
      consortiums: []
    };
  }]);