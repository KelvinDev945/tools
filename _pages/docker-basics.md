---
layout: page
title: Docker Basics for Beginners
description: Learn the fundamentals of Docker containerization and how to use it in your development workflow
tags: [tutorial, docker, devops, containers]
---

## What is Docker?

Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, standalone packages that include everything needed to run an application: code, runtime, system tools, libraries, and settings.

## Why Use Docker?

### Benefits

- **Consistency**: "It works on my machine" becomes a thing of the past
- **Isolation**: Applications run in isolated environments
- **Portability**: Run anywhere - development, testing, production
- **Efficiency**: Lightweight compared to virtual machines
- **Scalability**: Easy to scale up or down

## Core Concepts

### Images
A Docker image is a read-only template with instructions for creating a container. Think of it as a snapshot or blueprint.

### Containers
A container is a runnable instance of an image. You can create, start, stop, move, or delete containers.

### Dockerfile
A text file containing instructions to build a Docker image.

### Docker Hub
A registry service for sharing Docker images.

## Getting Started

### Installation

Visit [docker.com](https://www.docker.com/) and download Docker Desktop for your operating system.

### Verify Installation

```bash
docker --version
docker run hello-world
```

## Basic Commands

### Working with Images

```bash
# List images
docker images

# Pull an image from Docker Hub
docker pull ubuntu:latest

# Build an image from Dockerfile
docker build -t my-app:1.0 .

# Remove an image
docker rmi image-name
```

### Working with Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Run a container
docker run -it ubuntu bash

# Run container in detached mode
docker run -d -p 8080:80 nginx

# Stop a container
docker stop container-id

# Start a stopped container
docker start container-id

# Remove a container
docker rm container-id
```

## Creating Your First Dockerfile

```dockerfile
# Use official Python runtime as base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Define environment variable
ENV NAME=World

# Run application
CMD ["python", "app.py"]
```

### Building and Running

```bash
# Build the image
docker build -t my-python-app .

# Run the container
docker run -p 5000:5000 my-python-app
```

## Docker Compose

Docker Compose is a tool for defining and running multi-container applications.

### Example docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/app
    environment:
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### Running with Compose

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs
```

## Best Practices

1. **Use Official Images**: Start with official base images from trusted sources
2. **Minimize Layers**: Combine RUN commands to reduce image size
3. **Use .dockerignore**: Exclude unnecessary files from the build context
4. **Don't Run as Root**: Create and use non-root users in containers
5. **Use Multi-Stage Builds**: Keep final images small
6. **Tag Images Properly**: Use semantic versioning
7. **Keep Secrets Secret**: Don't hardcode sensitive data in Dockerfiles

## Common Use Cases

- **Development Environments**: Consistent environment across team
- **Microservices**: Run multiple services independently
- **CI/CD Pipelines**: Automated testing and deployment
- **Legacy Applications**: Containerize old applications
- **Database Testing**: Spin up temporary databases

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs container-id

# Inspect container
docker inspect container-id
```

### Clean Up Resources

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything unused
docker system prune -a
```

## Next Steps

- Learn about Docker networking
- Explore Docker volumes for persistent data
- Study container orchestration with Kubernetes
- Implement CI/CD with Docker
- Optimize Docker images for production

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Play with Docker](https://labs.play-with-docker.com/)
- [Docker Curriculum](https://docker-curriculum.com/)
