<?php

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Scopeli\UxBpmn\Tests\Twig;

use Scopeli\UxBpmn\Model\Modeler;
use Scopeli\UxBpmn\Model\Viewer;
use Scopeli\UxBpmn\Twig\BpmnExtension;
use PHPUnit\Framework\TestCase;
use Twig\Environment;
use Twig\Loader\ArrayLoader;

class BpmnExtensionTest extends TestCase
{
    private BpmnExtension $bpmnExtension;
    private Environment $environment;

    protected function setUp(): void
    {
        parent::setUp();

        $this->bpmnExtension = new BpmnExtension();
        $this->environment = new Environment(new ArrayLoader());
    }

    public function testGetFunctions(): void
    {
        $this->assertCount(2, $this->bpmnExtension->getFunctions());
    }

    public function testRenderBpmnViewer(): void
    {
        $viewer = new Viewer(Viewer::TYPE_DEFAULT, '<xml>');
        $viewer->setAttributes([
            'data-controller' => 'custom-controller',
            'class' => 'some-class',
        ]);

        $result = $this->bpmnExtension->renderBpmnViewer($this->environment, $viewer);
        $expected = '<div id="bpmn-viewer" data-controller="custom-controller" data-view="&#x7B;&quot;type&quot;'.
            '&#x3A;&quot;default&quot;,&quot;xml&quot;&#x3A;&quot;&lt;xml&gt;&quot;,&quot;config&quot;&#x3A;&#x7B;'.
            '&quot;flow&quot;&#x3A;&#x5B;&#x5D;,&quot;flow_class&quot;&#x3A;&quot;highlight-flow&quot;,&quot;current'.
            '&quot;&#x3A;&#x5B;&#x5D;,&quot;current_class&quot;&#x3A;&quot;highlight-current&quot;&#x7D;&#x7D;" '.
            'class="some-class" ></div>';

        $this->assertSame($expected, $result);
    }

    public function testRenderBpmnModeler(): void
    {
        $modeler = new Modeler(Modeler::TYPE_DEFAULT, '<xml>');

        $result = $this->bpmnExtension->renderBpmnModeler($this->environment, $modeler);
        $expected = '<div id="bpmn-modeler" data-controller="scopeli--ux-bpmn--modeler" '.
            'data-view="&#x7B;&quot;type&quot;&#x3A;&quot;default&quot;,&quot;xml&quot;&#x3A;'.
            '&quot;&lt;xml&gt;&quot;,&quot;config&quot;&#x3A;&#x7B;&quot;saveUrl&quot;&#x3A;'.
            'null,&quot;menu&quot;&#x3A;&#x7B;&quot;saveBpmn&quot;&#x3A;&#x7B;&quot;title&quot;'.
            '&#x3A;&quot;Save&quot;,&quot;icon&quot;&#x3A;&quot;fas&#x20;fa-save&quot;&#x7D;,'.
            '&quot;downloadBpmn&quot;&#x3A;&#x7B;&quot;title&quot;&#x3A;&quot;Download&#x20;BPMN'.
            '&quot;,&quot;icon&quot;&#x3A;&quot;fas&#x20;fa-download&quot;&#x7D;,&quot;downloadSvg'.
            '&quot;&#x3A;&#x7B;&quot;title&quot;&#x3A;&quot;Download&#x20;SVG&quot;,&quot;icon&quot;'.
            '&#x3A;&quot;fas&#x20;fa-image&quot;&#x7D;,&quot;showXml&quot;&#x3A;&#x7B;&quot;title'.
            '&quot;&#x3A;&quot;XML&quot;,&quot;icon&quot;&#x3A;&quot;fas&#x20;fa-code&quot;&#x7D;'.
            '&#x7D;&#x7D;&#x7D;" ><div id="bpmn-menu"><button data-action="scopeli--ux-bpmn--modeler#downloadBpmn"'.
            ' title="Download BPMN"><i class="fas fa-download"></i></button><button '.
            'data-action="scopeli--ux-bpmn--modeler#downloadSvg" title="Download SVG"><i class="fas fa-image">'.
            '</i></button><button data-action="scopeli--ux-bpmn--modeler#showXml" title="XML"><i class="fas fa-code">'.
            '</i></button></div><div id="bpmn-show-xml" style="display: none;"></div><div id="bpmn-body">'.
            '<div id="bpmn-container"></div><div id="bpmn-properties-panel"></div></div></div>';

        $this->assertSame($expected, $result);
    }
}
