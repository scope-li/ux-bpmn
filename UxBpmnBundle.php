<?php

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Scopeli\UxBpmn;

use Scopeli\UxBpmn\DependencyInjection\UxBpmnExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class UxBpmnBundle extends Bundle
{
    public function getContainerExtension(): UxBpmnExtension
    {
        return new UxBpmnExtension();
    }
}