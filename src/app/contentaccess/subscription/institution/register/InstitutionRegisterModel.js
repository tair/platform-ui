/**
 * Register Model
 * Model for root /index.html template that wraps every other view.
 */

angular
  .module('platform-ui.contentaccess.subscription.institution.register')
  .factory(
    /* Name */
    'InstitutionRegisterModel',

    /* Dependencies */
    [
      function () {
        return {
          formdata: {
            firstName: null,
            lastName: null,
            email: null,
            institution: null,
            librarianName: null,
            librarianEmail: null,
            comments: null,
            partnerName: null,
          },
        }
      },
    ]
  )
