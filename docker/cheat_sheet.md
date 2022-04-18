# Getting Started

## Create a repo: docker-project
docker-project

 |_ Dockerfile
 
 |_ entrypoint.sh

## Create a basic dockerfile that will install curl, unzip, python3, and the AWS cli

Select a source image. In this case, I used the `latest` version of `ubuntu`. Install any packages you need to run your app. Add the entrypoint script.

```
FROM ubuntu:latest
RUN apk update && apk add --update \
        curl \
        unzip \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install \
        awscli \
    && rm -rf /var/cache/apk/*

ADD ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
```

## Write your entrypoint script

The entry point script specifies what executable to run when the container starts. 

```
#!/bin/sh
# Make sure the above line matches the entrypoint call in your Dockerfile
# Example: download config from s3

aws s3 cp /client/config s3://mybucket
```

## Create your Docker image

### Build

`docker build <image_name>:latest -f Dockerfile .`

### Tag (if you’re storing images in a repo such as ECR)

`docker tag image_name:latest <aws_acct_id>.dkr.ecr.<region>.amazonaws.com/<image_name>:latest`

### Push (if you’re storing images in a repo such as ECR)
`docker push <aws_acct_id>.dkr.ecr.<region>.amazonaws.com/<image_name>:latest`

## Run your Docker image locally

Start a container based on <imagename> and run an interactive terminal
  
`docker run -it <imagename>:latest`
  
`docker run -it <image_name>:latest /bin/bash`
  
## Debugging Container Failures

Get all container names and process ids 
  
`docker ps -a`

Get logs for a specific container
  
`docker logs <container_id>`

## Creating a Task
  
ECS: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-task-definition.html







