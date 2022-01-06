<?php

namespace Model;

use PHPUnit\Framework\TestCase;
use Scopeli\UxBpmn\Model\Modeler;

class ModelerTest extends TestCase
{
    private Modeler $modeler;

    protected function setUp(): void
    {
        parent::setUp();

        $this->modeler = new Modeler(Modeler::TYPE_DEFAULT, '<?xml version="1.0" encoding="UTF-8"?>');
    }

    public function testGetType(): void
    {
        $this->assertSame(Modeler::TYPE_DEFAULT, $this->modeler->getType());
    }

    public function testGetXml(): void
    {
        $this->assertSame('<?xml version="1.0" encoding="UTF-8"?>', $this->modeler->getXml());
    }

    public function testGetConfig(): void
    {
        $this->assertSame([
            'saveUrl' => null,
            'menu' => [
                'saveBpmn' => [
                    'title' => 'Save',
                    'icon' => 'fas fa-save',
                ],
                'downloadBpmn' => [
                    'title' => 'Download BPMN',
                    'icon' => 'fas fa-download',
                ],
                'downloadSvg' => [
                    'title' => 'Download SVG',
                    'icon' => 'fas fa-image',
                ],
                'showXml' => [
                    'title' => 'XML',
                    'icon' => 'fas fa-code',
                ],
            ],
        ], $this->modeler->getConfig());
    }

    public function testGetAttributes(): void
    {
        $this->assertSame([], $this->modeler->getAttributes());
    }

    public function testGetDataController(): void
    {
        $this->assertNull($this->modeler->getDataController());
    }

    public function testSetConfig(): void
    {
        $this->modeler->setConfig([
            'saveUrl' => '/persist',
            'menu' => [
                'saveBpmn' => [
                    'title' => 'Persist',
                    'icon' => 'fas fa-persist',
                ],
            ],
        ]);

        $this->assertSame([
            'saveUrl' => '/persist',
            'menu' => [
                'saveBpmn' => [
                    'title' => 'Persist',
                    'icon' => 'fas fa-persist',
                ],
            ],
        ], $this->modeler->getConfig());
    }

    public function testSetAttributes(): void
    {
        $this->modeler->setAttributes([
            'data-controller' => 'scopeli--ux-bpmn--modeler2',
            'class' => 'some-class',
        ]);

        $this->assertSame([
            'data-controller' => 'scopeli--ux-bpmn--modeler2',
            'class' => 'some-class',
        ], $this->modeler->getAttributes());
        $this->assertSame('scopeli--ux-bpmn--modeler2', $this->modeler->getDataController());
    }

    public function testCreateView(): void
    {
        $this->assertSame([
            'type' => Modeler::TYPE_DEFAULT,
            'xml' => '<?xml version="1.0" encoding="UTF-8"?>',
            'config' => [
                'saveUrl' => null,
                'menu' => [
                    'saveBpmn' => [
                        'title' => 'Save',
                        'icon' => 'fas fa-save',
                    ],
                    'downloadBpmn' => [
                        'title' => 'Download BPMN',
                        'icon' => 'fas fa-download',
                    ],
                    'downloadSvg' => [
                        'title' => 'Download SVG',
                        'icon' => 'fas fa-image',
                    ],
                    'showXml' => [
                        'title' => 'XML',
                        'icon' => 'fas fa-code',
                    ],
                ],
            ],
        ], $this->modeler->createView());
    }
}