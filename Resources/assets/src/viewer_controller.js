/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

'use strict';

import { Controller } from 'stimulus';
import Viewer from 'bpmn-js/lib/Viewer';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';

import '@scopeli/ux-bpmn/src/style.css';

export default class extends Controller {
    connect() {
        const payload = JSON.parse(this.element.getAttribute('data-view'));

        if('navigated' === payload.type) {
            var viewer = new NavigatedViewer({
                container: '#bpmn-viewer'
            });
        } else {
            var viewer = new Viewer({
                container: '#bpmn-viewer'
            });
        }

        this.loadDiagram(viewer, payload);
    }

    async loadDiagram(viewer, payload) {
        try {
            await viewer.importXML(payload.xml);

            const canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');

            for (var i = 0; i < payload.config.flow.length; i++) {
                canvas.addMarker(payload.config.flow[i], payload.config.flow_class);
            }

            for (var i = 0; i < payload.config.current.length; i++) {
                canvas.addMarker(payload.config.current[i], payload.config.current_class);
            }
        } catch (err) {
            console.error('could not import BPMN 2.0 diagram', err);
        }
    }
}
