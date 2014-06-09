;(function( $ ){
	'use strict';

	var $this;
	var setting;
	var listAry		= new Array();
	var showIndex	= 0;
	var $moreImage	= $( '<div />' );;

	function showList( num ) {
		var lastShowIndex = showIndex + num;

		for( ; showIndex < lastShowIndex ; ++showIndex ) {
			if( showIndex < listAry.length ) {
				$this.append( $( listAry[ showIndex ] ).hide() );
			}
		}
		if( showIndex - num > 0 && setting.animeFlag ) {
			var oldULH = $this.height();
			$this.children().slideDown(
				setting.animeTime ,
				"swing" ,
				function() {
					console.log( "anime complete" );
				}
			);
		}
		else {
			$this.children().show();
		}

		if( showIndex < listAry.length ) {
			$moreImage.click( function() {
				$( this ).remove();
				showList( num );
			});
			$this.after( $moreImage );
		}
	}

	$.fn.listMore = function( option ) {
		var defaults = {
			showNum		: 3 ,
			moreImage	: null ,
			animeFlag	: false ,
			animeTime	: 1000
		};

		setting 	= $.extend( defaults , option );
		$this		= $( this );

		if( setting.moreImage == null ) {
			$moreImage.attr( "class" , "more_image" );
			$moreImage.append( "<p>もっと見る</p>" );
		}
		else {
			$moreImage.append( $( '<img />' ).attr( "src" , setting.moreImage ).css( "width" , "100%" ) );
		}
		if( setting.showNum <= 0 ) {
			return;
		}
		if( !$this.is( 'ul' ) ) {
			return;
		}
		$this.find( "li , ol" ).each( function( index , element ) {
			listAry.push( element );
		});
		$this.html( "" );
		if( listAry.length <= setting.showNum ) {
			return;
		}

		showList( setting.showNum );
	};
})(jQuery);
