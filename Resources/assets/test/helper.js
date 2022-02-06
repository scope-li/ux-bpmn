/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import {Application, Controller} from "@hotwired/stimulus";

export class CheckController extends Controller {
    connect() {
        const eventPrefix = this.element.getAttribute('data-event-prefix');

        this.element.addEventListener(`${eventPrefix}:pre-connect`, () => {
            this.element.classList.add('pre-connected');
        });

        this.element.addEventListener(`${eventPrefix}:connect`, () => {
            this.element.classList.add('connected');
        });
    }
}

export const startStimulus = (identifier, controller) => {
    const application = Application.start();
    application.register('check', CheckController);
    application.register(identifier, controller);

    return application;
};

export const dataToJsonAttribute = (data) => {
    const container = document.createElement('div');
    container.dataset.foo = JSON.stringify(data);

    return container.outerHTML.match(/data-foo="(.+)"/)[1];
}

export const bpmnDefinition = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0agsz5m" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="8.8.3">
  <bpmn:collaboration id="Collaboration_092k7zz">
    <bpmn:participant id="Participant_1nrax4f" name="Merge Request" processRef="Process_1pkw44v" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1pkw44v" isExecutable="false">
    <bpmn:laneSet id="LaneSet_0otnu6r">
      <bpmn:lane id="Lane_0dzkajd" name="Coder">
        <bpmn:flowNodeRef>StartEvent_0765uhp</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1tz1mjp</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_170vqw5</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1o1p5cj</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_06sw330" name="Reviewer">
        <bpmn:flowNodeRef>Gateway_14vkk10</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_03vpczy</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0sm72v7</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1gzleqp</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:sequenceFlow id="Flow_1a4ve2i" sourceRef="Gateway_1tz1mjp" targetRef="Activity_0sm72v7" />
    <bpmn:sequenceFlow id="Flow_14i83lm" sourceRef="Gateway_14vkk10" targetRef="Activity_1o1p5cj" />
    <bpmn:startEvent id="StartEvent_0765uhp">
      <bpmn:outgoing>Flow_0gljsub</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="Gateway_1tz1mjp">
      <bpmn:incoming>Flow_1xnke4o</bpmn:incoming>
      <bpmn:incoming>Flow_1h1l6r9</bpmn:incoming>
      <bpmn:outgoing>Flow_1a4ve2i</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0gljsub" sourceRef="StartEvent_0765uhp" targetRef="Activity_170vqw5" />
    <bpmn:sequenceFlow id="Flow_1xnke4o" sourceRef="Activity_170vqw5" targetRef="Gateway_1tz1mjp" />
    <bpmn:sequenceFlow id="Flow_1h1l6r9" sourceRef="Activity_1o1p5cj" targetRef="Gateway_1tz1mjp" />
    <bpmn:exclusiveGateway id="Gateway_14vkk10" name="Approved?">
      <bpmn:incoming>Flow_1nv3ae8</bpmn:incoming>
      <bpmn:outgoing>Flow_14i83lm</bpmn:outgoing>
      <bpmn:outgoing>Flow_12w3w1o</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:endEvent id="Event_03vpczy">
      <bpmn:incoming>Flow_08fl54q</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1nv3ae8" sourceRef="Activity_0sm72v7" targetRef="Gateway_14vkk10" />
    <bpmn:sequenceFlow id="Flow_12w3w1o" sourceRef="Gateway_14vkk10" targetRef="Activity_1gzleqp" />
    <bpmn:sequenceFlow id="Flow_08fl54q" sourceRef="Activity_1gzleqp" targetRef="Event_03vpczy" />
    <bpmn:userTask id="Activity_170vqw5" name="Create MR">
      <bpmn:incoming>Flow_0gljsub</bpmn:incoming>
      <bpmn:outgoing>Flow_1xnke4o</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0sm72v7" name="Review MR">
      <bpmn:incoming>Flow_1a4ve2i</bpmn:incoming>
      <bpmn:outgoing>Flow_1nv3ae8</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="Activity_1gzleqp" name="Merge">
      <bpmn:incoming>Flow_12w3w1o</bpmn:incoming>
      <bpmn:outgoing>Flow_08fl54q</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="Activity_1o1p5cj" name="Fix MR">
      <bpmn:incoming>Flow_14i83lm</bpmn:incoming>
      <bpmn:outgoing>Flow_1h1l6r9</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_092k7zz">
      <bpmndi:BPMNShape id="Participant_1nrax4f_di" bpmnElement="Participant_1nrax4f" isHorizontal="true">
        <dc:Bounds x="106" y="110" width="814" height="390" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0dzkajd_di" bpmnElement="Lane_0dzkajd" isHorizontal="true">
        <dc:Bounds x="136" y="110" width="784" height="191" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_06sw330_di" bpmnElement="Lane_06sw330" isHorizontal="true">
        <dc:Bounds x="136" y="301" width="784" height="199" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1a4ve2i_di" bpmnElement="Flow_1a4ve2i">
        <di:waypoint x="460" y="235" />
        <di:waypoint x="460" y="360" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_14i83lm_di" bpmnElement="Flow_14i83lm">
        <di:waypoint x="590" y="375" />
        <di:waypoint x="590" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0gljsub_di" bpmnElement="Flow_0gljsub">
        <di:waypoint x="228" y="210" />
        <di:waypoint x="280" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xnke4o_di" bpmnElement="Flow_1xnke4o">
        <di:waypoint x="380" y="210" />
        <di:waypoint x="435" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1h1l6r9_di" bpmnElement="Flow_1h1l6r9">
        <di:waypoint x="540" y="210" />
        <di:waypoint x="485" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1nv3ae8_di" bpmnElement="Flow_1nv3ae8">
        <di:waypoint x="510" y="400" />
        <di:waypoint x="565" y="400" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12w3w1o_di" bpmnElement="Flow_12w3w1o">
        <di:waypoint x="615" y="400" />
        <di:waypoint x="670" y="400" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_08fl54q_di" bpmnElement="Flow_08fl54q">
        <di:waypoint x="770" y="400" />
        <di:waypoint x="832" y="400" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0765uhp">
        <dc:Bounds x="192" y="192" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1tz1mjp_di" bpmnElement="Gateway_1tz1mjp" isMarkerVisible="true">
        <dc:Bounds x="435" y="185" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_14vkk10_di" bpmnElement="Gateway_14vkk10" isMarkerVisible="true">
        <dc:Bounds x="565" y="375" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="563" y="432" width="54" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_03vpczy_di" bpmnElement="Event_03vpczy">
        <dc:Bounds x="832" y="382" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0d7for5_di" bpmnElement="Activity_170vqw5">
        <dc:Bounds x="280" y="170" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0g7r1ke_di" bpmnElement="Activity_0sm72v7">
        <dc:Bounds x="410" y="360" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_07x141v_di" bpmnElement="Activity_1gzleqp">
        <dc:Bounds x="670" y="360" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_027sts4_di" bpmnElement="Activity_1o1p5cj">
        <dc:Bounds x="540" y="170" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;