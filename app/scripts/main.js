function init() {
	var link = document.querySelector('link[rel="import"]');

	// Clone the <template> in the import.
	var template = link.import.querySelector('.book');
	var clone = document.importNode(template, true);

	document.querySelector('.container').appendChild(clone);

	var chapters = $(clone).find('.chapter');

	for (var i = 0; i < chapters.length; i++) {
		var chapter = chapters[i];
		processChapter(chapter, i);
	}
}

function processChapter(chapter, chapterId) {
	var $chapter = $(chapter);

	$chapter.attr('id', chapterId);

	var text = $chapter.text();

	var paragraphId = 0;


	text = text.replace(/\n\n[\n]*/g, '</p><p class="paragraph">');
	text += '</p></div>'

	$chapter.html(text);

	$.each($chapter.find('.paragraph'), function(idx, paragraph) {
		var $paragraph = $(paragraph);
		var paragraphHtmlId = 'c' + chapterId + 'p' + paragraphId;

		$paragraph.attr('data-id', paragraphId++);
		$paragraph.attr('id', paragraphHtmlId);
	});

	$chapter.unwrap();
}

function getNextPageScrollPosition() {
	
}

init();