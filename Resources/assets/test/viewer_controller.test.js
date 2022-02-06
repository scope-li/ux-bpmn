/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import {clearDOM, mountDOM} from '@symfony/stimulus-testing';
import {getByTestId} from '@testing-library/dom';
import {bpmnDefinition, dataToJsonAttribute, startStimulus} from "./helper";
import ViewerController from "../dist/viewer_controller";

describe("ViewerController", function() {
    let container;
    let application;

    beforeEach(() => {
        const dataView = dataToJsonAttribute(data);
        container = mountDOM(`
            <div id="bpmn-viewer"
                 data-testid="viewer"
                 data-event-prefix="bpmn-viewer"
                 data-controller="check scopeli--ux-bpmn--viewer" 
                 data-view="${dataView}" >
            </div>
        `);
    });

    afterEach(() => {
        clearDOM();
        application.stop();
    });

    it('connect', async () => {
        expect(getByTestId(container, 'viewer')).not.toHaveClass('pre-connected');
        expect(getByTestId(container, 'viewer')).not.toHaveClass('connected');

        application = startStimulus('scopeli--ux-bpmn--viewer', ViewerController);

        setTimeout(function() {
            expect(getByTestId(container, 'viewer')).toHaveClass('pre-connected');
            expect(getByTestId(container, 'viewer')).toHaveClass('connected');
        }, 1000);
    });
})

const data = {
    type: "default",
    xml: bpmnDefinition,
    config: {
        flow: [
            "StartEvent_0765uhp",
            "Flow_0gljsub",
            "Activity_170vqw5",
            "Flow_1xnke4o",
            "Gateway_1tz1mjp",
            "Flow_1a4ve2i",
            "Activity_0sm72v7",
            "Flow_1nv3ae8",
            "Gateway_14vkk10",
            "Flow_14i83lm",
            "Activity_1o1p5cj"
        ],
        flow_class: "highlight-flow",
        current: [
            "Activity_1o1p5cj"
        ],
        current_class: "highlight-current",
    }
};