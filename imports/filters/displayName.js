import angular from 'angular';
import angularMeteor from 'angular-meteor';

const name = 'displayNameFilter';

function DisplayNameFilter(user) {

	console.log(user);
	
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

//create a module
export default angular.module(name, [])
.filter(name, () => {
	return DisplayNameFilter;
});