Meteor.methods({

	getNewsItems() {
		
		return [{
			category : 'Algemene berichtgeving', 
			articles : [{
				logoUrl: 'https://logo.clearbit.com/www.nrc.nl',
				title: "Harde kritiek op Trumps exit Parijs-akkoord",
				description: "Regeringsleiders en invloedrijke CEO’s uit het bedrijfsleven reageren zeer teleurgesteld op de beslissing van president Trump om te stoppen met het klimaatakkoord van Parijs.",
				publisher: 'NRC',
				url: "https://www.nrc.nl/nieuws/2017/06/02/harde-kritiek-op-trumps-exit-parijs-akkoord-a1561483",
				imageUrl: 'https://images.nrc.nl/3xdswAvTyDuBNeAXCe6y8w3ZCck=/1200x627/smart/filters:no_upscale\\(\\)/s3/static.nrc.nl/wp-content/uploads/2017/06/5809284a-2e2d-4791-8461-cc590545ff35.jpg'
			},{
				logoUrl: 'https://logo.clearbit.com/www.volkskrant.nl',
				title: "Trumps klimaatbesluit bevestigt zijn doctrine: Amerika tegen de rest",
				description: "De bijna tweehonderd landen die zich hebben verenigd in de strijd tegen de opwarming van de aarde moeten het voorlopig doen zonder Amerika. President Donald Trump joeg donderdag de kogel door de kerk en trekt de VS terug uit het akkoord van Parijs.",
				publisher: 'De Volkskrant',
				url: "https://www.volkskrant.nl/buitenland/vs-stappen-uit-klimaatakkoord-parijs-duitsland-en-frankrijk-willen-niet-heronderhandelen~a4498499/",
				imageUrl: 'https://static0.persgroep.net/volkskrant/image/f50a559f-ad8c-49f2-a32d-8657312c25f6?width=700'
			},{
				logoUrl: 'https://logo.clearbit.com/www.businessinsider.nl',
				title: "Factcheck: 5 beweringen van Donald Trump over het klimaatakkoord van Parijs",
				description: "Op de argumenten die president Donald Trump gaf om zich terug te trekken uit het klimaatakkoord van Parijs, valt het nodige af te dingen.",
				publisher: 'Business Insider',
				url:"https://www.businessinsider.nl/factcheck-5-beweringen-van-donald-trump-het-klimaatakkoord-van-parijs/",
				imageUrl: '739260475b008ad88fb5090632ee47e0caf20233-400x255.jpg'
			},{
				logoUrl: 'https://logo.clearbit.com/nos.nl',
				 title : "'0,3 graden warmer door klimaatbesluit VS'",
				 url : "https://nos.nl/artikel/2176295-0-3-graden-warmer-door-klimaatbesluit-vs.html",
				 description : "Het gaat om een schatting van de VN-klimaatorganisatie WMO.",
				imageUrl: 'https://nos.nl/data/image/2017/06/02/390267/xxl.jpg',
				publisher: 'NOS'
			},{
				logoUrl: 'https://logo.clearbit.com/youtube.com',
				 title : "France's President Macron calls on the world to \"make our planet great again\" - BBC News",
				 videoUrl : "https://www.youtube.com/embed/4XDWtU1Zojw?&theme=dark&autohide=2&modestbranding=0&fs=1&showinfo=0&rel=0&playsinline=1",
				 description : "",
				publisher: 'Youtube'
			}]
		},{
			category : 'Andere kijk',
			articles : [{
				logoUrl: 'https://logo.clearbit.com/www.elsevierweekblad.nl',
				title: "Opzeggen klimaatverdrag is best verstandig besluit",
				description: "Dat de Amerikaanse president Donald Trump uit het klimaatakkoord van Parijs stapt, is een verstandig besluit – misschien wel zijn eerste verstandige besluit - Kennis, Opinie",
				url: "http://www.elsevierweekblad.nl/opinie/opinie/2017/06/opzeggen-klimaatverdrag-zou-best-verstandig-besluit-zijn-van-trump-509384/",
				publisher: 'Elsevier Weekblad',
				imageUrl: 'http://cdn.prod.elseone.nl/uploads/2017/06/ANP-51680916-2048x1220.jpg'
			},{
				logoUrl: 'https://logo.clearbit.com/www.foxnews.com',
				 title : "Trump pulls out of Paris climate deal and does something right (and brave)",
				 url : "http://www.foxnews.com/opinion/2017/06/01/trump-pulls-out-paris-climate-deal-and-does-something-right-and-brave.html",
				 description : "By withdrawing from the Paris climate agreement, President Trump is defying the left, the media, his children, and many world leaders.",
				imageUrl: '//a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2017/06/01/0/0/694940094001_5456104729001_5456049982001-vs.jpg?ve=1',
				publisher: 'FOX News'
			}]
		}, {
			category: 'Entertainment',
			articles : [{
				logoUrl: 'https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/062013/dumpert_0.png?itok=EWtSnwGw',
				 title : "De gevolgen van het Trump beleid komen wel heel snel...",
				 url : "",
				 description : "",
				imageUrl: '',
				videoUrl: 'https://www.dumpert.nl/embed/7151309/d6dce568/?rel=0&autoplay=0&setfullscreen=1&allowfullscreen=1',
				publisher: 'Dumpert'
			},{
				logoUrl: 'https://logo.clearbit.com/9gag.com',
				title: "Ondertussen in China...",
				description: "",
				url: "https://9gag.com/gag/aM8gKYX",
				publisher: '9gag',
				imageUrl: 'https://img-9gag-fun.9cache.com/photo/aM8gKYX_700b.jpg'
			}]
		}];

	}, 
	
	getTopics() {
		return [{
		    "_id" : "QWmJgmfx5mcmvSfoS",
		    "createdAt" : 1511505802795.0,
		    "updatedAt" : 1511505802795.0,
		    "articlesByCategory" : [ 
		        {
		            "category" : "Algemene berichtgeving",
		            "articles" : [ 
		                {
		                    "imageUrl" : "https://media.nu.nl/m/dzdxxrya5q21_wd1280.jpg/syrische-strijder-loopt-vrij-rond-in-nederland-.jpg",
		                    "logoUrl" : "https://logo.clearbit.com/www.nu.nl",
		                    "description" : "Een Syrische IS-strijder zou met valse papieren in Nederland verblijven en heeft in september een bijeenkomst in De Balie in Amsterdam bezocht. Dat meldt de Volkskrant. ",
		                    "title" : "'Syrische IS-strijder loopt vrij rond in Nederland' ",
		                    "publisher" : "NU",
		                    "url" : "https://www.nu.nl/binnenland/5020676/syrische-strijder-loopt-vrij-rond-in-nederland-.html",
		                    "_id" : "tRie4fWcCJtWxZrn8",
		                    "createdAt" : 1511505802795.0,
		                    "updatedAt" : 1511505802795.0
		                }, 
		                {
		                    "imageUrl" : "https://static1.persgroep.net/volkskrant/image/c358b946-243f-43df-b2a9-9aa664326de2?width=700",
		                    "logoUrl" : "https://logo.clearbit.com/www.volkskrant.nl",
		                    "description" : "Een Syrische IS-strijder blijkt met valse papieren in Nederland te verblijven en heeft in september een bijeenkomst in De Balie in Amsterdam bezocht. De 31-jarige man werd daar opgemerkt door activisten van het burgercollectief Raqqa is Being Slaughtered Silently, die aanwezig waren omdat een film over hun werk werd getoond. Zij herkenden de man, die uit dezelfde regio in Syrië komt en meevocht met IS.",
		                    "title" : "Syrische IS-strijder loopt vrij rond in Nederland en bezocht bijeenkomst in De Balie",
		                    "publisher" : "De Volkskrant",
		                    "url" : "https://www.volkskrant.nl/buitenland/syrische-is-strijder-loopt-vrij-rond-in-nederland-en-bezocht-bijeenkomst-in-de-balie~a4541252/",
		                    "_id" : "rSJhxsBzt7cvFH87Q",
		                    "createdAt" : 1511509315810.0,
		                    "updatedAt" : 1511509315810.0
		                }
		            ],
		            "sortingOrder" : 1
		        }
		    ],
		    "score" : 12
		}]
	}
});
