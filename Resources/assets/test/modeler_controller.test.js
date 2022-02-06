/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import { clearDOM, mountDOM } from '@symfony/stimulus-testing';
import { getByTestId } from '@testing-library/dom';
import { bpmnDefinition, dataToJsonAttribute, startStimulus } from './helper';
import ModelerController from '../dist/modeler_controller';

describe('ModelerController', function () {
    let container;
    let application;

    beforeEach(() => {
        const dataView = dataToJsonAttribute(data);
        container = mountDOM(`
            <div id="bpmn-modeler" 
                 data-testid="modeler"
                 data-event-prefix="bpmn-modeler"
                 data-controller="scopeli--ux-bpmn--modeler" 
                 data-scopeli--ux-bpmn--modeler-view-value="${dataView}" >
                <div id="bpmn-menu">
                    <button data-action="scopeli--ux-bpmn--modeler#saveBpmn" title="Save">
                        <i class="fas fa-save"></i>
                    </button>
                    <button data-action="scopeli--ux-bpmn--modeler#downloadBpmn" title="Download BPMN">
                        <i class="fas fa-download"></i>
                    </button>
                    <button data-action="scopeli--ux-bpmn--modeler#downloadSvg" title="Download SVG">
                        <i class="fas fa-image"></i>
                    </button>
                    <button data-action="scopeli--ux-bpmn--modeler#showXml" title="XML">
                        <i class="fas fa-code"></i>
                    </button>
                </div>
                <div id="bpmn-show-xml" style="display: none;"></div>
                <div id="bpmn-body">
                    <div id="bpmn-container"></div>
                    <div id="bpmn-properties-panel"></div>
                </div>
            </div>
        `);
    });

    afterEach(() => {
        clearDOM();
        application.stop();
    });

    it('connect', async () => {
        expect(getByTestId(container, 'modeler')).not.toHaveClass('pre-connected');
        expect(getByTestId(container, 'modeler')).not.toHaveClass('connected');

        application = startStimulus('scopeli--ux-bpmn--modeler', ModelerController);

        setTimeout(function () {
            expect(getByTestId(container, 'modeler')).toHaveClass('pre-connected');
            expect(getByTestId(container, 'modeler')).toHaveClass('connected');
        }, 1000);
    });
});

const data = {
    type: 'default',
    xml: bpmnDefinition,
    config: {
        saveUrl: '/save',
        menu: {
            saveBpmn: {
                title: 'Save',
                icon: 'fas fa-save',
            },
            downloadBpmn: {
                title: 'Download BPMN',
                icon: 'fas fa-download',
            },
            downloadSvg: {
                title: 'Download SVG',
                icon: 'fas fa-image',
            },
            showXml: {
                title: 'XML',
                icon: 'fas fa-code',
            },
        },
    },
};
