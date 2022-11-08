FROM alpine:latest
LABEL org.opencontainers.image.maintainer="AsP3X"
LABEL org.opencontainers.image.name="healthcheck"

RUN apk update && apk upgrade
RUN apk add --no-cache bash curl nano wget

SHELL ["/bin/bash", "-c"]