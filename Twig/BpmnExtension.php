<?php

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Scopeli\UxBpmn\Twig;

use Scopeli\UxBpmn\Model\Viewer;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BpmnExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('render_viewer', [$this, 'renderViewer'], ['needs_environment' => true, 'is_safe' => ['html']]),
            new TwigFunction('render_modeler', [$this, 'renderModeler'], ['needs_environment' => true, 'is_safe' => ['html']]),
        ];
    }

    public function renderViewer(Environment $env, Viewer $viewer, array $attributes = []): string
    {
        return '';
    }

    public function renderModeler(Environment $env, Viewer $viewer, array $attributes = []): string
    {
        return '';
    }
}