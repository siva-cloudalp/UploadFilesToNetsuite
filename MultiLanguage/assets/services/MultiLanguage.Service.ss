
function service(request, response)
{
	'use strict';
	try 
	{
		require('CloudAlp.MultiLanguage.MultiLanguage.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('CloudAlp.MultiLanguage.MultiLanguage.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}