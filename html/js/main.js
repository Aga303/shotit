var shotit = {
	folder:'./',
	gallery_json:'gallery_items.json',
	refresh_time:'2000',

	loadImageJSON: function() {
		var imageJSON;
		$('#json_content').load(shotit.folder + shotit.gallery_json, function() {
			imageJSON = $('#json_content').html();
			shotit.remove
			shotit.parseImageJSON(imageJSON);
		});
	},

	parseImageJSON: function(imageJSON) {
		var data = jQuery.parseJSON( imageJSON);
		var found = false;

		$.each(data, function(index, element) {
			found = false;
			$('.image-element').each(function(index, domElement) {
				if ($(this).attr('id') == element.img_path) {
					found = true;
				}
			});

			if (!found)
				$('#gallery_container').append(
					'<br><br><div id="' + element.img_path + '" class="row image-element"><div class="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10"><img src="' 
					+ element.img_path + '" class="img-responsive" alt=""><h4 class="caption">' + element.description + '</h4></div></div>'
				)
		});
		setTimeout(shotit.loadImageJSON,shotit.refresh_time);
	},

	init: function() {
		shotit.loadImageJSON();
	}
}

$(document).ready(function() {
	shotit.init();
});