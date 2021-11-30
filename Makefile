IMAGE_NAME=jakzal/phpqa:php7.4-alpine
CONTAINER_NAME=ux-bpmn

run:
	docker run --rm --entrypoint "/bin/sh" -it -v $(PWD)/:/project --workdir=/project --name=$(CONTAINER_NAME) $(IMAGE_NAME)

