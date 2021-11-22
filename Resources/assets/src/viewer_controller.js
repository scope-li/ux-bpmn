/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

'use strict';

import {Controller} from 'stimulus';
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";
import createElement from "./helper/CreateElement";

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import "./style/style.scss";

export default class extends Controller {
    static values = {
        diagram: String,
        currentId: String,
        flowPath: Array,
    }

    connect() {
        const elContainer = createElement('div', {id: 'bpmn-container'});
        const elViewer = createElement('div', {id: 'bpmn-viewer'}, elContainer);

        this.element.appendChild(elViewer);
    }

    render() {
        this.viewer = new NavigatedViewer({
            container: '#bpmn-viewer'
        });

        const controller = this;
        const diagram = this.diagramValue;

        controller.openDiagram(diagram);
    }

    async openDiagram(bpmnXML) {
        try {
            await this.viewer.importXML(bpmnXML);
            var canvas = this.viewer.get('canvas');
            canvas.zoom('fit-viewport');
        } catch (err) {
            console.error('could not import BPMN 2.0 diagram', err);
        }
    }
}
