// Search Form Check (re-evaluated) v1.1 by Derrick Gall (May 2009)

if (!$('script[src$="searchFormDesignCheck.js"]:first').attr('hasexecuted')) {

	$().ready(function(){
		if (location.href.match(/previewsite.do\?pagename=/)) {
			$('#searchFormDesign,#searchForm').submit(function(e){
				e.preventDefault();
				alert('Search does not function from Preview, please use your published Web site to search.');
			});
		}
	});

	$('script[src$="searchFormDesignCheck.js"]:first').attr('hasexecuted', true);
}