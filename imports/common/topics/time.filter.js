import moment from 'moment';
import 'moment/locale/nl';

export default {

	timeFromNow: function () {
		return (timestamp) => {
			
			if (timestamp) {
				return moment(timestamp).fromNow()
			}
			return null;
		}

	},

	today: function () {
		return (timestamp) => {
			
			if (timestamp) {
				return moment.utc(timestamp).format('DD MMMM');
			}
			return null;
		}

	}
}