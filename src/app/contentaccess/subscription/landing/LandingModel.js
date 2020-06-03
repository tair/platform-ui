/**
 * Landing Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.subscription.landing').factory(
  /* Name */
  'LandingModel',

  /* Dependencies */
  [
    function () {
      return {
        title: 'Default',
        license: 'def',
        licenses: {
          individual: {
            id: 'individual',
            heading: 'Individual benefits',
            benefits: ['Who should choose this', 'What they get'],
          },
          institution: {
            id: 'institution',
            heading: 'Institutional Benefits',
            benefits: ['Who should choose this', 'What they get'],
          },
          commercial: {
            id: 'commercial',
            heading: 'Commercial Benefits',
            benefits: ['Who should choose this', 'What they get'],
          },
          def: {
            id: 'default',
            heading: 'Subscription Benefits',
            benefits: [
              'Unlimited Access to the TAIR pages',
              'More wonderful benefits and features',
              'Some other option',
            ],
          },
        },
      }
    },
  ]
)
