#!/bin/bash

set +e

#
# Text Formatting
#

reset=$(tput sgr0)

bold=$(tput bold)
underline=$(tput sgr 0 1)

red=$(tput setaf 1)
green=$(tput setaf 76)
blue=$(tput setaf 25)

#
# Logging
#

info () {
  printf "${green}%s${reset}\n" "$@"
}

success () {
  printf "${green}${bold}Success: %s${reset}\n" "$@"
}

error () {
  printf "${red}${bold}Error: %s${reset}\n" "$@"
}

warn () {
  printf "${red}${bold}Warning: %s${reset}\n" "$@"
}

note () {
  printf "\n${underline}${bold}${blue}Note:${reset} ${blue}%s${reset}\n" "$@"
}

#
# Helper Functions
#

command_exists () {
  command -v "$@" > /dev/null 2>&1
}

#
# Functions
#

is_root () {
  info "Checking if running as root..."

  if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root (i.e. \"sudo $0\")"
    exit 1
  else
    success "Running as root"
  fi
}

install_docker_online () {
  info "Checking docker command..."

  if command_exists docker; then
    success "Docker has already been installed"
  else
    info "Uninstalling older versions of docker..."
    apt-get remove docker docker-engine docker.io containerd runc

    info "Installing docker..."
    apt-get update
    apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    apt-key fingerprint 0EBFCD88
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
    apt-get update
    apt-get install docker-ce docker-ce-cli containerd.io

    if command_exists docker; then
      success "Docker has been installed"
    else
      error "Docker installation failed"
      exit 1
    fi
  fi
}

install_docker_compose_online () {
  info "Checking docker-compose command..."

  if command_exists docker-compose; then
    success "Docker-compose has already been installed"
  else
    info "Installing docker-compose..."
    curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose

    if command_exists docker-compose; then
      success "Docker-compose has been installed"
    else
      error "Docker-compose installation failed"
      exit 1
    fi
  fi
}

main () {
  is_root
  install_docker_online
  install_docker_compose_online
}

main "$@"
