JQuery Captcha is a simple Captcha plugin for JQuery. unlike other captcha plugins this one requires very little work on the user side. The user only needs to check a box to identify as a human and not a bot.
To use this plugin you must have JQuery. Include this plugin after JQuery. 
`<script src="jquery.captcha.js"></script>` 

To use the plugin you will want to set a hidden field in your form. 
`<input id="captcha" type="hidden" />` 

Then in your JavaScript you will want to set the field to be a captcha. 
`$("#captcha").captcha("human");` 

The captcha plug-in takes one argument. It's a string that will be the pass value that will be set to the hidden field when the user has been confirmed as a human. This value can be anything you want. You can then test this value on your server side to see if it is correct. If the user has not been confirmed as a human the field will be submitted with no value. If a bot attempts to fill in the field with a value simply ignore the submission as long as it's not matching your accepted string. It's recommended that the accepted string be passed in by ajax and have your JavaScript in an external js file and not embedded into the html page. The example project only has it embedded to keep it simple and show you what you need.
