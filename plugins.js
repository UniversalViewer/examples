$(function(){

    $.fn.swapClass = function (removeClass, addClass) {
        return this.each(function () {
            $(this).removeClass(removeClass).addClass(addClass);
        });
    };

    $.fn.toggleClass = function (class1, class2) {
        return this.each(function () {
            var $this = $(this);

            if ($this.hasClass(class1)){
                $(this).removeClass(class1).addClass(class2);
            } else {
                $(this).removeClass(class2).addClass(class1);
            }

        });
    };

    $.fn.toggleText = function (text1, text2) {
        return this.each(function () {
            var $this = $(this);

            if ($this.text() == text1){
                $(this).text(text2);
            } else {
                $(this).text(text1);
            }

        });
    };

    $.fn.updateAttr = function (attrName, oldVal, newVal) {

        return this.each(function () {

            var $this = $(this);

            var attr = $this.attr(attrName);

            if (attr && attr.indexOf(oldVal) === 0){
                attr = attr.replace(oldVal, newVal);
                $this.attr(attrName, attr);
            }
        });
    };

});