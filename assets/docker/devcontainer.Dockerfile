FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu as base
LABEL org.opencontainers.image.maintainer="AsP3X [corespace]"

RUN apt update && apt upgrade -y
RUN apt install -y curl wget git nano unzip zip tar gzip bzip2 xz-utils


FROM base as dockerbase

# Install Docker CE CLI
RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends apt-transport-https ca-certificates curl gnupg-agent software-properties-common \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/debian \
       $(lsb_release -cs) \
       stable" \
    && apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends docker-ce-cli

# Install Docker Compose
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3-pip \
    && pip3 install docker-compose


# FROM dockerbase as devcontainer

# # Install additional packages
# RUN apt install -y --no-install-recommends \
#     openssh-client \
#     less \
#     iproute2 \
#     procps \
#     lsb-release \
#     && apt-get autoremove -y \
#     && apt-get clean -y \
#     && rm -rf /var/lib/apt/lists/*

# # Install nodejs and npm
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
#     && apt-get install -y nodejs

# # Install yarn
# RUN npm install -g yarn