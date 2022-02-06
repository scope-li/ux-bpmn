'use strict';
import { Controller } from '@hotwired/stimulus';
import Viewer from 'bpmn-js/lib/Viewer';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
export default class default_1 extends Controller {
    constructor() {
        super(...arguments);
        this.viewerConfig = {
            container: '#bpmn-viewer',
        };
    }
    connect() {
        this._dispatchEvent('bpmn-viewer:pre-connect', this.viewValue, true);
        if ('default' === this.viewValue.type) {
            this.viewer = new Viewer(this.viewerConfig);
        }
        else {
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
            .catch((err) => {
            console.error('Could not import BPMN 2.0 diagram', err);
        });
    }
    _dispatchEvent(name, payload, bubbles = false) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload, bubbles: bubbles }));
    }
}
default_1.values = {
    view: Object,
};
