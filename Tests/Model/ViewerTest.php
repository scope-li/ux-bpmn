<?php

namespace Model;

use PHPUnit\Framework\TestCase;
use Scopeli\UxBpmn\Model\Viewer;

class ViewerTest extends TestCase
{
    private Viewer $viewer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->viewer = new Viewer(Viewer::TYPE_DEFAULT, '<?xml version="1.0" encoding="UTF-8"?>');
    }

    public function testGetType(): void
    {
        $this->assertSame(Viewer::TYPE_DEFAULT, $this->viewer->getType());
    }

    public function testGetXml(): void
    {
        $this->assertSame('<?xml version="1.0" encoding="UTF-8"?>', $this->viewer->getXml());
    }

    public function testGetConfig(): void
    {
        $this->assertSame([
            'flow' => [],
            'flow_class' => 'highlight-flow',
            'current' => [],
            'current_class' => 'highlight-current',
        ], $this->viewer->getConfig());
    }

    public function testGetAttributes(): void
    {
        $this->assertSame([], $this->viewer->getAttributes());
    }

    public function testGetDataController(): void
    {
        $this->assertNull($this->viewer->getDataController());
    }

    public function testSetConfig(): void
    {
        $this->viewer->setConfig([
            'flow' => [
                'StartEvent',
                'SequenceFlow',
            ],
            'current' => [
                'UserTask',
            ],
        ]);

        $this->assertSame([
            'flow' => [
                'StartEvent',
                'SequenceFlow',
            ],
            'flow_class' => 'highlight-flow',
            'current' => [
                'UserTask',
            ],
            'current_class' => 'highlight-current',
        ], $this->viewer->getConfig());
    }

    public function testSetAttributes(): void
    {
        $this->viewer->setAttributes([
            'data-controller' => 'scopeli--ux-bpmn--viewer2',
            'class' => 'some-class',
        ]);

        $this->assertSame([
            'data-controller' => 'scopeli--ux-bpmn--viewer2',
            'class' => 'some-class',
        ], $this->viewer->getAttributes());
        $this->assertSame('scopeli--ux-bpmn--viewer2', $this->viewer->getDataController());
    }

    public function testCreateView(): void
    {
        $this->assertSame([
            'type' => Viewer::TYPE_DEFAULT,
            'xml' => '<?xml version="1.0" encoding="UTF-8"?>',
            'config' => [
                'flow' => [],
                'flow_class' => 'highlight-flow',
                'current' => [],
                'current_class' => 'highlight-current',
            ],
        ], $this->viewer->createView());
    }
}