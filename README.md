# Yourpers Mobile Web Application
## Yourpers is the future of daily news.

Genuanceerde discussies op basis van vragen, meningen en feiten bij het dagelijkse nieuws.
Door een community van betrokken Nederlanders zonder mogelijkheid om te verschuilen achter een digitale identiteit. 
Wij verzetten ons tegen twittergeblaat en nepnieuws.

# Problem Statement
* We cannot find a multi-channel news/opinion integrator with an open and trusted character.
* Online news distribution is too much personalized. We cannot find a perspective integrator: objectivity by rich subjectivity.
* Online pulic opinion is not trustworthy and poluted by (rude) personal oneliner statements.
* It is not possible to share and discuss multiple news items at once (cross-linking and comparison).

# Application Changelog
## version 1.3.8
* Updated landing page for desktop view
    * High-level proposition summary
* New question-answer tile

## version 1.3.7
* Added hotness calculation & sorting
* Implemented analytics (Google's analytics.js)
* Improved UI/UX, amongst others:
    * Reduced amount of categories ('Nieuws' & 'Verrijking')
    * Divider bars between categories
    * Refresh articles locally at adding/removing of articles
    * Paginated article loading
    * High-resolution logos

## version 1.3.6
* New metadata scraper with major improved robustness
    * Including test suite for url imports
    * Including fetching to base64 images for 403 loading errors
    * Including cookie storage for cookiewalls
    * Including url preprocessing to find the source of blendle articles
* Improved article loading (paginated: 5 articles per view)
* Refactored data structure prepared for hotness calculations

## version 1.3.5
* Added opinion tile
* Added share functionality
    * Social media buttons
    * Real-time back-end summary image generation (triggered by HTTP-get request)

## version 1.3.4
* Added the summary tile
* Added timeline sorting
* Updated UI of timeline: new clean design

## version 1.3.3
* Added a dialog for writing opinions
    * Rich text editor
    * Referece by clicking articles images
* Added a user-account side-pane
* Added about-us toast & about-us dialog
* Refactoring of full application

## version 1.3.2
* Added article actions in the topic overview (side-bar).
* Added a MISSION document to highlight our goals.
* Migrated to Stylus for stylesheets.

## version 1.3.1
* Login required for most user actions.
* Refactoring to component achitecture.
```html
<body ng-app="yourpers">
    <yourpers-app></yourpers-app>
</body>
```
* Solved UI bugs.
* Added README

## version 1.3.0
* Implemented Material design.
* Implemented LinkedIn login.

## version 1.2.0
* Added the discussion/comment component.

## version 1.1.0
* User can add/edit/remove articles.
* Multiple perspectives can be added to a topic.
* Back-end structure completed and implemented.

## version 1.0.0
* Initial stable Meteor-Angularjs version

## version 0.2.0
* Migrated to Angularjs

## version 0.1.0
* Initial plain HTML prototype