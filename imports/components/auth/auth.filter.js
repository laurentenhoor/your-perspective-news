export default class AuthFilters {

	static Username(input) {
		return new AuthFilters().filterUsername(input);
	}

	filterUsername(user) {

		if (!user) {
			
			return null;

		} else if (user.profile && user.profile.firstName && user.profile.lastName) {

			return user.profile.firstName + ' ' + user.profile.lastName;

		} else if (user.username) {

			return user.username;

		} else {

			return null;

		}

	}

}