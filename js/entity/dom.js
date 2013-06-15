define(['omega/entity', 'omegaCore'], function(e, o) {

    'use strict';

    return e.extends({        
        elem: null,

        watchAttr: function(propName, style) {
            Object.defineProperty(this, propName, {
                set: function(value) {
                    this['_'+propName]= value;
                    this.setStyle(style, value+'px');
                },
                get: function() {
                    return this['_'+propName];
                }
            });

            return this;
        },       

        watch: function() {
            this.watchAttr('y', 'bottom')
                .watchAttr('x', 'left')
                .watchAttr('w', 'width')
                .watchAttr('h', 'height');
        },
                
        setStyle: function(styleType, style) {
            switch (styleType) {
                case 'TransformOrigin':
                case 'Transform':
                    this.elem.style[device.getCssPrefix() + styleType] = style;
                    break;
                default:
                    this.elem.style[styleType] = style;
            }
            return this;
        },

        setStyles: function(styles) {
            for (var key in styles) {
                if (typeof styles[key] !== 'function') {
                    this.setStyle(key, styles[key]);
                }
            }

            return this;
        },          
                
        init: function(args) {
            this.elem = document.createElement('div');
            o.addElemToStage(this);
            this.watch();
            this.x = (args && args.x) ? args.x : 0;
            this.y = (args && args.y) ? args.y : 0;
            this.w = (args && args.w) ? args.w : 0;
            this.h = (args && args.h) ? args.h : 0;

            this.setStyles({
                background: 'blue',
                position: 'absolute',
                border: '1px solid #FFFFFF',
                color: '#FFFFFF'
            });

            return this;
        }
    });
});
