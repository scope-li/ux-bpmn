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

interface ViewerModel {
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
    private viewer: Viewer | NavigatedViewer;
    private payload: ViewerModel;
    private viewerConfig: ViewerConfig = {
        container: '#bpmn-viewer',
    };

    connect() {
        const jsonData: string | null = this.element.getAttribute('data-view');
        if (jsonData === null) {
            new Error('The data-view attribute is null.');
            return;
        }

        this.payload = JSON.parse(jsonData);

        this._dispatchEvent('bpmn-viewer:pre-connect', this.payload, true);

        if ('default' === this.payload.type) {
            this.viewer = new Viewer(this.viewerConfig);
        } else {
            this.viewer = new NavigatedViewer(this.viewerConfig);
        }

        this.loadDiagram();

        this._dispatchEvent('bpmn-viewer:connect', this.viewer, true);
    }

    loadDiagram() {
        this.viewer
            .importXML(this.payload.xml)
            .then(() => {
                const canvas = this.viewer.get('canvas');
                canvas.zoom('fit-viewport');

                this.payload.config.flow.forEach((flowId) => {
                    canvas.addMarker(flowId, this.payload.config.flow_class);
                });

                this.payload.config.current.forEach((currentId) => {
                    canvas.addMarker(currentId, this.payload.config.current_class);
                });
            })
            .catch((err: any) => {
                console.error('Could not import BPMN 2.0 diagram', err);
            });
    }

    _dispatchEvent(name: string, payload: Viewer | NavigatedViewer | ViewerModel, bubbles = false) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload, bubbles: bubbles }));
    }
}
