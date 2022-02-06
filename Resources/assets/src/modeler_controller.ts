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
import Modeler from 'bpmn-js/lib/Modeler';
// @ts-ignore
import propertiesPanel from 'bpmn-js-properties-panel';
// @ts-ignore
import propertiesProviderBpmn from 'bpmn-js-properties-panel/lib/provider/bpmn';
// @ts-ignore
import propertiesProviderCamunda from 'bpmn-js-properties-panel/lib/provider/camunda';
// @ts-ignore
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import Prism from 'prismjs';
import axios from 'axios';

interface ModelerPayload {
    type: 'default' | 'camunda';
    xml: string;
    config: {
        saveUrl: string;
        menu: {
            saveBpmn: { title: string; icon: string };
            downloadBpmn: { title: string; icon: string };
            downloadSvg: { title: string; icon: string };
            showXml: { title: string; icon: string };
        };
    };
}

interface ModelerConfig {
    container: string;
    width: string;
    height: string;
    propertiesPanel: {
        parent: string;
    };
    keyboard: {
        bindTo: Document;
    };
    additionalModules: Array<any>;
    moddleExtensions?: object;
}

export default class extends Controller {
    readonly viewValue: ModelerPayload;

    private modeler: Modeler;
    private modelerConfig: ModelerConfig = {
        container: '#bpmn-container',
        width: '100%',
        height: '100%',
        propertiesPanel: {
            parent: '#bpmn-properties-panel',
        },
        keyboard: {
            bindTo: document,
        },
        additionalModules: [propertiesPanel],
    };

    static values = {
        view: Object,
    };

    connect() {
        this._dispatchEvent('bpmn-modeler:pre-connect', this.viewValue, true);

        if ('default' === this.viewValue.type) {
            this.modelerConfig.additionalModules.push(propertiesProviderBpmn);
        } else {
            this.modelerConfig.additionalModules.push(propertiesProviderCamunda);
            this.modelerConfig.moddleExtensions = {
                camunda: camundaModdleDescriptor,
            };
        }

        this.modeler = new Modeler(this.modelerConfig);

        this.loadDiagram();

        this._dispatchEvent('bpmn-modeler:connect', { modeler: this.modeler }, true);
    }

    loadDiagram() {
        this.modeler
            .importXML(this.viewValue.xml)
            .then(() => {
                this.modeler.get('canvas').zoom('fit-viewport');
            })
            .catch((err: any) => {
                console.error('Could not import BPMN 2.0 diagram', err);
            });
    }

    async saveBpmn() {
        const { xml } = await this.modeler.saveXML({ format: true });
        axios
            .post(this.viewValue.config.saveUrl, {
                xml: xml,
            })
            .then(() => {
                alert('Success saved');
            })
            .catch((err: any) => {
                alert('Error on saving!!!');
                console.error('Error on saving!!!', err);
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

    async showXml(event: PointerEvent) {
        const elShowXml: HTMLElement | null = document.getElementById('bpmn-show-xml');
        if (elShowXml === null) {
            new Error('No element with id "bpmn-show-xml" found.');
            return;
        }

        const elBody: HTMLElement | null = document.getElementById('bpmn-body');
        if (elBody === null) {
            new Error('No element with id "bpmn-body" found.');
            return;
        }

        if (elShowXml.style.display === 'none') {
            const { xml } = await this.modeler.saveXML({ format: true });
            elShowXml.innerHTML = Prism.highlight(xml, Prism.languages.xml, 'xml');
            elShowXml.style.display = 'block';
            elBody.style.display = 'none';
            (event.currentTarget as HTMLElement).classList.add('active');
        } else {
            elShowXml.style.display = 'none';
            elBody.style.display = 'flex';
            elShowXml.innerHTML = '';
            (event.currentTarget as HTMLElement).classList.remove('active');
        }
    }

    _download(name: string, data: string) {
        const encodedData = encodeURIComponent(data);
        const link = document.createElement('a');
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    _dispatchEvent(name: string, payload: Modeler | ModelerPayload, bubbles = false) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload, bubbles: bubbles }));
    }
}
