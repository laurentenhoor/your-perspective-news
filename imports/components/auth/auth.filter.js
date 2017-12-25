export default class AuthFilters {

	static Username(input) {
		return new AuthFilters().filterUsername(input);
	}

	filterUsername(user) {

		if (user.profile && user.profile.firstName) {

			return user.profile.firstName + ' afmelden';

		} else if (user.username) {

			return user.username + ' afmelden'

		} else {

			return null;

		}

	}

}