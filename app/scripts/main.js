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

	$('.prevPage').on('click', prevPage);
	$('.nextPage').on('click', nextPage);
}

function processChapter(chapter, chapterId) {
	var $chapter = $(chapter);

	$chapter.attr('id', chapterId);

	var text = $chapter.text();

	var paragraphId = 0;

	text = '<p>' + text;
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

function nextPage() {
	var topPos = $(window).scrollTop();
	var screenHeight = $(window).height();

	var nextParagraphTop = topPos + screenHeight;

	var nextParagraph;
	Array.prototype.some.call($('.paragraph'),function(p) {
	  if($(p).offset().top > nextParagraphTop) {
	    nextParagraph = p;
	    return true;
	   }
	   return false;
	});

	var prevParagraph = getPrevParagraph(nextParagraph);

	if(prevParagraph.size() > 0) {
		$(window).scrollTop(prevParagraph.offset().top);
	}
}

function prevPage() {
	var topPos = $(window).scrollTop();
	var screenHeight = $(window).height();

	var prevParagraphTop = topPos - screenHeight;

	var prevParagraph;
	var reverseParagraphs = Array.prototype.reverse.call($('.paragraph'));
	Array.prototype.some.call(reverseParagraphs,function(p) {
	  if($(p).offset().top < prevParagraphTop) {
	    prevParagraph = p;
	    return true;
	   }
	   return false;
	});

	var prevParagraph2 = getPrevParagraph(prevParagraph);
	if(prevParagraph2.size() > 0) {
		$(window).scrollTop(prevParagraph2.offset().top);
	}
}

function getPrevParagraph(paragraph) {
	var $paragraph = $(paragraph);
	var prevP = $paragraph.prev();
	if(typeof prevP === 'undefined') {
		prevP = prevP.parent().prev().prev().children().last();
	}
	return prevP || paragraph;
}

init();