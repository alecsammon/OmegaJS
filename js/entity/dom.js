define(['entity/click', 'omega/entity', 'omegaCore'], function(click, e, o) {

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
                
        init: function() {
            this.elem = document.createElement('div'),
            o.stage.appendChild(this);
            this.watch();
            this.x = 0;
            this.y = 0;
            this.w = 100;
            this.h = 100;

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
