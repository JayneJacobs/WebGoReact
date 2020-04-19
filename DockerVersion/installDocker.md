:::: INSTALL DOCKER UBUNTU ::::
	https://docs.docker.com/
	-https://docs.docker.com/install/linux/docker-ce/ubuntu/
	
	
	//
	apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
	
	//may need to google this ,, install docker on ubuntu 19.10....
	sudo add-apt-repository \
	   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
	   disco \
	   stable"
	#DOCKER MACHINE.... worked,,, from docs
	#https://docs.docker.com/v17.09/machine/install-machine/
	 	
	#DOCKER COMPOSE,,, 
	https://github.com/docker/compose/releases, worked...
	curl -L https://github.com/docker/compose/releases/download/1.25.1-rc1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
	
	chmod +x /usr/local/bin/docker-compose
	
	docker-compose --version
	
	docker images
	docker image ls
	
	docker container top
	docker container inspect
	docker container stats
	
	docker container ls -a
	docker container rm ### ### ###  						<-- ### represents the first 3 characters founter in first column container, this would remove 3 containers		
	docker container inspect ubutnu							<-- JSON OUTPUT ABOUT HOW DOCKER CONTAINER WAS STARTED
	docker container stats mysql 							<-- LIVE RUNNING INFO ABOUT PROCESS
	docker container logs somename 							<-- name you gave it or it has