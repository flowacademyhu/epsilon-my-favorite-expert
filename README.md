# Epsilon: My favorite expert

## Description
The applications purpose is to help the user to find his/her friends favorite experts. Login is possible only with Google account. The user can ispect, edit her/his profile, add experts to the database. Experts can be added and removed from the user's favorite list. The user can search for experts and other users. The application has a map, where the experts location is being displayed.
## Requirements
- JRE 11
- Nodejs (8.15.0+)
- Angular 7 (with cli)
- Docker

## Usage (Linux/MacOS)
#### 1. Run infrastructure
```bash
cd server
# First run
./init.sh
# Other run
docker-compose up -d
```
#### 2. Run server
```bash
cd server
./mvnw spring-boot:run
```
#### 3. Run frontend
```bash
cd client
ng serve
```

## Run tests
```bash
cd server
./mvnw clean test
```
