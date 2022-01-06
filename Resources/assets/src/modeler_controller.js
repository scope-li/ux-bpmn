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
import Modeler from 'bpmn-js/lib/Modeler';

import propertiesPanel from 'bpmn-js-properties-panel';
import propertiesProviderBpmn from 'bpmn-js-properties-panel/lib/provider/bpmn';
import propertiesProviderCamunda from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import Prism from 'prismjs';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import 'prismjs/themes/prism.css';
import '@scopeli/ux-bpmn/src/style.css';


export default class extends Controller {
    connect() {
        const payload = JSON.parse(this.element.getAttribute('data-view'));
        this.saveUrl = payload.config.saveUrl;

        this._dispatchEvent('bpmn-modeler:pre-connect', { payload }, true);

        const modelerConfig = {
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
                propertiesPanel
            ]
        };

        if('camunda' === payload.type) {
            modelerConfig.additionalModules.push(propertiesProviderCamunda);
            modelerConfig.moddleExtensions = {
                camunda: camundaModdleDescriptor
            }
        } else {
            modelerConfig.additionalModules.push(propertiesProviderBpmn);
        }

        this.modeler = new Modeler(modelerConfig);

        this.modeler.importXML(payload.xml)
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

        this._dispatchEvent('bpmn-modeler:connect', { modeler: this.modeler }, true);
    }

    async saveBpmn() {
        const { xml } = await this.modeler.saveXML({ format: true });
        axios.post(this.saveUrl, {
            xml: xml
        }).then(function (response) {
            alert('Success saved');
        }).catch(function (error) {
            alert('Error on saving!!!');
            console.log(error);
        });
    }

    async downloadBpmn() {
        const { xml } = await this.modeler.saveXML({ format: true });
        this._download('diagram.bpmn', xml);
    }

    async downloadSvg() {
        const { svg } = await this.modeler.saveSVG({ format: true });
        this._download('diagram.svg', svg);
    }

    async showXml() {
        const elShowXml = document.getElementById('bpmn-show-xml');
        const elBody = document.getElementById('bpmn-body');

        if (elShowXml.style.display === 'none') {
            const { xml } = await this.modeler.saveXML({ format: true });
            elShowXml.innerHTML = Prism.highlight(xml, Prism.languages.xml, 'xml');
            elShowXml.style.display = 'block';
            elBody.style.display = 'none';
        } else {
            elShowXml.style.display = 'none';
            elBody.style.display = 'flex';
            elShowXml.innerHTML = '';
        }
    }

    _download(name, data) {
        const encodedData = encodeURIComponent(data);
        const link = document.createElement('a');
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    _dispatchEvent(name, payload = null, canBubble = false, cancelable = false) {
        const userEvent = document.createEvent('CustomEvent');
        userEvent.initCustomEvent(name, canBubble, cancelable, payload);

        this.element.dispatchEvent(userEvent);
    }
}
