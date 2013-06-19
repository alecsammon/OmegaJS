define(['omega/entity', 'entity/dom'], function (e, dom) {

    'use strict';

    return e.extend({
        /**
         * The text of the object
         * Supports full HTML
         * You should use "this.text" to set and read this property
         */
        _text: null,

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
            this.depends(dom);

            Object.defineProperty(this, 'text', {
              set: function (value) {
                  if (this._text !== value) {
                    this._text =  value;
                    this.elem.innerHTML = value;
                  }
                },
              get: function () {
                    return this._text;
                  }
            });

            this.text = (args && args.text) ? args.text : null;

            return this;
          }
      });
  });
