// Autofill v2.4 by Derrick Gall (March 2009)

if (!$('script[src$="autofillFSP.js"]:first').attr('hasexecuted')) {

	$(document).ready(function(){
		$('.formAutoFill').each(function(){
			// Bind focus event to inputs & textareas
			$(this).find('input[type="text"],textarea').focus(function(){
				if ($(this).val() == $(this).attr('title')) $(this).val('');
				$(this).css({ fontWeight: 'normal' });
			});
			
			// Bind blur event to inputs & texteareas
			$(this).find('input:text,textarea').blur(function(){
				if (!$(this).val()) $(this).val($(this).attr('title'));
				if ($(this).val() == $(this).attr('title')) {
					if ($(this).parent().parent().find('label[for="' + $(this).attr('id') + '"] strong').length) $(this).css({ fontWeight: 'bold' });
				}
			});
			
			// Hide labels and auto-fill inputs
			$(this).find('input[type="text"],textarea').each(function(){
				var myLabel = $(this).parent().parent().find('label[for="' + $(this).attr('id') + '"]:not(.formHide)');
				if (!myLabel.find('input[type="text"]').length) myLabel.addClass('formLabelHide');
				$(this).val($(this).attr('title'));
				if (myLabel.find('strong').length) $(this).css({ fontWeight: 'bold' });
			});
		});
	});

	$('script[src$="autofillFSP.js"]:first').attr('hasexecuted', true);

}