## Nest.js - jwt-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

### jwt-api 구성

| 위치                        | 설명                           |
|---------------------------|------------------------------|
| jwt-api                | 프로젝트 최상단                     |
| jwt-api > dockerfile   | 이미지 생성 정보 관리                 |
| jwt-api > docker-compose.yml | 구성 관리, 의존성 관리(실행 순서), 명령어 간소화 |
| jwt-api > secret       | 시크릿 파일 관리                    |
| jwt-api > src > config | 환경별 설정 파일                    |

### docker 실행
~~~
[ 1번 방식 - dockerfile (** RDB 사용시에만 아래 명령어로 진행 **) ]

# jwt-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/jwt-api

# 도커 이미지 빌드 (local)
$ docker build -t jwt-api -f ./dockerfile/Dockerfile-local .

# 도커 컨테이너 실행
$ docker run -d --name jwt-api -p 3004:8004 jwt-api

----------------------------------------------------------------
** 문제 발생 시 확인 (docker gui tool을 활용해도 됨) **

# 종료된 컨테이너 재실행
$ docker start jwt-api

# 컨테이너 로그 확인 
$ docker logs jwt-api

# 컨테이너 접속하여 정상 실행중인지 확인
$ docker ps
$ docker exec -it <container_id> bash
~~~
~~~
[ 2번 방식 - dockerfile + docker-compose.yml ]

# jwt-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/jwt-api

# 이미지 빌드 및 컨테이너 백그라운드로 실행 (local)
$ docker-compose -f docker-compose-local.yml up -d --build
~~~

### docker container ip 확인
~~~
[ 1번 방식 ]

# docker network 조회
$ docker network ls

# 위에서 조회한 값 중에 내가 설정한 네트워크 값으로 조회
$ docker network inspect <docker network name>
ex) docker network inspect jwt-api_msa-api-network
→ containers에 표시되어 있는 IP를 통해 확인 가능하며, 해당 아이피는 외부 접근이 아닌 container끼리 통신할 때 사용
~~~
~~~
[ 2번 방식 ]

# 컨테이너 접속 (쉘 종류에 따라 사용 가능한 명령어 차이 존재)
$ docker exec -it <container id> </bin/sh | /bin/bash | bash>
ex) docker exec -it a4e61eccfb72 /bin/sh

# 아이피 조회
$ ip addr
~~~
~~~
[ 3번 방식 ]

# 특정 container의 docker network 정보 확인
$ docker inspect "{{ .NetworkSettings }}" <container id>
→ NetworkSettings.Networks.<설정한 네트워크>.IPAddress를 통해 container ip 확인
~~~

### docker container 통신 확인
1. host ↔ api container 통신
    - [ 1번 방식 ] : browser에서 localhost:3004로 접속하여 확인
    - [ 2번 방식 ] : host CLI(cmd/powershell/git bash)에서 아래 명령어 실행
   ~~~
   # host에서 curl 명령어를 통해 확인
   $ curl http://localhost:3001
2. api container ↔ api container 통신  
   컨테이너 사이의 네트워크가 서로 다른 경우 기본적으로 통신 불가  
   다만, host.docker.internal (docker에서 host의 localhost와 같은 개념으로 Linux OS를 제외한 OS에서 바로 사용 가능한 키워드)를 통해 통신 가능       
   <br>
   localhost를 사용하지 못하고 'host.docker.internal:외부 포트'를 통해 통신하는 이유는
   container마다 localhost가 존재하기 때문   
   <br>
   (참고 : 같은 네트워크 안에 있는 container들 사이의 통신은 docker network inspect <container id> 명령어를 통해 확인 가능한 ip로 통신 가능. 단, ip를 알고 있어야 한다는 단점 존재)
   ~~~
   # jwt-api container에 접속
   $ docker exec -it <container id> /bin/sh
   ex) docker exec -it a4e61eccfb72 /bin/sh
   
   # 네트워크가 다른 api container와 통신 
   $ curl http://host.docker.internal:외부 포트
   ex) curl http://host.docker.internal:3002 # goods-api와 통신 
   ex) curl http://host:docker.internal:3003 # payment-api와 통신 
   ex) curl http://host:docker.internal:9001 # redis-api와 통신 
   ~~~

### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)