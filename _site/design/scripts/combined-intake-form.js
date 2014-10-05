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
function addgmttime(form) {
   var da = new Date();
   var cookie_set="";
   var str = da.toGMTString();
   //alert("gmttime=" + str);
   var dgmt = Date.parse(str);
   var cookie_set = false;
   if (eval(document.forms[0]) ) {
      var e=document.createElement("input");
      e.type="hidden"; e.value=dgmt;
      e.name="loadgmttime";
      //document.forms[0].appendChild(e);
	  form.appendChild(e);

      var d=document.createElement("input");
      d.type="hidden"; d.value=str;
      d.name="dformat";
      //document.forms[0].appendChild(d);
	  form.appendChild(d);

   }
   SetCookie("subid", "findlawsession", 1);
   if ( ReadCookie( 'subid' ) ) {
        cookie_set = "enabled";
        DeleteCookie('subid');
   }
   else {
        cookie_set = "disabled";
   }
   if (eval(document.forms[0]) ) {
      var c=document.createElement("input");
      c.type="hidden"; c.value=cookie_set;
      c.name="cookie";
      //document.forms[0].appendChild(c);
	  form.appendChild(c);
   }
}

function SetCookie(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+cookieValue+ ";expires="+expire.toGMTString();
}

function ReadCookie(cookieName) {
 var theCookie=""+document.cookie;
 var ind=theCookie.indexOf(cookieName);
 if (ind==-1 || cookieName=="") return "";
 var ind1=theCookie.indexOf(';',ind);
 if (ind1==-1) ind1=theCookie.length;
 return (theCookie.substring(ind+cookieName.length+1,ind1));
}

function DeleteCookie(cookieName) {
  var today = new Date();
  var expire1 = new Date();
  expire1.setTime(today.getTime() - 3600000*24);
  document.cookie = cookieName+"= ;expires="+expire1.toGMTString();
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}	


// Form Validation v4.2.1 by Derrick Gall (Jan. 2009)
// Last Updated: Jan. 2010

