export default {

	username: function () {
		return (user) => {

			if (!user) {
				return null;
			}
			else if (user.profile && user.profile.firstName && user.profile.lastName) {
				return user.profile.firstName + ' ' + user.profile.lastName;
			}
			else if (user.username) {
				return user.username;
			}
			else {
				return null;
			}
		}

	},

	headline : () => {
		return (user) => {
			if (!user) {
				return null;
			}
			else if (user.profile && user.profile.headline) {
				return user.profile.headline;
			}
		}
	},

	profileImage: function () {
		return (user) => {

			if (!user) {
				return null;
			}
			else if (user.profile && user.profile.pictureUrl) {
				return user.profile.pictureUrl;
			} 
			else {
				return null;
			}

		}
	}

}