<?php

return (new PhpCsFixer\Config())
    ->setRules([
        '@PSR2' => true,
        '@Symfony' => true,
        '@Symfony:risky' => true,
        'phpdoc_to_comment' => false,
        'yoda_style' => false,
        'no_unused_imports' => true,
    ])
    ->setRiskyAllowed(true)
    ->setFinder(
        (new PhpCsFixer\Finder())
            ->in(__DIR__.'/DependencyInjection')
            ->in(__DIR__.'/Model')
            ->in(__DIR__.'/Twig')
    )
    ->setCacheFile('.php-cs-fixer.cache');