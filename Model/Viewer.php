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

class Viewer extends AbstractModel
{
    public const TYPE_DEFAULT = 'default';
    public const TYPE_NAVIGATED = 'navigated';

    protected array $config = [
        'flow' => [],
        'flow_class' => 'highlight-flow',
        'current' => [],
        'current_class' => 'highlight-current',
    ];

    public function __construct(string $type, string $xml)
    {
        $this->type = $type;
        $this->xml = $xml;
    }
}