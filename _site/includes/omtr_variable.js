/* Omniture Site Catalyst Firmsite Specific Code
Version 8/8/2011  (VK) Modified c2-c4 v2-v4 to dynamic 
Version 4/28/2011 (VK) Removed title tag from prop4. Changed few variables to dynamic
Version 4/16/2010 (MK) 
	Added eVar7 collection
	Modified event41 collection
	Added contact form type detection
Version 3/23/2010 (MK) Modified to add event41 when is on home page. Event is a serialized event that will fire once per visit on a site
Version 3/16/2010 (MK) Modified LogicalSite-Date to avoid conflict with pilot site code, added profileeoform to form detection code.
Version 2/17/2010 (MK) Added prop15
Version 2/1/2010 (MK) Added Blog tracking, changed LogicalSite-Date to monthly
Version 1/14/2010 (MK) Added "D=" mobile syntax
Version 12/2/2009 (MK) Added title tag to prop4, 'FS Onsite Search' to prop9, added contact us to prop41, lowercase to pageName and channel
Version 11/12/2009 (MK) initial version
*/
//Utility JS Functions
function getMetaContents(mn){ 
  var m = document.getElementsByTagName('meta'); 
  for(var i in m){ 
   if(m[i].name == mn){ 
     return m[i].content; 
   } 
  } 
}
//function to get week number
Date.prototype.getWeek = function() {
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
/* You may give each page an identifying name, server, and channel on
the next lines. */

omtr.pageName=""
omtr.hier1 = ""
omtr.pageType=""
omtr.campaign=""

var fl_Date = new Date();
omtr.channel=document.domain.toLowerCase();
omtr.server='Firmsite';
omtr.pageName=document.domain+':'+omtr.getPageName();
omtr.pageName=omtr.pageName.toLowerCase();
if (omtr.getPageName()==omtr.defaultPage){
	var flid;
	if(omtr.c_r('flid')){
		flid=omtr.c_r('flid');
	}else{
		flid=omtr.getAndPersistValue(fl_Date.getTime(),'flid',0);
	};
	omtr.events=omtr.apl(omtr.events,'event41:'+flid+'-'+sfl_logicalSite,",",0)
};

// set get eVar7 once
if (omtr.eVar7) 
{
	omtr.eVar7 = omtr.getValOnce(omtr.eVar7,'omtr_evar7',0);
}
else
{
	omtr.eVar7 =omtr.getQueryParam('flcmp');//Set flcmp here if not set in page already.
	omtr.eVar7 =omtr.getValOnce(omtr.eVar7 ,'omtr_evar7',0);
	if (omtr.eVar7){
		omtr.events=omtr.apl(omtr.events,"event42",",",0);
	}
}

		/*********************
		*prop9/eVar9 is search type
		*prop10/eVar10 is search term
		*event5 is searches
		*NOTE: for null searches, prepend 'null: ' to the search term: i.e. s.prop9='null:teeth cleaning'
		*********************/
//get search term (New publisher only)
omtr.prop10=omtr.getQueryParam('stext');
//Add code here for FSControl Search

if (omtr.prop10) 
{
	omtr.prop10=omtr.prop10.toLowerCase()
	omtr.prop9='FS Onsite Search';
	omtr.events=omtr.apl(omtr.events,"event5",",",0);
}




//fire Thankyou and contact page event
var sfl_path = location.pathname.toLowerCase()+location.search.toLowerCase();
var sfl_thank=0;
var sfl_contact=0;
var tagName;
if ((sfl_path.indexOf('thank'))>0&&(sfl_path.indexOf('jonathank')<0))
{
	tagName=omtr.c_r('cform');
	if(!tagName){tagName='FirmSite Contact Form';}
	omtr.prop15=tagName;
	omtr.events=omtr.apl(omtr.events,"event4",",",0);
	sfl_thank=1;
	omtr.prop41='contact us';
	omtr.eVar41="D=c41";
}
if (sfl_thank==0&&((sfl_path.indexOf('contact')>0)||(sfl_path.indexOf('staticform')>0)||(sfl_path.indexOf('profileeoform')>0)||(sfl_path.indexOf('officedescriptions')>0)||(sfl_path.indexOf('intake')>0)))
{	

	var formArray=document.getElementsByTagName('form');
	var tag;
	for (var i=0;i<formArray.length;i++){
		tag = formArray.item(i);
		if (tag.name){
			try{
				tagName=tag.name.toLowerCase();
			
				if (tagName.indexOf('short')>0){
					tagName='FirmSite Short Form';
				}else if (tagName.indexOf('practicecenterform')>0){
					tagName='Practice Center Form';
				}else if (tagName.indexOf('intakeform')>0){
					tagName='FirmSite Intake Form';
				}else{
					tagName='FirmSite Contact';
				}
			}catch(err){
				tagName='FirmSite Contact Form';
			};
		if(tagName)break;
		}
	};
	
	omtr.prop15=omtr.getAndPersistValue(tagName,'cform',0);
	omtr.events=omtr.apl(omtr.events,"event3",",",0);
	sfl_contact=1;
	omtr.prop41='contact us';
	omtr.eVar41="D=c41";
}
//prop and evar 28
//set hier4 variable
var sfl_pageType = getMetaContents('FSWritertoolPageType');
if (!sfl_pageType) sfl_pageType='Interior Page';
omtr.hier4="Firmsite:";
if (omtr.getPageName()==omtr.defaultPage) 
	{omtr.hier4+=omtr.defaultPage}
else if(sfl_thank==1)
	{omtr.hier4+=sfl_pageType+':Thank You Page'}
else if(sfl_contact==1)
	{omtr.hier4+=sfl_pageType+':Contact Page'}
else
	{omtr.hier4+=sfl_pageType};
omtr.prop28="D=h4";     //omtr.hier4;
omtr.eVar28="D=h4";     //c28"
// use hier1 to set the site section variables
	
var siteSectionLength = omtr.pageName.split(':').length
var siteSection = omtr.pageName.split(':', siteSectionLength-1);
			
/* Based on Page Name Plugin*/

			 
//omtr.prop1
if(siteSection[0]) 
{
	omtr.prop1 = siteSection[0];
}
else
{
	omtr.prop1 = document.domain;
}

//omtr.prop2 
if(siteSection[1]) 
{
	omtr.prop2 = omtr.prop1 + ':' + siteSection[1]; 
// omtr.prop3
 	if(siteSection[2]) 
	{
		omtr.prop3 = omtr.prop2 + ':' + siteSection[2]; 
// omtr.prop4
		if(siteSection[3]) 
		{
			omtr.hier1 = omtr.prop3 + ':' + siteSection[3];
			omtr.prop4 = "D=h1";
			omtr.eVar4 = "D=h1";
		}
		else
		{
			omtr.hier1 = "D=c3";
		}
	}
	else
	{
		omtr.prop3 = "D=c2";
		omtr.eVar3 = "D=c2";
		omtr.hier1 = "D=c2";
	}
}
else
{
	omtr.prop2 = "D=c1";
	omtr.eVar2 = "D=c1";
	omtr.prop3 = "D=c1";
	omtr.eVar3 = "D=c1";
	omtr.hier1 = "D=c1";
}
		
if(!omtr.prop4)
{
	omtr.prop4 = omtr.hier1;	//omtr.prop4="D=h1";     //omtr.hier1 + ' | ' + document.title;
	omtr.eVar4 = omtr.hier1;	//omtr.eVar4="D=h1";
}

//set site specific values
omtr.eVar18=omtr.prop18=sfl_logicalSite;  //LogicalSiteID;
omtr.prop19=sfl_logicalSite+'-'+fl_Date.getFullYear()+'m'+(fl_Date.getMonth()+1);
omtr.eVar19="D=c19";
omtr.prop20=sfl_subID;
omtr.eVar20="D=c20";

//Set Blog Variables

//33 Name 34 type 35 title
if (getMetaContents('generator')){
	if (getMetaContents('generator').indexOf('Movable Type') >= 0) {
		//it is a MT blog
		// Set event8
		omtr.events=omtr.apl(omtr.events,"event8",",",0);
		omtr.prop34='FS Blog';
		//Get RSS title for name of blog
		var t = document.getElementsByTagName('link');
	  	for(var i in t){ 
	   		if(t[i].rel == 'alternate' && t[i].type == 'application/rss+xml'){ 
	    		omtr.prop33 = t[i].title.replace('RSS Feed',''); 
	   		} 
	  	};
	  	//get post name from file name ("home page" or condensed post title)
	  	a = omtr.split(omtr.pageName,':');
	  	omtr.prop35=omtr.split(a[a.length-1],'.')[0];
	  	
	  	//38 = article author
	  	if (omtr.prop35 != omtr.defaultPage) {
	  	// is a blog and is an interior page
	  		omtr.prop39 = getMetaContents('FLBlogAuthor');
	  	}
	  	//Check for comment
	  	if (document.title.search(/comment submitted/i)>-1||document.title.search(/comment pending/i)>-1) {
	  			//is a comment. fire comment event
	  			omtr.events=omtr.apl(omtr.events,"event18",",",0);
	  	}
	  	
	}
}