/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

'use strict';

import { Controller } from '@hotwired/stimulus';
// @ts-ignore
import Viewer from 'bpmn-js/lib/Viewer';
// @ts-ignore
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';

interface ViewerPayload {
    type: 'default' | 'navigated';
    xml: string;
    config: {
        flow: string[];
        flow_class: string;
        current: string[];
        current_class: string;
    };
}

interface ViewerConfig {
    container: string;
}

export default class extends Controller {
    readonly viewValue: ViewerPayload;

    private viewer: Viewer | NavigatedViewer;
    private viewerConfig: ViewerConfig = {
        container: '#bpmn-viewer',
    };

    static values = {
        view: Object,
    };

    connect() {
        this._dispatchEvent('bpmn-viewer:pre-connect', this.viewValue, true);

        if ('default' === this.viewValue.type) {
            this.viewer = new Viewer(this.viewerConfig);
        } else {
            this.viewer = new NavigatedViewer(this.viewerConfig);
        }

        this.loadDiagram();

        this._dispatchEvent('bpmn-viewer:connect', this.viewer, true);
    }

    loadDiagram() {
        this.viewer
            .importXML(this.viewValue.xml)
            .then(() => {
                const canvas = this.viewer.get('canvas');
                canvas.zoom('fit-viewport');

                this.viewValue.config.flow.forEach((flowId) => {
                    canvas.addMarker(flowId, this.viewValue.config.flow_class);
                });

                this.viewValue.config.current.forEach((currentId) => {
                    canvas.addMarker(currentId, this.viewValue.config.current_class);
                });
            })
            .catch((err: any) => {
                console.error('Could not import BPMN 2.0 diagram', err);
            });
    }

    _dispatchEvent(name: string, payload: Viewer | NavigatedViewer | ViewerPayload, bubbles = false) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload, bubbles: bubbles }));
    }
}
