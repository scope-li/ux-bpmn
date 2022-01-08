# UX BPMN
[![Total Downloads](http://poser.pugx.org/scopeli/ux-bpmn/downloads)](https://packagist.org/packages/scopeli/ux-bpmn)
[![Daily Downloads](http://poser.pugx.org/scopeli/ux-bpmn/d/daily)](https://packagist.org/packages/scopeli/ux-bpmn)
[![UX BPMN](https://github.com/scope-li/ux-bpmn/actions/workflows/ci.yaml/badge.svg)](https://github.com/scope-li/ux-bpmn/actions/workflows/ci.yaml)

UX BPMN is a Symfony bundle that integrating the [bpmn.io](https://bpmn.io/) library in Symfony applications. 
It provides a viewer and modeler.

You can checkout the [demo](https://github.com/scope-li/ux-bpmn-demo) for testing.

## Installation

UX BPMN requires PHP 7.4.5+ and Symfony 4.4+.

Install this bundle using Composer and Symfony Flex:

```sh
composer require scopeli/ux-bpmn

# Don't forget to install the JavaScript dependencies as well and compile
yarn install --force
yarn encore dev
```

## Usage

To use UX BPMN viewer and builder, create the following in PHP:

```php
// ...
use Scopeli\UxBpmn\Model\Modeler;
use Scopeli\UxBpmn\Model\Viewer;

class BpmnController extends AbstractController
{
    const BPMN_FILE = 'example.bpmn';
    
    /**
     * @Route("/show", name="bpmn_show", methods={"GET"}) 
     */
    public function show(): Response
    {    
        return $this->render('bpmn/show.html.twig', [
            'viewer' => new Viewer(Viewer::TYPE_DEFAULT, file_get_contents(self::BPMN_FILE)),
        ]);
    }
    
    /**
     * @Route("/edit", name="bpmn_edit", methods={"GET"}) 
     */
    public function edit(): Response
    {
        $modeler = new Modeler(Modeler::TYPE_DEFAULT, file_get_contents(self::BPMN_FILE));
        $modeler->setConfig([
            'saveUrl' => $this->generateUrl('bpmn_save'),
        ]);
    
        return $this->render('bpmn/edit.html.twig', [
            'modeler' => $modeler,
        ]);
    }
    
    /**
     * @Route("/save", name="bpmn_save", methods={"POST"}) 
     */
    public function save(Request $request): Response
    {
        $data = json_decode($request->getContent());
        
        file_put_contents(self::BPMN_FILE, $data->xml);
        
        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
```

After that, you can display the viewer and modeler in Twig
(requires [Symfony Webpack Encore](https://symfony.com/doc/current/frontend/encore/installation.html)):

```twig
{# bpmn/show.html.twig #}
{{ render_bpmn_viewer(viewer) }}
```

```twig
{# bpmn/edit.html.twig #}
{{ render_bpmn_modeler(modeler) }}
```
