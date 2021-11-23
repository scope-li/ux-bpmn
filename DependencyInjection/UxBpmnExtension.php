<?php

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Scopeli\UxBpmn\DependencyInjection;

use Scopeli\UxBpmn\Twig\BpmnExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Twig\Environment;

class UxBpmnExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        if (class_exists(Environment::class)) {
            $container
                ->setDefinition('bpmn.twig_extension', new Definition(BpmnExtension::class))
                ->addTag('twig.extension')
                ->setPublic(false)
            ;
        }
    }
}