if (!$('script[src$="formValidationFSP.js"]:first').attr('hasexecuted')) {
	
	// Trim string method
	String.prototype.trim = function() { return this.replace(/^\s+/, '').replace(/\s+$/, ''); };
	
	// Form validation
	function formValidation(objForm) {
		// Create objForm object
		var objGroups = {};
		
		// Remove old error if exists
		$('#formError').addClass('formHide');
		$('#formError').removeAttr('id');
		
		// Validate fields
		dataCount=objForm.find('.dataCheck').length;
		dataCount=0;


		// Validate fields
		validateCount = objForm.find('.validate').length;
		validatedCount = 0;
		
		
		
		//Gather fields required for conversion tool validation 
		var conAdvArrFields = $.makeArray(objForm.find('.dataCheck'));
		
		
		// Gather fields that need validation
		var arrFields = $.makeArray(objForm.find('.validate'));
		
		for (var i=0; i<conAdvArrFields.length; i++)
		{
               		
			
			var conAdvField = $(conAdvArrFields[i]), conAdvFieldValue = conAdvField.val(), conAdvFieldID = conAdvField.attr('id'), 
			//Code added for checking phone fields  FSP - 6079
			conAdvFieldName = conAdvField.attr('name');
			
			
			validated = false;
		
		//trim spaces
			conAdvFieldValue = conAdvFieldValue.trim();

			// Text inputs
			//Code changed for FSP-7363
			if (conAdvField.hasClass('text') && conAdvFieldValue.length>0 && conAdvFieldValue != conAdvField.attr('title')) {
				//if (!conAdvFieldValue.match(/^[A-Za-z]+$/)) 
				if (conAdvFieldValue.length<=0) 
					
					return showError(conAdvFieldID);
//   return true;
				validated = true;
			}
			
			
			//Email inputs
			
			if (conAdvField.hasClass('email') && conAdvFieldValue.length>0 && conAdvFieldValue != conAdvField.attr('title')) {
				//if (!conAdvFieldValue.match(/^[^@]+\@[^@]+$/) )Email validation changing to global validations 
				if(!conAdvFieldValue.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/))
					return showError(conAdvFieldID);
				validated = true;
			}

// Number inputs
			//Adding periods for FSP - 6079
			
			if (conAdvField.hasClass('number')&& conAdvFieldValue.length>0 && conAdvFieldValue != conAdvField.attr('title')) {	
				if(conAdvFieldName.indexOf('at:phone') != -1||conAdvFieldName.indexOf('at:mobile_phone') != -1 || conAdvFieldName.indexOf('at:home_phone') || conAdvFieldName.indexOf('at:business_phone') != -1)
					{
				if (!conAdvFieldValue.match(/^[\d\- \+\(\)\.]+$/))
				return showError(conAdvFieldID);
				
			}
				else
					{
					if (!conAdvFieldValue.match(/^[\d\- \+\(\)]+$/)) 
					return showError(conAdvFieldID);
					
					
					}
				
				}
			
			
		//Zipcode
			
			if (conAdvField.hasClass('zipcode') && conAdvFieldValue.length>0 && conAdvFieldValue != conAdvField.attr('title')) {
				if (!conAdvFieldValue.match(/^\d+$/)) return showError(conAdvFieldID);
				validated = true;
			}
			
			
		
	
		}
		
		//Code for determining either First or Last name
		var result = validateGroups (".firstOrLast");
		if(result == false) return false;
		
		//Code For determining either Email Or Phone
		result = validateGroups (".emailOrPhone");
		if(result == false) return false;
		
		// Code For checking dependancy validation (Contact method -> email)
		result = validateDependencyChecks (".depKey_Email", ".depValue_Email");
		if(result == false) return false;
		
		result = validateDependencyChecks (".depKey_Phone", ".depValue_Phone");
		if(result == false) return false;
		
		for (var i=0; i<arrFields.length; i++) {
			var field = $(arrFields[i]), fieldValue = field.val(), fieldID = field.attr('id'), 
			//Code added for checking phone field - FSP 6079
			fieldName= field.attr('name'),
			
			validated = false;
			
			
			
			
			// Text inputs
			
			if (field.hasClass('text')) {
				if (!fieldValue || fieldValue == field.attr('title')) return showError(fieldID);
				validated = true;
			}
			
			// E-mail inputs
			if (field.hasClass('email')) {
				//if (!fieldValue.match(/^[^@]+\@[^@]+$/) || fieldValue == field.attr('title'))Email validation changing to global email validation
				
				if (!fieldValue.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) || fieldValue == field.attr('title'))
					return showError(fieldID);
				validated = true;
			}
			
			// Number inputs
			//Adding periods for FSP 6079
			if (field.hasClass('number')) {
				
				if(fieldName.indexOf('at:phone') != -1 ||fieldName.indexOf('at:mobile_phone') != -1 ||fieldName.indexOf('at:home_phone') != -1 ||fieldName.indexOf('at:business_phone') != -1)
					{
				if (!fieldValue.match(/^[\d\- \+\(\)\.]+$/) || fieldValue == field.attr('title')) return showError(fieldID);
			
					}
				else
					{
					
					if (!fieldValue.match(/^[\d\- \+\(\)]+$/) || fieldValue == field.attr('title')) return showError(fieldID);
					}
				validated = true;
			}
			
			//validate mandatory fields even if space is entered
			
			if(fieldValue.trim().length <= 0)
			{
			return showError(fieldID);
			validated = true;
			}
			
	       ////Zipcode
			
			if (field.hasClass('zipcode')) {
				if (!fieldValue.match(/^\d+$/) || fieldValue == field.attr('title')) return showError(fieldID);
				validated = true;
			}
			
			//checking space
			
			
			
		

			
			// Select fields
			if (field.hasClass('select')) {
				if (fieldValue == 'DID NOT RESPOND') return showError(fieldID);
				validated = true;
			}
			
			
			
			// Radio fields
			if (field.hasClass('radio')) {
				var fieldName = field.attr('name');
				validated = true;
				if (!objGroups[fieldName]) {
					// Signify fields with that name have already been validated
					objGroups[fieldName] = true;
					if (!objForm.find('input[name="' + fieldName + '"]:checked').length) return showError(fieldID);
				}
			}
			
			// Checkbox fields
			if (field.hasClass('checkbox')) {
				var fieldName = field.attr('name');
				validated = true;
				if (!objGroups[fieldName]) {
					// Signify fields with that name have already been validated
					objGroups[fieldName] = true;
					var count = objForm.find('input[name="' + fieldName + '"]:checked').length,
					fieldClass = field.attr('class');
					
					// Validate based on text and number provided in class attribute
					if (fieldClass.indexOf('exactly') > -1) {
						if (count != fieldClass.replace(/.*(exactly)(\d+)?.*/gi, '$2')) return showError(fieldID);
					}
					if (fieldClass.indexOf('atLeast') > -1) {
						if (count < fieldClass.replace(/.*(atLeast)(\d+)?.*/gi, '$2')) return showError(fieldID);
					}
					if (fieldClass.indexOf('atMost') > -1) {
						if (count > fieldClass.replace(/.*(atMost)(\d+)?.*/gi, '$2')) return showError(fieldID);
					}
					if (!count && fieldClass.match(/exactly||atLeast||atMost/)) return showError(fieldID);
				}
			}
			
			if (!validated && !fieldValue) return showError(fieldID);
		}
		//This function is to check if first or last name is present
		//or to check email or phone is present.
		
		function validateGroups(strClassName) {
			var validateTwoArrFields=$.makeArray(objForm.find(strClassName));
			var noOfblanktext =0;
			for (var i=0; i< validateTwoArrFields.length; i++)
			{
				var validateTwoField = $(validateTwoArrFields[i]), validateTwoFieldValue = validateTwoField.val(), validateTwoFieldID = validateTwoField.attr('id');	
				if(validateTwoFieldValue.trim().length == 0 || validateTwoFieldValue == validateTwoField.attr('title'))
				{
					noOfblanktext=noOfblanktext+1;
				}
				
				if(noOfblanktext==validateTwoArrFields.length)
				{
					var temp_validateTwoField = $(validateTwoArrFields[0]);
					return showError(temp_validateTwoField.attr('id'));
				}
			}
			return true;
		}
		
		function validateDependencyChecks(keyClass, valuesClass) {
			var keyFields = $.makeArray(objForm.find(keyClass));
			if (keyFields!=null && keyFields.length >0) {
				var checkBoxField = keyFields[0];
				//var checkBoxFieldID = checkBoxField.attr('id');	
				if(checkBoxField.checked) {
					var valueFields = $.makeArray(objForm.find(valuesClass));
					for (var i=0; i< valueFields.length; i++) {
						var valueField = $(valueFields[i]), valueFieldValue = valueField.val(), valueFieldID = valueField.attr('id');	
						
						valueFieldValue = valueFieldValue.trim();
						if (!valueFieldValue || valueFieldValue == valueField.attr('title')) {
							//return showError(checkBoxFieldID);
							return showError(valueFieldID);
						}
						
					}
					
				} // End of if checkboxfield checked condition
			}
			return true;
		} // End of validateDependencyChecks
		
		
		return true;
	}
	

	
	
	// Show Error
	function showError(id) {
		$('label.formHide[for="' + id + '"]').attr('id', 'formError');
		$('#formError').removeClass('formHide');
		location.href = '#formError';
		return false;
	}
	
	$(document).ready(function(){
							   
		// Apply function to each intake form
		$('form[id^="intakeForm"],form[id^="blogCommentForm"]').submit(function() {
			if (!formValidation($(this))) return false;
			
			// Empty autofilled fields
			$(this).find('input[title],textarea[title]').each(function(){
				if ($(this).attr('title') == $(this).val()) $(this).val('');
			});
			
			//addgmttime();
			//return true;
			$('form').each(function(){
				addgmttime(this);      //FSP-7629
				return true;
			});			
		});
		
		// Disclaimer Popup
		$('#intakeFormShortAutofill,#intakeFormShort').each(function(){
			// Add click event to close link
			$('#intakeFormShortDisclaimer a').click(function(){ $('#intakeFormShortDisclaimer').slideToggle(200); });
			
			// Add click event to disclaimer link
			$(this).find('a.intakeFormShortDisclaimerLink').each(function(){
				$(this).attr('href', '#intakeFormShortDisclaimer');
				$(this).click(function(){
					// Get estimated position, window position, and set default position
					var estPosition = $(this)[0].offsetWidth + $(this).offset().left + 300,
					windowWidth = $(window).width(),
					positionLeft = $(this).offset().left + $(this).width() + 10;
					
					// If estimated position is greater than the window width, position left
					if (estPosition > windowWidth) positionLeft -= (320 + $(this).width());
					
					// Position disclaimer
					$('#intakeFormShortDisclaimer').css({ position: 'absolute', left: positionLeft, top: $(this).offset().top });
					
					// Show disclaimer
					$('#intakeFormShortDisclaimer').slideToggle(200);
				})
			});
			
		});
		
		// E-mail Obfuscation validation
		$('form[id^="emailObfuscation"]').each(function(){
	
			$(this).submit(function(){
				// Check for guid
				if (!checkObfuscationURL()) return false;
				// Validate form
				if (!formValidation($(this))) return false;
				// Set email_subject value
				$('#email_subject').val($('#emailObfuscationSubject').val());
				
				var url = location.href;
				if (url.indexOf('attorneyName=') > -1) {
					var attorney = url.replace(/.*(attorneyName=(.*))/gi, '$2');
					attorney=attorney.replace(/%20/gi,' ');
					var subject = 'FindLaw FirmSite Message for '.concat(attorney);
					$('#email_subject').val(subject);										
				} 
				// Check if user wants a copy
				if ($('#emailObfuscationCopyMe').attr('checked')) {
					$('#copymeEmail').val($('#emailObfuscationEmailAddress').val());
				} else $('#copymeEmail').val('');
				
				//addgmttime();
				//return true;				
				$('form').each(function(){
					addgmttime(this);      //FSP-7629
					return true;
				});
				
			});
			
			// Function to check for guid in query string
			function checkObfuscationURL() {
				var url = location.href;
				if (url.indexOf('JSPeditPageContent.do') > -1) return true;
				if (url.indexOf('guid=') > -1) {
					var guid = url.replace(/.*guid=([^=]*=).*/gi, '$1');
					$('#guid').val(guid);
					return true;
				} else {
					alert('An error occured. Please use the back button on your browser and click on the e-mail link again.');
					return false;
				}
				
			}
			
			// Check for guid
			checkObfuscationURL();
			
			// Show subject and copy me inputs
			$('.formHasJavaScript').removeClass('formHasJavaScript');
			// Remove "NoJavaScript" input
			$('#formNoJavaScript').remove();
		});
	});
	
	$('script[src$="formValidationFSP.js"]:first').attr('hasexecuted', true);
}
