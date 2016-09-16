"use strict";

var joint = require('jointjs');

joint.shapes.erd.Start = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Start',
        size: { width: 50, height: 50 },
        attrs: {
            'circle': {
                transform: 'translate(25, 25)'
            },
            '.outer': {
                stroke: '#D35400', 'stroke-width': 2,
                cx: 0, cy: 0, rx: 25, ry: 25,
                fill: '#E67E22'
            },
            '.inner': {
                stroke: '#D35400', 'stroke-width': 2,
                cx: 0, cy: 0, rx: 20, ry: 20,
                fill: '#E67E22', display: 'none'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .5,
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.End = joint.shapes.erd.Start.extend({
	defaults: joint.util.deepSupplement({
		type: 'erd.End',
		attrs: {
			text: { text: 'End' }
		}
	},
	joint.shapes.erd.Start.prototype.defaults)
});

var s4 = function(){
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

var Global = {
	createGuid: function(){
		return (s4() + s4().substr(0, 3) + "-" + s4()).toLowerCase();
	}
};

module.exports = Global;
