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

abstract class AbstractModel
{
    protected string $type;
    protected string $xml;
    protected array $config = [];
    protected array $attributes = [];

    public function createView(): array
    {
        return [
            'type' => $this->type,
            'xml' => $this->xml,
            'config' => $this->config,
        ];
    }

    public function getDataController(): ?string
    {
        return $this->attributes['data-controller'] ?? null;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getXml(): string
    {
        return $this->xml;
    }

    public function getConfig(): array
    {
        return $this->config;
    }

    public function setConfig(array $config): void
    {
        $this->config = array_merge($this->config, $config);
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function setAttributes(array $attributes): void
    {
        $this->attributes = array_merge($this->attributes, $attributes);
    }
}
