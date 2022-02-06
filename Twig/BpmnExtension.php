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

use Scopeli\UxBpmn\Model\Modeler;
use Scopeli\UxBpmn\Model\Viewer;
use Symfony\WebpackEncoreBundle\Twig\StimulusTwigExtension;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BpmnExtension extends AbstractExtension
{
    private StimulusTwigExtension $stimulus;

    public function __construct(StimulusTwigExtension $stimulusTwigExtension)
    {
        $this->stimulus = $stimulusTwigExtension;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction(
                'render_bpmn_viewer',
                [$this, 'renderBpmnViewer'],
                ['needs_environment' => true, 'is_safe' => ['html']]
            ),
            new TwigFunction(
                'render_bpmn_modeler',
                [$this, 'renderBpmnModeler'],
                ['needs_environment' => true, 'is_safe' => ['html']]
            ),
        ];
    }

    public function renderBpmnViewer(Environment $env, Viewer $viewer, array $attributes = []): string
    {
        $viewer->setAttributes($attributes);

        $controllers = [];
        if ($viewer->getDataController()) {
            $controllers[$viewer->getDataController()] = [];
        }
        $controllers['@scopeli/ux-bpmn/viewer'] = ['view' => $viewer->createView()];

        $html = sprintf(
            '<div id="bpmn-viewer" %s %s>',
            $this->stimulus->renderStimulusController($env, $controllers),
            $this->getAttributs($viewer->getAttributes())
        );

        return trim($html);
    }

    public function renderBpmnModeler(Environment $env, Modeler $modeler, array $attributes = []): string
    {
        $modeler->setAttributes($attributes);

        $controllers = [];
        if ($modeler->getDataController()) {
            $controllers[$modeler->getDataController()] = [];
        }
        $controllers['@scopeli/ux-bpmn/modeler'] = ['view' => $modeler->createView()];

        $html = sprintf(
            '<div id="bpmn-modeler" %s %s>'.
            '%s<div id="bpmn-show-xml" style="display: none;"></div>'.
            '<div id="bpmn-body"><div id="bpmn-container"></div><div id="bpmn-properties-panel"></div></div>'.
            '</div>',
            $this->stimulus->renderStimulusController($env, $controllers),
            $this->getAttributs($modeler->getAttributes()),
            $this->getMenu($modeler)
        );

        return trim($html);
    }

    private function getMenu(Modeler $modeler): string
    {
        $config = $modeler->getConfig();
        $html = '';

        if (isset($config['menu']) && \is_array($config['menu'])) {
            foreach ($config['menu'] as $key => $menu) {
                if (\in_array($key, ['saveBpmn', 'downloadBpmn', 'downloadSvg', 'showXml'])) {
                    if ('saveBpmn' === $key && null === $config['saveUrl']) {
                        continue;
                    }

                    $html .= sprintf(
                        '<button data-action="%s" title="%s"><i class="%s"></i></button>',
                        $this->getActionName($modeler, $key),
                        $menu['title'],
                        $menu['icon'],
                    );
                }
            }
        }

        return empty($html) ? '' : sprintf('<div id="bpmn-menu">%s</div>', $html);
    }

    private function getActionName(Modeler $modeler, string $action): string
    {
        return sprintf('%s#%s', $modeler->getDataController() ?? 'scopeli--ux-bpmn--modeler', $action);
    }

    private function getAttributs(array $attributs): string
    {
        $buffer = '';

        foreach ($attributs as $name => $value) {
            if ('data-controller' === $name) {
                continue;
            }

            $buffer .= sprintf('%s="%s" ', $name, $value);
        }

        return $buffer;
    }
}
