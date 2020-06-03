/**
 * IPv6 Service
 *
 * The code comes from a node module ip-address (https://www.npmjs.com/package/ip-address)
 * with a little code change to fit in AngularJS code
 *
 * IPv6 functions. e.g. convert to bigInteger
 * TODO: IPv4-compatible (i.e. ::ffff:192.168.0.1). The function is already in node module ip-address.
 */

angular.module('service.ipv6', []).service(
  /* Name */
  'Ipv6',

  /* Dependencies */
  function () {
    this.paddedHex = function (octet) {
      return sprintf('%04x', parseInt(octet, 16))
    }

    this.parse = function (address) {
      var badCharacters = address.match(/([^0-9a-f:\/%])/gi)

      if (badCharacters) {
        //        console.log('badCharacters');
        return null
      }

      var badAddress = address.match(/([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi)

      if (badAddress) {
        //        console.log('badAddress');
        return null
      }

      var groups = []

      var halves = address.split('::')

      if (halves.length === 2) {
        var first = halves[0].split(':')
        var last = halves[1].split(':')

        if (first.length === 1 && first[0] === '') {
          first = []
        }

        if (last.length === 1 && last[0] === '') {
          last = []
        }

        var remaining = 8 - (first.length + last.length)

        if (!remaining) {
          //          console.log('remaining error');
          return null
        }

        var elidedGroups = remaining

        var elisionBegin = first.length
        var elisionEnd = first.length + elidedGroups

        first.forEach(function (group) {
          groups.push(group)
        })

        for (var i = 0; i < remaining; i++) {
          groups.push(0)
        }

        last.forEach(function (group) {
          groups.push(group)
        })
      } else if (halves.length === 1) {
        groups = address.split(':')

        elidedGroups = 0
      } else {
        //        console.log('halves');
        return null
      }

      groups = groups.map(function (g) {
        return sprintf('%x', parseInt(g, 16))
      })

      if (groups.length !== 8) {
        //        console.log('groups length error');
        return null
      }
      return groups
    }

    this.bigInteger = function (address) {
      return bigInt(this.parse(address).map(this.paddedHex).join(''), 16)
    }
  }
)
