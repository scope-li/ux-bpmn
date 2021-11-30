<?php

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        '@Symfony:risky' => true,
    ])
    ->setRiskyAllowed(true)
    ->setFinder(
        (new PhpCsFixer\Finder())
            ->in(__DIR__.'/DependencyInjection')
            ->in(__DIR__.'/Model')
            ->in(__DIR__.'/Twig')
    )
    ->setCacheFile('.php-cs-fixer.cache')
    ;