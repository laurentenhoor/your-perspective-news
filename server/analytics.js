let googleAnalyticsScript = `
<script>
  ga = function(action, type, eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
    console.warn('GoogleAnalytics debug:', action, type, eventCategory, eventAction, eventLabel, eventValue, fieldsObject)
  }
</script>
`;

if (Meteor.isProduction) {
  googleAnalyticsScript = `
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-112278933-1', 'auto');
    ga('send', 'pageview');
    
</script>
    `;
}
Inject.rawHead('Inject the Google Analytics script at the beginning of the head', googleAnalyticsScript);


// let googleTagScript = `
// <!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112278933-1"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'UA-112278933-1');
// </script>
// `