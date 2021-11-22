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
import Modeler from "bpmn-js/lib/Modeler";

import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import createElement from "./helper/CreateElement";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import "./style/style.scss";

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

export default class extends Controller {

    static values = {
        saveUrl: String,
        diagram: String,
    }

    connect() {
        const elBtnSaveIcon = createElement('i', {class: 'far fa-save'});
        const elBtnSave = createElement(
            'button',
            {'data-action': this.getActionName('save'), title: 'Save'},
            elBtnSaveIcon
        );

        const elBtnDownloadBpmnIcon = createElement('i', {class: 'fas fa-download'});
        const elBtnDownloadBpmn = createElement(
            'button',
            {'data-action': this.getActionName('downloadBpmn'), title: 'Download BPMN'},
            elBtnDownloadBpmnIcon
        );

        const elBtnDownloadSvgIcon = createElement('i', {class: 'fas fa-image'});
        const elBtnDownloadSvg = createElement(
            'button',
            {'data-action': this.getActionName('downloadSvg'), title: 'Download SVG'},
            elBtnDownloadSvgIcon
        );

        const elBtnXmlIcon = createElement('i', {class: 'fas fa-code'});
        const elBtnXml = createElement(
            'button',
            {'data-action': this.getActionName('showXml'), title: 'XML dump (Console)'},
            elBtnXmlIcon
        );

        const elMenu = createElement(
            'div',
            {id: 'bpmn-menu'},
            [elBtnSave, elBtnDownloadBpmn, elBtnDownloadSvg, elBtnXml]
        );

        const elContainer = createElement('div', {id: 'bpmn-container'});
        const elPropertiesPanel = createElement('div', {id: 'bpmn-properties-panel'});
        const elBody = createElement('div', {id: 'bpmn-body'}, [elContainer, elPropertiesPanel]);
        const elShowXml = createElement('pre', {id: 'bpmn-show-xml', style: 'display: none;'});
        const elModeler = createElement('div', {id: 'bpmn-modeler'}, [elMenu, elShowXml, elBody]);

        this.element.appendChild(elModeler);

        this.render();
    }

    render() {
        this.modeler = new Modeler({
            container: '#bpmn-container',
            width: '100%',
            height: '100%',
            propertiesPanel: {
                parent: '#bpmn-properties-panel'
            },
            keyboard: {
                bindTo: document
            },
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule
            ],
            // make camunda prefix known for import, editing and export
            moddleExtensions: {
                camunda: camundaModdleDescriptor
            }
        });

        this.modeler
            .importXML(this.diagramValue)
            .then(({ warnings }) => {
                if (warnings.length) {
                    console.log(warnings);
                }

                const canvas = this.modeler.get('canvas');

                canvas.zoom('fit-viewport');
            })
            .catch(err => {
                console.log(err);
            });
    }

    async save() {
        const { xml } = await this.modeler.saveXML({ format: true });
        $.ajax({
            type: 'post',
            url: this.saveUrlValue,
            data: {
                xml: xml
            },
            success: function(result) {
                alert('Success saved');
            },
            error: function(result) {
                alert('Error on saving!!!');
            }
        });
    }

    async downloadBpmn() {
        const { xml } = await this.modeler.saveXML({ format: true });
        this.download('diagram.bpmn', xml);
    }

    async downloadSvg() {
        const { xml } = await this.modeler.saveXML({ format: true });
        this.download('diagram.svg', xml);
    }

    async showXml() {
        const elShowXml = document.getElementById('bpmn-show-xml');
        const elBody = document.getElementById('bpmn-body');
        if (elShowXml.style.display === 'none') {
            var { xml } = await this.modeler.saveXML({ format: true });
            xml = xml.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            elShowXml.innerHTML = xml;
            elShowXml.style.display = 'block';
            elBody.style.display = 'none';
        } else {
            elShowXml.style.display = 'none';
            elBody.style.display = 'flex';
            elShowXml.innerHTML = '';
        }
    }

    download(name, data) {
        const encodedData = encodeURIComponent(data);
        const link = createElement('a', {
            href: 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
            download: name
        });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    getActionName(method) {
        return this.data.identifier + '#' + method;
    }
}
