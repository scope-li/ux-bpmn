/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

export default function createElement(element, attribute, inner = '') {
    if (typeof (element) === undefined) {
        return false;
    }

    if (typeof (inner) === undefined) {
        inner = '';
    }

    var el = document.createElement(element);

    if (typeof (attribute) === 'object') {
        for (var key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }

    if (!Array.isArray(inner)) {
        inner = [inner];
    }

    for (var k = 0; k < inner.length; k++) {
        if (inner[k].tagName) {
            el.appendChild(inner[k]);
        } else {
            el.appendChild(document.createTextNode(inner[k]));
        }
    }

    return el;
}