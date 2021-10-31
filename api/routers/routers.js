module.exports = {
    auth: require('./auth.router'),
    profile: require('./profile.router'),
    users: require('./users.router.js'),
    hotels: require('./hotels/hotels.router.js')
}