<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:dc="http://purl.org/dc/elements/1.1/">
	<xsl:output method="html" encoding="utf-8"/>
	<xsl:template match="/">
		<html>
		<xsl:apply-templates select="/atom:feed"/>
		</html>
	</xsl:template>
	<xsl:template match="/atom:feed">
		<head>
		<title><xsl:value-of select="atom:title"/></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400' rel='stylesheet' type='text/css' />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:700' rel='stylesheet' type='text/css' />
		<link rel="stylesheet" type="text/css" href="/includes/blog-feed/atom.css" />
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		</head>
		<body>
		<div class="container-header">
			<div class="container-page">
				<h1>Atom Feed for <xsl:value-of select="atom:title"/></h1>
				<h2><xsl:value-of select="atom:subtitle"/></h2>
			</div>
		</div>
		<div class="container-page">
			<div class="content">
				<ul class="entries">
					<xsl:apply-templates select="atom:entry"/>
				</ul>
			</div>
			<div class="how-to">
				<h4>Subscribe to this feed</h4>
				<p>You are viewing a feed that contains frequently updated content. You can subscribe to this RSS feed in a number of ways, including the following:</p>
				<ul>
					<li>Drag the URL of the RSS feed into your News Reader</li>
					<li>Cut and paste the URL of the RSS feed into your News Reader</li>
				</ul>
			</div>
		</div>
		<script>
			$( document ).ready(function() {
				$('.container-categories').each(function() {
					$(this).children('.tags:first').addClass('first-tag');
					$(this).children('.tags:last').addClass('last-tag');
				});
			});
		</script>
		</body>
	</xsl:template>
	<!-- LOOP THROUGH BLOG ENTRIES -->
	<xsl:template match="atom:entry">
		<li class="entry">
			<a class="entry-header" href="{atom:link/@href}" target="_blank"><xsl:value-of select="atom:title"/></a>
			<p class="date">
				<span class="feedDate">
					<xsl:call-template name="FormatDateAtom">
						<xsl:with-param name="DateTime" select="atom:published"/>
					</xsl:call-template>
				</span> | <xsl:value-of select="atom:author"  /></p>
			<p class="entry-content"><xsl:value-of select="atom:summary" /></p>
			<div class="container-categories"><xsl:apply-templates select="atom:category"/></div>
		</li>
	</xsl:template>
	<xsl:template match="atom:category">
		 <xsl:choose>
		 	<xsl:when test="@scheme ='http://www.sixapart.com/ns/types#category'">
		 		<span class="categories">
			 		<p><span class="category-label">Category: </span>
			 			<span>
			 				<xsl:value-of select="@term"/>
			 			</span>
			 		</p>
			 	</span>
		 	</xsl:when>
		 	<xsl:otherwise>
		 		<span class="tags">
			 		<span class="tag-label">Tags: </span>
			 		<span>
				 		<xsl:value-of select="@label"/>
					</span>
				</span>
		 	</xsl:otherwise>
		 </xsl:choose>
	</xsl:template>
	<!-- CUSTOM DATE FORMAT -->
	<xsl:template name="FormatDateAtom">
		<xsl:param name="DateTime" />
		<xsl:variable name="year">
			<xsl:value-of select="substring($DateTime,1,4)" />
		</xsl:variable>
		<xsl:variable name="month-temp">
			<xsl:value-of select="substring-after($DateTime,'-')" />
		</xsl:variable>
		<xsl:variable name="month">
			<xsl:value-of select="substring-before($month-temp,'-')" />
		</xsl:variable>
		<xsl:variable name="day-temp">
			<xsl:value-of select="substring-after($month-temp,'-')" />
		</xsl:variable>
		<xsl:variable name="day">
			<xsl:value-of select="substring($day-temp,1,2)" />
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$month = '01'">January</xsl:when>
			<xsl:when test="$month = '02'">February</xsl:when>
			<xsl:when test="$month = '03'">March</xsl:when>
			<xsl:when test="$month = '04'">April</xsl:when>
			<xsl:when test="$month = '05'">May</xsl:when>
			<xsl:when test="$month = '06'">June</xsl:when>
			<xsl:when test="$month = '07'">July</xsl:when>
			<xsl:when test="$month = '08'">August</xsl:when>
			<xsl:when test="$month = '09'">September</xsl:when>
			<xsl:when test="$month = '10'">October</xsl:when>
			<xsl:when test="$month = '11'">November</xsl:when>
			<xsl:when test="$month = '12'">December</xsl:when>
		</xsl:choose>
		<xsl:value-of select="' '"/>
		<!--Jan-->
		<xsl:value-of select="$day"/>
		<xsl:value-of select="', '"/>
		<xsl:value-of select="$year"/>
		<!--Jan 18-->
		<!--<xsl:value-of select="', '"/>-->
		<!--Jan 18, -->
		<!--<xsl:value-of select="$year"/>-->
		<!--Jan 18, 2010-->
	</xsl:template>
</xsl:stylesheet>