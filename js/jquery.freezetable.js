/*!
 * jQuery plugin that freezes the header of a table and adds a vertical scroll bar.
 * 
 * Using https://github.com/addyosmani/jquery-plugin-patterns/
 * Original author: @jacksonakj
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function($, window, document, undefined) {
    var pluginName = 'freezeTable',
        defaults = {
            'height': 480,
            'scrollbarWidth': 20,
            'autoHeight': false,
            'autoHeightMarginBottom': 20
        };

    function calcAutoHeight (item, bottomMargin) {
        var fromTop = item.offset().top + item.find('thead').height() + bottomMargin;
        return $(window).height() - fromTop;
    }

    function FreezeTable(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
    
    FreezeTable.prototype.init = function() {
        var $this = $(this.element);
        var me = this;
        var tblMargin = ($this.outerWidth(true) - $this.innerWidth()) / 2;
        var tblHeight = this.options.height;
        if (this.options.autoHeight === true) {
            tblHeight = calcAutoHeight($this, this.options.autoHeightMarginBottom);
        }
        var tblWidth = $this.width() + tblMargin + this.options.scrollbarWidth;
        var container = $('<div />').addClass('freezetable');
        var tblDiv = $('<div />').css('height', tblHeight + 'px')
                                 .css('overflow', 'auto')
                                 .css('overflow-x', 'hidden')
                                 .css('width', tblWidth + 'px')
                                 .addClass('freezetable-body');
        $this.wrap(tblDiv);
        $this.parent().wrap(container);
        var frozenTbl = $this.clone();
        $this.find('thead tr').remove();
        $this.css('margin-top', 0)
             .css('margin-bottom', 0);
        frozenTbl.find('tbody tr').remove();
        frozenTbl.css('margin-bottom', 0);
        $this.parent().parent().prepend(frozenTbl);
        frozenTbl.wrap('<div/>');
        frozenTbl.parent().addClass('freezetable-header');
        $(window).resize(function() {
            if (me.options.autoHeight === true) {
                $this.parent().css('height', calcAutoHeight($this, me.options.autoHeightMarginBottom));
            }
        });
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new FreezeTable(this, options));
            }
        });
    };
})(jQuery, window, document);