var shotit = {
	folder:'./',
	gallery_json:'gallery_items.json',
	refresh_time:'2000',

	loadImageJSON: function() {
		var imageJSON;
		var request = $.ajax({
			url: shotit.folder + shotit.gallery_json
		});
		request.done(shotit.parseImageJSON);
	},

	parseImageJSON: function(imageJSON) {
		$.each(imageJSON, function(index, element) {
			if (!$(document.getElementById(element.img_path)).is('.image-element'))
				shotit.createEntry(element.img_path, element.description);
		});
		setTimeout(shotit.loadImageJSON,shotit.refresh_time);
	},

	createEntry: function(imagePath, description) {
		var row = $('<div></div>');
		var grid = $('<div></div>');
		var image = $('<img>');
		var caption = $('<h4></h4>');

		row.attr('id', imagePath);
		row.addClass('row');
		row.addClass('image-element');
		grid.addClass('col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10');
		image.attr('src', imagePath);
		image.addClass('img-responsive');
		caption.addClass('caption');
		caption.html(description);

		row.append(grid);
		grid.append(image);
		grid.append(caption);

		$('#gallery_container').append(row);
	},

	init: function() {
		shotit.loadImageJSON();
	}
}

$(document).ready(function() {
	shotit.init();
});