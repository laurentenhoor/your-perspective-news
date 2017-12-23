export default class AuthFilters {

	static Username(input) {
		return new AuthFilters().filterUsername(input);
	}

	filterUsername(user) {

		if (!user) {
			return '';
		}
		
		if (user.username) {
			return user.username 
		}

		if (user.profile && user.profile.firstName) {
			return user.profile.firstName;
		}

		if (user.emails) {
			return user.emails[0].address;	
		}

		return user;

	}

}