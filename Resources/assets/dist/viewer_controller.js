'use strict';
import { Controller } from '@hotwired/stimulus';
import Viewer from "bpmn-js/lib/Viewer";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";
export default class extends Controller {
    constructor() {
        super(...arguments);
        this.viewerConfig = {
            container: '#bpmn-viewer'
        };
    }
    connect() {
        const jsonData = this.element.getAttribute('data-view');
        if (jsonData === null) {
            new Error('The data-view attribute is null.');
            return;
        }
        this.payload = JSON.parse(jsonData);
        this._dispatchEvent('bpmn-viewer:pre-connect', this.payload, true);
        if ('default' === this.payload.type) {
            this.viewer = new Viewer(this.viewerConfig);
        }
        else {
            this.viewer = new NavigatedViewer(this.viewerConfig);
        }
        this.loadDiagram();
        this._dispatchEvent('bpmn-viewer:connect', this.viewer, true);
    }
    loadDiagram() {
        this.viewer.importXML(this.payload.xml)
            .then(() => {
            const canvas = this.viewer.get('canvas');
            canvas.zoom('fit-viewport');
            this.payload.config.flow.forEach(flowId => {
                canvas.addMarker(flowId, this.payload.config.flow_class);
            });
            this.payload.config.current.forEach(currentId => {
                canvas.addMarker(currentId, this.payload.config.current_class);
            });
        })
            .catch((err) => {
            console.error('Could not import BPMN 2.0 diagram', err);
        });
    }
    _dispatchEvent(name, payload, bubbles = false) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload, bubbles: bubbles }));
    }
}
