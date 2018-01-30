let googleAnalyticsScript = `
<script>
  ga = function(action, type, eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
    console.warn('GoogleAnalytics debug:', action, type, eventCategory, eventAction, eventLabel, eventValue, fieldsObject)
  }
</script>
`;

if (Meteor.isProduction) {
  googleAnalyticsScript = `
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112278933-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-112278933-1');
    </script>
    `;
}
Inject.rawHead('Inject the Google Analytics script at the beginning of the head', googleAnalyticsScript);