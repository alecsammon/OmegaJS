define(['omega/entity', 'omega/behaviour/dom'], function (e, dom) {

  'use strict';

  return e.extend({
    /**
     * The text of the object
     * Supports full HTML
     */
    //content: null,

    text: {content: null},
    /**
     * Create a new text entity
     *
     * @param obj args
     * {
     *   text: [string] (opt)
     * }
     *
     * @returns this
     */
    init: function (args) {
      this.has(dom);

      Object.defineProperty(this, 'content', {
        set: function (value) {
          if (this.text.content !== value) {
            this.text.contents = value;
            this.elem.innerHTML = value;
          }
        },
        get: function () {
          return this.text.content;
        }
      });

      this.content = (args && args.text && args.text.content) ? args.text.content : null;

      return this;
    }
  });
});
