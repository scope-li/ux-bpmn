<?php

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Scopeli\UxBpmn\Model;

class Modeler extends AbstractModel
{
    public const TYPE_DEFAULT = 'default';
    public const TYPE_CAMUNDA = 'camunda';

    protected array $config = [
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
    ];

    public function __construct(string $type, string $xml)
    {
        $this->type = $type;
        $this->xml = $xml;
    }
}
