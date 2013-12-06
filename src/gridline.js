/**
 * Gridline
 * 
 * Designed to generate CSS on the fly that sets up a responsive grid system of any size
 * for use with Twitter Bootstrap 3.
*/

// Make a style sheet element and append it after other style sheets in the `<head>` section.
function gMakeSheet(mediaAttribute) {
	var style = document.createElement("style");
	if(mediaAttribute !== undefined && mediaAttribute !== null) {
		style.setAttribute("media", mediaAttribute);
	}
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style.sheet;
}

// Add rules to any number of sheets.
function gAddStyleToSheet(s, selector, rules, index) {
	if(s == 'all' || s === null) {
		s = [sheet, smSheet, mdSheet, lgSheet];
	} else {
		if(s.cssRules !== undefined) {
			s = [s];
		}
	}
	for(var i in s) {
		if(s[i].insertRule) {
			s[i].insertRule(selector + "{" + rules + "}", index);
		}
		else {
			s[i].addRule(selector, rules, index);
		}
	}
}

// Mobile first (or "xs")
var sheet = gMakeSheet();
var xsSheet = sheet;
var smSheet = gMakeSheet('only screen and (min-width: 768px)');
var mdSheet = gMakeSheet('only screen and (min-width: 992px)');
var lgSheet = gMakeSheet('only screen and (min-width: 1200px)');

// Twitter Bootstrap default gutter
gAddStyleToSheet(null, "[class*='col-']", "padding-left:15px;padding-right:15px;");
// For flush rows (text edge to edge)
gAddStyleToSheet(null, ".flush-row [class*='col-']:first-of-type", "padding-left:0 !important;");
gAddStyleToSheet(null, ".flush-row [class*='col-']:last-of-type", "padding-right:0 !important;");

/**
 * The same classes are used and the grid size can be adjusted via data attributes.
 * Gutter width can as well.
 * 
 * Example:
 * <div class="row" data-columns="16" data-gutter-width="10">
 *  <div class="col-md-6"></div>
 *  <div class="col-md-6"></div>
 *  <div class="col-md-6"></div>
 * </div>
 * 
 * The JavaScript will detect elements wrapped in these data attributes and adjust only the columns within that element.
 * Do all this on DOM ready.
 */
 $(document).ready(function() {
    var columnSets = [];
    $(".row[data-columns]").each(function() {
        var cols = $(this).data('columns');
        $(this).addClass('cols-' + cols);
        
        if(columnSets['cols-' + cols] === undefined) {
            columnSets.push('cols-' + cols);
            
            for(var c=1; c <= cols; c++) {
                var widthP = (c / cols) * 100;
                gAddStyleToSheet(lgSheet, ".cols-" + cols + " .col-lg-" + c, "width: " + widthP + "%; float:left;");
                gAddStyleToSheet(mdSheet, ".cols-" + cols + " .col-md-" + c, "width: " + widthP + "%; float:left;");
                gAddStyleToSheet(smSheet, ".cols-" + cols + " .col-sm-" + c, "width: " + widthP + "%; float:left;");
                gAddStyleToSheet(xsSheet, ".cols-" + cols + " .col-xs-" + c, "width: " + widthP + "%; float:left;");
                
                gAddStyleToSheet(lgSheet, ".cols-" + cols + " .col-lg-push-" + c, "left: " + widthP + "%;");
                gAddStyleToSheet(mdSheet, ".cols-" + cols + " .col-md-push-" + c, "left: " + widthP + "%;");
                gAddStyleToSheet(smSheet, ".cols-" + cols + " .col-sm-push-" + c, "left: " + widthP + "%;");
                gAddStyleToSheet(xsSheet, ".cols-" + cols + " .col-xs-push-" + c, "left: " + widthP + "%;");
                
                gAddStyleToSheet(lgSheet, ".cols-" + cols + " .col-lg-pull-" + c, "right: " + widthP + "%;");
                gAddStyleToSheet(mdSheet, ".cols-" + cols + " .col-md-pull-" + c, "right: " + widthP + "%;");
                gAddStyleToSheet(smSheet, ".cols-" + cols + " .col-sm-pull-" + c, "right: " + widthP + "%;");
                gAddStyleToSheet(xsSheet, ".cols-" + cols + " .col-xs-pull-" + c, "right: " + widthP + "%;");
            }
        }
    });
    
    var gutterSets = [];
    $(".row[data-gutter-width]").each(function() {
        var gutterWidth = $(this).data('gutter-width');
        $(this).addClass('gutter-width-' + gutterWidth);
        
        var gutterScaling = $(this).data('gutter-scaling');
        gutterScaling = (gutterScaling === undefined) ? true:gutterScaling;
        gutterScaling = (gutterScaling == 'no' || gutterScaling == 'false' || gutterScaling == '0' || gutterScaling === 0) ? false:true;
        if(gutterScaling) {
            $(this).addClass('gutter-scaled-width-' + gutterWidth);
        }
        
        var flushRow = $(this).data('flush-row');
        flushRow = (flushRow == 'yes' || flushRow == 'true' || flushRow == '1' || flushRow === 1) ? true:false;
        if(flushRow) {
            $(this).addClass('flush-row');
        }
        
        if(gutterSets['gutter-width-' + gutterWidth] === undefined) {
            gutterSets.push('gutter-width-' + gutterWidth);
            
            var halfGutter = Math.floor(gutterWidth / 2);
            gAddStyleToSheet(lgSheet, ".gutter-width-" + gutterWidth + " [class*='col-lg-']", "position: relative; min-height: 1px; padding-left: " + halfGutter + "px; padding-right: " + halfGutter + "px;");
            gAddStyleToSheet(mdSheet, ".gutter-width-" + gutterWidth + " [class*='col-md-']", "position: relative; min-height: 1px; padding-left: " + halfGutter + "px; padding-right: " + halfGutter + "px;");
            gAddStyleToSheet(smSheet, ".gutter-width-" + gutterWidth + " [class*='col-sm-']", "position: relative; min-height: 1px; padding-left: " + halfGutter + "px; padding-right: " + halfGutter + "px;");
            gAddStyleToSheet(xsSheet, ".gutter-width-" + gutterWidth + " [class*='col-xs-']", "position: relative; min-height: 1px; padding-left: " + halfGutter + "px; padding-right: " + halfGutter + "px;");
            
            // Gutters should be smaller on smaller devices to be more proportionate...though this can be disabled with the `gutter-scaling` data attribute.
            var quarterGutter = Math.floor(gutterWidth / 4);
            gAddStyleToSheet(xsSheet, ".gutter-scaled-width-" + gutterWidth + " [class*='col-xs-']", "position: relative; min-height: 1px; padding-left: " + quarterGutter + "px !important; padding-right: " + quarterGutter + "px !important;");
            gAddStyleToSheet(smSheet, ".gutter-scaled-width-" + gutterWidth + " [class*='col-sm-']", "position: relative; min-height: 1px; padding-left: " + quarterGutter + "px !important; padding-right: " + quarterGutter + "px !important;");
            // These are still going to be normal size...
            gAddStyleToSheet(mdSheet, ".gutter-scaled-width-" + gutterWidth + " [class*='col-md-']", "position: relative; min-height: 1px; padding-left: " + halfGutter + "px !important; padding-right: " + halfGutter + "px !important;");
            gAddStyleToSheet(lgSheet, ".gutter-scaled-width-" + gutterWidth + " [class*='col-lg-']", "position: relative; min-height: 1px; padding-left: " + halfGutter + "px !important; padding-right: " + halfGutter + "px !important;");
        }
        
    });
 });