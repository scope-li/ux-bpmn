<?php

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Scopeli\UxBpmn\Tests\DependencyInjection;

use PHPUnit\Framework\TestCase;
use Scopeli\UxBpmn\Twig\BpmnExtension;
use Scopeli\UxBpmn\UxBpmnBundle;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\HttpKernel\Kernel;

class UxBpmnExtensionTest extends TestCase
{
    public function testServiceWiring(): void
    {
        $kernel = new UxBpmnTestingKernel('test', true);
        $kernel->boot();

        $container = $kernel->getContainer();

        $extension = $container->get('bpmn.twig_extension');
        $this->assertInstanceOf(BpmnExtension::class, $extension);
    }
}

class UxBpmnTestingKernel extends Kernel
{
    public function registerBundles(): iterable
    {
        return [
            new UxBpmnBundle(),
        ];
    }

    public function registerContainerConfiguration(LoaderInterface $loader): void
    {
    }
}