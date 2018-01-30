let googleAnalyticsScript = `
<script>Dummy Google Analytics: this will be replaced by the actual tags in production mode</script>
`
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